import { Box, Button, Modal, styled, Typography } from '@mui/material'
import redPrompt from 'assets/images/svg/common/redPrompt.svg'
import shutOff from 'assets/images/svg/common/shutOff.svg'
import { FlexBox, SpaceBetweenBox } from 'styleds/index'
import { useMemo, useState } from 'react'
import BigNumber from 'bignumber.js'
import { useLendingPool } from 'hooks/useLendingPool'
import MockERC721Abi from 'abis/MockERC721.json'
import {
  useAddress,
  useBorrowLimit,
  useCollateralBorrowLimitUsed,
  useCollateralRiskLevel,
  useHeath,
  useUserValue,
} from 'state/user/hooks'
import { gasLimit } from 'config'
import { toast } from 'react-toastify'
import { getRiskLevel, getRiskLevelTag, minus, plus, times } from 'utils'
import { useContract } from 'hooks/useContract'
import { useParams } from 'react-router-dom'
import { useTransactionAdder } from 'state/transactions/hooks'
import { TransactionType } from 'state/transactions/types'
import { Nft } from '@alch/alchemy-sdk'
import { NftTokenModel } from 'services/type/nft'

const style = {
  width: '100%',
  transform: 'rgba(0, 0, 0, 0.5)',
}
export const FlexEndBox = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`
const MainBox = styled(Box)`
  margin: 0 2.375rem;
  padding: 1rem;
  background: #ffffff;
  box-shadow: 0px 0.9375rem 1.875rem rgba(20, 20, 42, 0.2);
  border-radius: 0.75rem;
`
const RightFlexBox = styled(Box)`
  background: #f7f7fc;
  margin: 1.5rem 0 0.5rem 0;
  border-radius: 6px;
  padding: 0.5rem 0rem;
  display: flex;
  align-items: center;
  justify-content: center;
`
const WithdrawList = styled(Box)`
  max-height: 12.5rem;
  margin-top: 1rem;
  background: #f7f7fc;
  border-radius: 0.5rem;
  overflow: auto;
  padding: 1rem 1rem 0px 1rem;
`
const BodyTypography = styled(Typography)`
  font-weight: 500;
  font-size: 0.875rem;
  line-height: 1.375rem;
  color: #a0a3bd;
`
const NftImg = styled(`img`)`
  width: 3rem;
  height: 3rem;
  border-radius: 0.25rem;
`
interface NFTsSelectedProps {
  open: boolean
  data: Nft[]
  depositData: NftTokenModel[]
  amountList: any[]
  close: Function
  type: string
  amount: string
  checkedIndex: string[]
}
export default function MobileWithdrawSelectedModal({
  open,
  close,
  depositData,
  data,
  type,
  amount,
  amountList,
}: NFTsSelectedProps) {
  const { id } = useParams()
  const contract = useLendingPool()
  const address = useAddress()
  const userValue = useUserValue()
  const heath = useHeath()
  const collateralRiskLevel = useCollateralRiskLevel()
  const TypographyRiskLevel = getRiskLevel(heath)
  const riskLevelTag = getRiskLevelTag(heath)
  const ercContract = useContract(id, MockERC721Abi)
  const addTransaction = useTransactionAdder()
  const [isApproved, setIsApproved] = useState<number>(0)
  const borrowLimitUsed = useCollateralBorrowLimitUsed()
  const upBorrowLimitUsed = useCollateralBorrowLimitUsed(times(amount, -1))
  const borrowLimit = useBorrowLimit() //操作前的borrowLimit
  const upBorrowLimit = useBorrowLimit(times(amount, -1)) //操作后的borrowLimit
  //操作后的borrowLimit
  const deposit = async () => {
    if (contract && address && ercContract) {
      if (isApproved) {
        contract
          .depositNFTs(
            depositData.map((el) => el.contract.address),
            depositData.map((el) => el.tokenId),
            depositData.map((el) => el.balance),
            address,
            { gasLimit }
          )
          .then((res: any) => {
            if (res && res.hash) {
              close(false)
              addTransaction(res, {
                type: TransactionType.DEPOSIT,
                recipient: address,
                amount,
              })
              toast.success('success')
            }
          })
      } else {
        ercContract.setApprovalForAll(contract.address, true).then((res: any) => {
          setIsApproved(1)
          addTransaction(res, {
            type: TransactionType.APPROVAL_NFT,
            spender: contract.address,
            amount,
            message: 'Approve all NFT',
          })
        })
      }
    }
  }
  const withdraw = async () => {
    if (contract && address && ercContract) {
      contract
        .withdrawNFTs(
          data.map((el) => el.contract.address),
          data.map((el) => el.tokenId),
          amountList.map((el) => el.amount),
          address,
          { gasLimit }
        )
        .then((res: any) => {
          if (res && res.hash) {
            close(false)
            addTransaction(res, {
              type: TransactionType.WITHDRAW,
              recipient: address,
              amount,
            })
            toast.success('success')
          }
        })
    }
  }
  const depositAmount = useMemo(() => {
    return depositData.reduce((total: string, current: NftTokenModel) => {
      return new BigNumber(total).plus(current.balance || '0').toString()
    }, '0')
  }, [depositData])
  const riskLevelWarning = useMemo(() => {
    return new BigNumber(collateralRiskLevel).lt(150) && type === 'withdraw'
  }, [collateralRiskLevel, type])
  const depositBorrowLimit = useBorrowLimit(depositAmount)
  const depositBorrowLimitUsed = useCollateralBorrowLimitUsed(depositAmount)
  return (
    <Modal open={open} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
      <Box sx={style}>
        <MainBox>
          <FlexEndBox
            onClick={() => {
              close(false)
            }}
          >
            <img src={shutOff} alt="" />
          </FlexEndBox>
          <Typography fontWeight="700" variant="subtitle1">
            {type === 'deposit' ? depositData.length : data.length} NFTs selected
          </Typography>
          <Typography mt="0.125rem" variant="body1" color="#A0A3BD">
            {type === 'deposit' ? depositAmount : amount} ETH value
          </Typography>
          <WithdrawList>
            {type === 'deposit' ? (
              <>
                {depositData.map((el: Nft | NftTokenModel, index: number) => (
                  <SpaceBetweenBox mb="1.5rem" key={index}>
                    <FlexBox>
                      <NftImg width="3rem" height="3rem" src={el.media[0]?.gateway || ''} alt="" />
                      <Box ml="0.75rem">
                        <BodyTypography color="#6E7191 !important" fontWeight="600 !important">
                          {el.rawMetadata?.name}
                        </BodyTypography>
                      </Box>
                    </FlexBox>
                    <BodyTypography>x 1</BodyTypography>
                  </SpaceBetweenBox>
                ))}
              </>
            ) : (
              <>
                {data.map((el: Nft | NftTokenModel, index: number) => (
                  <SpaceBetweenBox mb="1.5rem" key={index}>
                    <FlexBox>
                      <NftImg width="3rem" height="3rem" src={el.rawMetadata?.image} alt="" />
                      <Box ml="0.75rem">
                        <BodyTypography color="#6E7191 !important" fontWeight="600 !important">
                          {el.rawMetadata?.name}
                        </BodyTypography>
                      </Box>
                    </FlexBox>
                    <BodyTypography>x 1</BodyTypography>
                  </SpaceBetweenBox>
                ))}
              </>
            )}
          </WithdrawList>
          <SpaceBetweenBox mt="1.5rem">
            <Box>
              <Typography variant="body2" color="#A0A3BD">
                Collateral value (ETH)
              </Typography>
              <Typography variant="body2" color="#A0A3BD" mt="1rem">
                Borrow Limited (ETH)
              </Typography>
              <Typography variant="body2" color="#A0A3BD" mt="1rem">
                Borrow Limit Used
              </Typography>
            </Box>
            <Box>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Typography fontWeight="600" variant="body2" color="#A0A3BD">
                  {new BigNumber(userValue.totalCollateral).toFixed(2, 1)}
                  {' >'}
                </Typography>
                <Typography variant="body2" ml="0.375rem" fontWeight="700 !important" color="#14142A !important">
                  {type === 'deposit'
                    ? new BigNumber(plus(userValue.totalCollateral, depositAmount)).toFixed(2, 1)
                    : new BigNumber(minus(userValue.totalCollateral, amount)).toFixed(2, 1)}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }} mt="16px">
                <Typography fontWeight="600" variant="body2" color="#A0A3BD">
                  {new BigNumber(borrowLimit).toFixed(2, 1)}
                  {' >'}
                </Typography>
                <Typography
                  variant="body2"
                  ml="0.375rem"
                  fontWeight="700 !important"
                  color={riskLevelWarning ? '#E1536C !important' : '#14142A !important'}
                >
                  {type === 'deposit'
                    ? new BigNumber(depositBorrowLimit).toFixed(2, 1)
                    : new BigNumber(upBorrowLimit).toFixed(2, 1)}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }} mt="16px">
                <Typography fontWeight="600" variant="body2" color="#A0A3BD">
                  {new BigNumber(borrowLimitUsed).toFixed(2, 1)}% {'>'}
                </Typography>
                <Typography
                  variant="body2"
                  ml="0.375rem"
                  fontWeight="700 !important"
                  color={riskLevelWarning ? '#E1536C !important' : '#14142A !important'}
                >
                  {type === 'deposit'
                    ? new BigNumber(depositBorrowLimitUsed).toFixed(2, 1)
                    : new BigNumber(upBorrowLimitUsed).toFixed(2, 1)}
                  %
                </Typography>
              </Box>
            </Box>
          </SpaceBetweenBox>
          <SpaceBetweenBox height="1.1875rem" mt="1rem">
            <Box>
              <Typography variant="body2" color="#A0A3BD" sx={{ display: 'inline-block' }}>
                Risk level
              </Typography>
              <Typography className={riskLevelTag} ml="0.5rem" variant="body2" component="span" fontWeight="700">
                {TypographyRiskLevel}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Typography fontWeight="600" variant="body2" color="#A0A3BD">
                {heath}% {'>'}
              </Typography>
              <Typography
                variant="body2"
                ml="0.375rem"
                fontWeight="700 !important"
                color={riskLevelWarning ? '#E1536C !important' : '#14142A !important'}
              >
                {collateralRiskLevel}%
              </Typography>
            </Box>
          </SpaceBetweenBox>
          <RightFlexBox>
            <Typography lineHeight="0.75rem" color="#A0A3BD" variant="body2" fontWeight="600">
              Net Borrow APY
            </Typography>
            <Typography lineHeight="0.75rem" ml="0.375rem" mr="0.5rem" variant="body2" fontWeight="600">
              10%
            </Typography>
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clipPath="url(#clip0_3612_18790)">
                <circle cx="7" cy="7.99805" r="6.5" stroke="#A0A3BD" />
                <path
                  d="M6.5 7.49805C6.5 7.2219 6.72386 6.99805 7 6.99805C7.27614 6.99805 7.5 7.2219 7.5 7.49805V11.498C7.5 11.7742 7.27614 11.998 7 11.998C6.72386 11.998 6.5 11.7742 6.5 11.498V7.49805Z"
                  fill="#A0A3BD"
                />
                <path
                  d="M8 4.99805C8 5.55033 7.55228 5.99805 7 5.99805C6.44772 5.99805 6 5.55033 6 4.99805C6 4.44576 6.44772 3.99805 7 3.99805C7.55228 3.99805 8 4.44576 8 4.99805Z"
                  fill="#A0A3BD"
                />
              </g>
              <defs>
                <clipPath id="clip0_3612_18790">
                  <rect width="15" height="14" fill="white" transform="translate(0 0.998047)" />
                </clipPath>
              </defs>
            </svg>
          </RightFlexBox>
          <Button
            variant="contained"
            sx={{ width: '100%', height: '3rem' }}
            color={riskLevelWarning ? 'error' : 'primary'}
            onClick={() => {
              if (type === 'Withdraw') {
                withdraw()
              } else {
                deposit()
              }
            }}
          >
            {type === 'Withdraw' ? type : isApproved === 2 ? 'Deposit' : isApproved === 1 ? 'Pending' : 'Approve'}
          </Button>
          <Box mb="1rem" display={riskLevelWarning ? '' : 'none'}>
            <FlexBox>
              <Box mr="0.5rem" pt="0.1875rem" height="3.5625rem">
                <img src={redPrompt} alt="" />
              </Box>
              <Typography color="#E1536C" variant="body2">
                If you withdraw the maximum amount of collateral ETH, your collateral will be easily liquidated
              </Typography>
            </FlexBox>
          </Box>
        </MainBox>
      </Box>
    </Modal>
  )
}
