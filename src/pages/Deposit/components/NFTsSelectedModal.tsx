import { Box, Button, Modal, styled, Typography } from '@mui/material'
import addIcon from 'assets/images/svg/common/add.svg'
import redPrompt from 'assets/images/svg/common/redPrompt.svg'
import rightIcon from 'assets/images/svg/common/rightIcon.svg'
import shutOff from 'assets/images/svg/common/shutOff.svg'
import { FlexBox, SpaceBetweenBox } from 'styleds/index'
import { NftTokenModel } from 'services/type/nft'
import { useEffect, useMemo, useState } from 'react'
import BigNumber from 'bignumber.js'
import { useLendingPool } from 'hooks/useLendingPool'
import MockERC721Abi from 'abis/MockERC721.json'
import {
  useAddress,
  useBorrowLimit,
  useCollateralBorrowLimitUsed,
  useCollateralRiskLevel,
  useErc20ReserveData,
  useHeath,
  useUserValue,
} from 'state/user/hooks'
// import { gasLimit } from 'config'
// import { toast } from 'react-toastify'
import { getRiskLevel, getRiskLevelTag, plus, times } from 'utils'
import { useContract } from 'hooks/useContract'
import { useParams } from 'react-router-dom'
import {
  isTransactionRecent,
  useAllTransactions,
  useTransactionAdder,
  useTransactionPending,
} from 'state/transactions/hooks'
import { TransactionType } from 'state/transactions/types'
import { Loading } from 'components/Loading'

const style = {
  transform: 'rgba(0, 0, 0, 0.5)',
  width: '420px',
  padding: '24px',
  background: '#FFFFFF',
  boxShadow: '0px 15px 30px rgba(20, 20, 42, 0.2)',
  borderRadius: '12px',
}
export const FlexEndBox = styled(Box)`
  display: flex;
  margin: 8px 8px 0px 0px;
  align-items: center;
  justify-content: flex-end;
  cursor: pointer;
`
const RightFlexBox = styled(Box)`
  background: #f7f7fc;
  border-radius: 10px;
  padding: 16px;
  margin-top: 24px;
`
const DepositList = styled(Box)`
  width: 372px;
  max-height: 257px;
  margin-top: 16px;
  background: #f7f7fc;
  border-radius: 8px;
  overflow: auto;
  padding: 16px 16px 16px 16px;
`
const BodyTypography = styled(Typography)`
  font-weight: 600;
  font-size: 12px;
  line-height: 160%;
  color: #a0a3bd;
`
interface NFTsSelectedType {
  openSelectedModal: boolean
  data: NftTokenModel[]
  setOpenSelectedModal: Function
  type: string
  checkedIndex: string[]
}
export default function NFTsSelectedModal({ openSelectedModal, setOpenSelectedModal, data, type }: NFTsSelectedType) {
  const { id } = useParams()
  const contract = useLendingPool()
  const [loading, setLoading] = useState(false)
  const address = useAddress()
  const userValue = useUserValue()
  const erc20ReserveData = useErc20ReserveData()
  const heath = useHeath()
  const TypographyRiskLevel = getRiskLevel(heath)
  const riskLevelTag = getRiskLevelTag(heath)
  const ercContract = useContract(id, MockERC721Abi)
  const [isApproved, setIsApproved] = useState<number>(0)
  const addTransaction = useTransactionAdder()
  const transactions = useAllTransactions()
  const borrowLimitUsed = useCollateralBorrowLimitUsed()
  const transactionPending = useTransactionPending()

  const approvePending = useMemo(() => {
    return transactionPending.filter((el) => el.info.type === TransactionType.APPROVAL_NFT)
  }, [transactionPending])

  const depositPending = useMemo(() => {
    return transactionPending.filter((el) => el.info.type === TransactionType.DEPOSIT_NFT)
  }, [transactionPending])

  const withdrawPending = useMemo(() => {
    return transactionPending.filter((el) => el.info.type === TransactionType.WITHDRAW_NFT)
  }, [transactionPending])

  const flag = useMemo(() => {
    return (
      transactions &&
      Object.keys(transactions).some((hash) => {
        const tx = transactions[hash]
        return tx && tx.receipt && tx.info.type === TransactionType.APPROVAL_NFT && isTransactionRecent(tx)
      })
    )
  }, [transactions])
  const amount = useMemo(() => {
    return data.reduce((total: string, current: NftTokenModel) => {
      return new BigNumber(total).plus(current.balance || '0').toString()
    }, '0')
  }, [data])
  const collateralRiskLevel = useCollateralRiskLevel(amount)
  useEffect(() => {
    if (contract && ercContract && address) {
      ercContract.isApprovedForAll(address, contract.address).then((res: boolean) => {
        if (res) {
          setIsApproved(2)
        }
      })
    }
  }, [contract, address, ercContract, flag])
  const withdraw = () => {
    // console.log('withdraw')
  }
  const upBorrowLimitUsed = useCollateralBorrowLimitUsed(times(amount, type === 'Deposit' ? 1 : -1))
  const borrowLimit = useBorrowLimit() //操作前的borrowLimit
  const upBorrowLimit = useBorrowLimit(times(amount, type === 'Deposit' ? 1 : -1)) //操作后的borrowLimit
  const deposit = async () => {
    setLoading(true)
    if (contract && address && ercContract) {
      if (isApproved) {
        contract
          .depositNFTs(
            data.map((el) => el.contract.address),
            data.map((el) => el.tokenId),
            data.map((el) => el.balance),
            address
            // { gasLimit }
          )
          .then((res: any) => {
            setLoading(false)
            if (res && res.hash) {
              setOpenSelectedModal(false)
              addTransaction(res, {
                type: TransactionType.DEPOSIT_NFT,
                recipient: address,
                amount,
                count: data.length,
              })
              // toast.success('success')
            }
          })
          .catch(() => {
            setLoading(false)
          })
      } else {
        ercContract
          .setApprovalForAll(contract.address, true)
          .then((res: any) => {
            setLoading(false)
            setIsApproved(1)
            addTransaction(res, {
              type: TransactionType.APPROVAL_NFT,
              spender: contract.address,
              amount,
              message: 'Approve all NFT',
            })
          })
          .catch(() => {
            setLoading(false)
          })
      }
    } else {
      setLoading(false)
    }
  }
  const riskLevelWarning = useMemo(() => {
    return new BigNumber(collateralRiskLevel).lt(150) && type === 'withdraw'
  }, [collateralRiskLevel, type])
  return (
    <Modal open={openSelectedModal} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
      <Box sx={style}>
        <FlexEndBox
          onClick={() => {
            setOpenSelectedModal(false)
          }}
        >
          <img src={shutOff} alt="" />
        </FlexEndBox>
        <FlexBox>
          <Typography variant="h5" component="h1">
            {data.length} NFTs selected
          </Typography>
        </FlexBox>
        <FlexBox mt={'2px'}>
          <Typography variant="body1" component="h1" color="#A0A3BD">
            {amount} ETH value
          </Typography>
        </FlexBox>
        <DepositList>
          {data.map((el: NftTokenModel, index: number) => (
            <FlexBox mb={Number(index + 1) >= data.length ? '0' : '24px'} key={`Deposit${index}`}>
              <img width="48px" src={el.media[0]?.gateway || ''} alt="" />
              <Box width="232px" ml="12px" mr="24px">
                <BodyTypography color="#6E7191 !important" fontWeight="600 !important">
                  {el.rawMetadata.name}
                </BodyTypography>
              </Box>
              <BodyTypography>x 1</BodyTypography>
            </FlexBox>
          ))}
        </DepositList>

        <SpaceBetweenBox mt="24px">
          <Box>
            <BodyTypography>Collateral value (ETH)</BodyTypography>
            <BodyTypography mt="16px"> Borrow Limited (ETH)</BodyTypography>
            <BodyTypography mt="16px">Borrow Limit Used</BodyTypography>
          </Box>
          <Box>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <BodyTypography>
                {new BigNumber(userValue.totalCollateral).toFixed(2, 1)}
                {'>'}
              </BodyTypography>
              <BodyTypography ml="6px" fontWeight="700 !important" color="#14142A !important">
                {new BigNumber(plus(userValue.totalCollateral, amount)).toFixed(2, 1)}
              </BodyTypography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }} mt="16px">
              <BodyTypography>
                {new BigNumber(borrowLimit).toFixed(2, 1)}
                {'>'}
              </BodyTypography>
              <BodyTypography
                ml="6px !important"
                fontWeight="700 !important"
                color={riskLevelWarning ? '#E1536C !important' : '#14142A !important'}
              >
                {new BigNumber(upBorrowLimit).toFixed(2, 1)}
              </BodyTypography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }} mt="16px">
              <BodyTypography>
                {new BigNumber(borrowLimitUsed).toFixed(2, 1)}% {'>'}
              </BodyTypography>
              <BodyTypography
                ml="6px"
                fontWeight="700 !important"
                color={riskLevelWarning ? '#E1536C !important' : '#14142A !important'}
              >
                {new BigNumber(upBorrowLimitUsed).toFixed(2, 1)}%
              </BodyTypography>
            </Box>
          </Box>
        </SpaceBetweenBox>
        <SpaceBetweenBox mt="16px">
          <Box>
            <BodyTypography sx={{ display: 'inline-block' }}>Risk level</BodyTypography>
            <Typography className={riskLevelTag} ml="8px" variant="body1" component="span" fontWeight="700">
              {TypographyRiskLevel}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <BodyTypography>
              {new BigNumber(heath).toFixed(2, 1)}% {'>'}
            </BodyTypography>
            <BodyTypography
              ml="6px"
              fontWeight="700 !important"
              color={riskLevelWarning ? '#E1536C !important' : '#14142A !important'}
            >
              {new BigNumber(collateralRiskLevel).toFixed(2, 1)}%
            </BodyTypography>
          </Box>
        </SpaceBetweenBox>
        <RightFlexBox mb="24px">
          <FlexBox>
            <Box width={'65px'}>
              <Typography variant="subtitle2" color="#4BC8B1">
                0%
              </Typography>
            </Box>
            <Box sx={{ width: '52px' }}>
              <FlexBox
                sx={{
                  width: '18px',
                  borderRadius: '100%',
                  height: '18px',
                  background: '#EFF0F6',
                  padding: '4.88px',
                }}
              >
                <img height="8.25px" width="8.25px" src={addIcon} alt="" />
              </FlexBox>
            </Box>
            <Box width={'66px'}>
              <Typography variant="subtitle2" color="#6E7191">
                {erc20ReserveData.borrowRate}%
              </Typography>
            </Box>
            <Box width="50px">
              <FlexBox
                sx={{
                  width: '18px',
                  borderRadius: '100%',
                  height: '18px',
                  background: '#EFF0F6',
                }}
              >
                <img src={rightIcon} alt="" />
              </FlexBox>
            </Box>
            <Box>
              <Typography variant="subtitle2" color="#4E4B66">
                {erc20ReserveData.borrowRate}%
              </Typography>
            </Box>
          </FlexBox>
          <FlexBox>
            <Box width="117px">
              <BodyTypography>Token Reward</BodyTypography>
            </Box>
            <Box width="116px">
              <BodyTypography fontWeight="600 !important">Borrow APY</BodyTypography>
            </Box>
            <Box>
              <BodyTypography fontWeight="600 !important" color="#4E4B66 !important">
                Net Borrow APY
              </BodyTypography>
            </Box>
          </FlexBox>
        </RightFlexBox>
        <Box mb="16px" display={riskLevelWarning ? '' : 'none'}>
          <FlexBox>
            <Box mr="8px" pt="1px" height="38px">
              <img src={redPrompt} alt="" />
            </Box>
            <Typography color="#E1536C" fontWeight="600" variant="body2">
              If you withdraw the maximum amount of collateral ETH, your collateral will be easily liquidated
            </Typography>
          </FlexBox>
        </Box>
        <FlexBox justifyContent="space-between">
          {isApproved !== 2 && (
            <Button
              variant="contained"
              disabled={isApproved !== 0}
              sx={{ width: '217px', height: '54px' }}
              color={riskLevelWarning ? 'error' : 'primary'}
              onClick={() => {
                if (type === 'Withdraw') {
                  withdraw()
                } else {
                  deposit()
                }
              }}
            >
              {approvePending.length > 0 || withdrawPending.length > 0 || depositPending.length > 0 || loading ? (
                <Loading></Loading>
              ) : (
                <></>
              )}
              Approve
            </Button>
          )}
          <Button
            variant="contained"
            disabled={isApproved !== 2}
            sx={{ width: isApproved !== 2 ? '139px' : '372px', height: '54px' }}
            color={riskLevelWarning ? 'error' : 'primary'}
            onClick={() => {
              if (type === 'Withdraw') {
                withdraw()
              } else {
                deposit()
              }
            }}
          >
            {withdrawPending.length > 0 || depositPending.length > 0 || (loading && isApproved === 2) ? (
              <Loading></Loading>
            ) : (
              <></>
            )}
            {type === 'Withdraw' ? type : isApproved === 0 ? 'Deposit' : `Deposit ${data.length} NFTs`}
          </Button>
        </FlexBox>
      </Box>
    </Modal>
  )
}
