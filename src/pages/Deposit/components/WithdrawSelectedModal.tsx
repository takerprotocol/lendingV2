import { Box, Button, Modal, styled, Typography } from '@mui/material'
import addIcon from 'assets/images/svg/common/add.svg'
import redPrompt from 'assets/images/svg/common/redPrompt.svg'
import rightIcon from 'assets/images/svg/common/rightIcon.svg'
import shutOff from 'assets/images/svg/common/shutOff.svg'
import { FlexBox, SpaceBetweenBox } from 'styleds/index'
import { useEffect, useMemo, useState } from 'react'
import BigNumber from 'bignumber.js'
import { useLendingPool } from 'hooks/useLendingPool'
import MockERC721Abi from 'abis/MockERC721.json'
import {
  useAddress,
  useBorrowLimit,
  useCollateralBorrowLimitUsed,
  useCollateralRiskLevel,
  useDashboardType,
  useErc20ReserveData,
  useHeath,
  useUserValue,
} from 'state/user/hooks'
// import { gasLimit } from 'config'
// import { toast } from 'react-toastify'
import { getRiskLevel, getRiskLevelTag, minus, times } from 'utils'
import { useContract } from 'hooks/useContract'
import { useParams } from 'react-router-dom'
import { isTransactionRecent, useAllTransactions, useTransactionAdder } from 'state/transactions/hooks'
import { TransactionType } from 'state/transactions/types'
import { Nft } from '@alch/alchemy-sdk'
import { Loading } from 'components/Loading'
import numbro from 'numbro'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { getClient } from 'apollo/client'
import { usePunkGateway } from 'hooks/useGateway'

const style = {
  transform: 'rgba(0, 0, 0, 0.5)',
  width: '420px',
  padding: '24px',
  background: '#FFFFFF',
  boxShadow: '0px 15px 30px rgba(20, 20, 42, 0.2)',
  borderRadius: '12px',
}

const StepTypography = styled(Typography)`
  font-weight: 500;
  font-size: 12px;
  margin-right: 8px;
  line-height: 160%;
  color: #ffffff;
`

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
const WithdrawList = styled(Box)`
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
  open: boolean
  data: Nft[]
  amountList: any[]
  close: Function
  type: string
  amount: string
  getWayFlag: number
  tNFT: string
  checkedIndex: string[]
}
export default function WithdrawSelectedModal({
  open,
  getWayFlag,
  close,
  tNFT,
  data,
  type,
  amount,
  amountList,
}: NFTsSelectedType) {
  const { id } = useParams()
  const contract = useLendingPool()
  // const [loading, setLoading] = useState(false)
  const address = useAddress()
  const userValue = useUserValue()
  const heath = useHeath()
  const erc20ReserveData = useErc20ReserveData()
  const TypographyRiskLevel = getRiskLevel(heath)
  const riskLevelTag = getRiskLevelTag(heath)
  const ercContract = useContract(id, MockERC721Abi)
  const punkGateway = usePunkGateway()
  const addTransaction = useTransactionAdder()
  const borrowLimitUsed = useCollateralBorrowLimitUsed()
  const upBorrowLimitUsed = useCollateralBorrowLimitUsed(times(amount, -1))
  const borrowLimit = useBorrowLimit() //操作前的borrowLimit
  const upBorrowLimit = useBorrowLimit(times(amount, -1)) //操作后的borrowLimit
  const transactions = useAllTransactions()
  const collateralRiskLevel = useCollateralRiskLevel(times(amount, -1))
  const dashboardType = useDashboardType()
  const [blueChipLoading, setBlueChipLoading] = useState(false)
  const [growthLoading, setGrowthLoading] = useState(false)
  const [client, setClient] = useState<any>(null)
  const { chainId } = useActiveWeb3React()
  const [isApproved, setIsApproved] = useState<number>(0)
  const erc721Contract = useContract(tNFT, MockERC721Abi)

  const approvalWithdrawPunksNftTransaction = useMemo(() => {
    return Object.keys(transactions).filter((hash) => {
      const tx = transactions[hash]
      return tx && tx.receipt && tx.info.type === TransactionType.APPROVAL_WITHDRAW_PUNK_NFT && isTransactionRecent(tx)
    }).length
  }, [transactions])
  useEffect(() => {
    if (approvalWithdrawPunksNftTransaction > 0) {
      setIsApproved(2)
    }
  }, [approvalWithdrawPunksNftTransaction])

  useEffect(() => {
    if (chainId) {
      setClient(getClient(dashboardType)[chainId === 1 ? 42 : chainId === 4 ? 4 : chainId === 5 ? 5 : 5])
    }
  }, [chainId, dashboardType])
  const loading = useMemo(() => {
    return dashboardType === 1 ? blueChipLoading : growthLoading
  }, [blueChipLoading, dashboardType, growthLoading])
  const flag = useMemo(() => {
    return (
      transactions &&
      Object.keys(transactions).some((hash) => {
        const tx = transactions[hash]
        return tx && tx.receipt && tx.info.type === TransactionType.WITHDRAW_NFT && isTransactionRecent(tx)
      })
    )
  }, [transactions])
  useEffect(() => {
    if (getWayFlag === 1) {
      if (punkGateway && erc721Contract && address) {
        erc721Contract.isApprovedForAll(address, punkGateway.address).then((res: boolean) => {
          if (res) {
            setIsApproved(2)
          }
        })
      }
    }
  }, [address, punkGateway, erc721Contract, getWayFlag])

  useEffect(() => {
    if (flag) {
      //setLoading(false)
      dashboardType === 1 ? setBlueChipLoading(false) : setGrowthLoading(false)
    }
  }, [dashboardType, flag])
  const withdraw = async () => {
    // setLoading(true)
    dashboardType === 1 ? setBlueChipLoading(true) : setGrowthLoading(true)
    if (contract && address && ercContract) {
      if (getWayFlag === 1 && isApproved === 0 && erc721Contract) {
        erc721Contract
          .setApprovalForAll(punkGateway && punkGateway.address, true)
          .then((res: any) => {
            // setLoading(false)
            dashboardType === 1 ? setBlueChipLoading(false) : setGrowthLoading(false)
            setIsApproved(1)
            addTransaction(res, {
              type: TransactionType.APPROVAL_WITHDRAW_PUNK_NFT,
              spender: contract.address,
              amount,
              message: 'Approve Withdraw NFT',
            })
          })
          .catch(() => {
            // setLoading(false)
            dashboardType === 1 ? setBlueChipLoading(false) : setGrowthLoading(false)
          })
      } else {
        ;(getWayFlag === 0
          ? contract.withdrawNFTs(
              data.map((el) => el.contract.address),
              data.map((el) => el.tokenId),
              amountList.map((el) => el.amount),
              address
              // { gasLimit }
            )
          : punkGateway &&
            punkGateway.withdraw(
              contract.address,
              data.map((el) => el.tokenId),
              address
            )
        )
          .then((res: any) => {
            if (res && res.hash) {
              client.clearStore()
              // setLoading(false)
              dashboardType === 1 ? setBlueChipLoading(false) : setGrowthLoading(false)
              close(false)
              addTransaction(res, {
                type: TransactionType.WITHDRAW_NFT,
                recipient: address,
                amount,
                count: data.length,
              })
            }
          })
          .catch(() => {
            // setLoading(false)
            dashboardType === 1 ? setBlueChipLoading(false) : setGrowthLoading(false)
          })
      }
    } else {
      // setLoading(false)
      dashboardType === 1 ? setBlueChipLoading(false) : setGrowthLoading(false)
    }
  }

  const riskLevelWarning = useMemo(() => {
    return new BigNumber(numbro.unformat(collateralRiskLevel)).lt(150) && type === 'withdraw'
  }, [collateralRiskLevel, type])

  return (
    <Modal open={open} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
      <Box sx={style}>
        <FlexEndBox
          onClick={() => {
            close(false)
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
        <WithdrawList>
          {data.map((el: Nft, index: number) => (
            <FlexBox mb={Number(index + 1) === data.length ? '0' : '24px'} key={`Withdraw${index}`}>
              <img width="48px" height={'48px'} src={el.media[0]?.gateway || ''} alt="" />
              <Box width="232px" ml="12px" mr="24px">
                <BodyTypography color="#6E7191 !important" fontWeight="600 !important">
                  {el.rawMetadata?.name}
                </BodyTypography>
              </Box>
              <BodyTypography>x 1</BodyTypography>
            </FlexBox>
          ))}
        </WithdrawList>

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
                {new BigNumber(minus(userValue.totalCollateral, amount)).toFixed(2, 1)}
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
            <BodyTypography sx={{ display: 'inline-block' }}>Heath Level</BodyTypography>
            <Typography className={riskLevelTag} ml="8px" variant="body1" component="span" fontWeight="700">
              {TypographyRiskLevel}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <BodyTypography>
              {heath}% {'>'}
            </BodyTypography>
            <BodyTypography
              ml="6px"
              fontWeight="700 !important"
              color={riskLevelWarning ? '#E1536C !important' : '#14142A !important'}
            >
              {collateralRiskLevel}%
            </BodyTypography>
          </Box>
        </SpaceBetweenBox>
        <RightFlexBox mb="24px">
          <FlexBox>
            <Box width={'65px'}>
              <Typography component="p" variant="subtitle2" color="#4BC8B1">
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
              <Typography component="p" variant="subtitle2" color="#6E7191">
                -10%
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
              <Typography component="p" variant="subtitle2" color="#4E4B66">
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
              Exceeding the maximum withdrawal limit, please repay the debt first.
            </Typography>
          </FlexBox>
        </Box>
        <FlexBox justifyContent="space-between">
          {isApproved !== 2 && getWayFlag === 1 && (
            <Button
              variant="contained"
              disabled={loading}
              sx={{ width: '176px', height: '54px', marginRight: '16px' }}
              color={riskLevelWarning ? 'error' : 'primary'}
              onClick={() => {
                withdraw()
              }}
            >
              {loading || isApproved === 1 ? <Loading></Loading> : <></>}
              {!loading && <StepTypography sx={{ opacity: '0.7' }}>Step1</StepTypography>}Approve
            </Button>
          )}
          <Button
            variant="contained"
            disabled={isApproved !== 2 && getWayFlag === 1}
            sx={{ width: isApproved !== 2 && getWayFlag === 1 ? '176px' : '100%', height: '54px' }}
            color={riskLevelWarning ? 'error' : 'primary'}
            onClick={() => {
              withdraw()
            }}
          >
            {!loading && isApproved !== 2 && getWayFlag === 1 && <StepTypography>Step2</StepTypography>}
            {isApproved === 0 && getWayFlag === 1 ? 'Withdraw' : `Withdraw ${data.length} NFTs`}
          </Button>
        </FlexBox>
      </Box>
    </Modal>
  )
}
