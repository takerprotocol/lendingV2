import greyShutOff from 'assets/images/svg/common/greyShutOff.svg'
import { styled, Typography, Box, Button, Modal, TextField } from '@mui/material'
import { useEffect, useMemo, useState } from 'react'
import addIcon from 'assets/images/svg/common/add.svg'
import rightIcon from 'assets/images/svg/common/right.svg'
import loanModalBefore from 'assets/images/svg/dashboard/loanModal-before.svg'
import CustomizedSlider from 'components/Slider'
import myCollateral from 'assets/images/svg/common/myCollateral.svg'
import { MAXBox } from './MySupplyModal'
import { fixedFormat, getRiskLevel, getRiskLevelTag, plus, times, amountDecimal } from 'utils'
import {
  useAddress,
  useBorrowLimit,
  useDebtBorrowLimitUsed,
  useDebtRiskLevel,
  useDecimal,
  useErc20ReserveData,
  useEthDebt,
  useHeath,
} from 'state/user/hooks'
import { useLendingPool } from 'hooks/useLendingPool'
import { gasLimit } from 'config'
import BigNumber from 'bignumber.js'
import { useTransactionAdder } from 'state/transactions/hooks'
import { TransactionType } from 'state/transactions/types'
import { toast } from 'react-toastify'
import { useGateway } from 'hooks/useGateway'
const style = {
  width: '420px',
  transform: 'rgba(0, 0, 0, 0.5)',
  borderRadius: '12px',
  position: 'relative',
}
const TopBox = styled(Box)`
  width: 420px;
  background: linear-gradient(
      60.76deg,
      rgba(102, 166, 232, 0) 0%,
      rgba(135, 143, 248, 0.147) 61.5%,
      rgba(105, 165, 233, 0.3) 100%
    ),
    linear-gradient(180deg, #1d172e 0%, #181529 83.56%);
  box-shadow: 0px 10px 20px rgba(75, 75, 122, 0.2);
  border-radius: 12px 12px 0px 0px;
  .BorrowOrRepay {
    color: #ffffff;
    background: #ffffff;
  }
`
const BottomBox = styled(Box)`
  width: 420px;
  background: #ffffff;
  box-shadow: 0px 15px 30px rgba(20, 20, 42, 0.2);
  border-radius: 12px;
  margin-top: -12px;
  padding: 24px;
  input::-webkit-input-placeholder {
    /* Chrome/Opera/Safari */
    color: #a0a3bd;
  }
  input::-moz-placeholder {
    /* Firefox 19+ */
    color: #a0a3bd;
  }
  input:-ms-input-placeholder {
    /* IE 10+ */
    color: #a0a3bd;
  }
  input:-moz-placeholder {
    /* Firefox 18- */
    color: #a0a3bd;
  }
`
const CenterBox = styled(Box)`
  display: flex;
  align-items: center;
  .MuiInputBase-input {
    font-size: 28px;
  }
`
const SpaceBetweenBox = styled(Box)`
  display: flex;
  justify-content: space-between;
`
const FlexBox = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: flex-start;
`
const RightBox = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 18px;
  border-radius: 100%;
  height: 18px;
  background: #eff0f6;
  padding: 4.88px;
`
const RightFlexBox = styled(Box)`
  background: #f7f7fc;
  border-radius: 10px;
  padding: 16px;
  margin-top: 24px;
`
const HealthyButton = styled(Box)`
  padding: 4px 12px;
  height: 30px;
  margin-top: 30px;
  border-radius: 20px;
  cursor: pointer;
  background: linear-gradient(180deg, #1cc1a4 0%, #1cb5ab 100%);
  box-shadow: 0px 4px 8px rgba(28, 183, 171, 0.1);
`
const HighRiskButton = styled(Box)`
  padding: 4px 12px;
  height: 30px;
  margin-top: 30px;
  border-radius: 20px;
  cursor: pointer;
  background: linear-gradient(180deg, #ff7272 0%, #e1536c 100%);
  box-shadow: 0px 4px 8px rgba(221, 140, 140, 0.1);
`
const RiskyButton = styled(Box)`
  padding: 4px 12px;
  height: 30px;
  margin-top: 30px;
  border-radius: 20px;
  cursor: pointer;
  background: linear-gradient(180deg, #fba170 0%, #ef884f 100%);
  box-shadow: 0px 4px 8px rgba(221, 183, 140, 0.1);
`
const BorrowTypography = styled(Typography)`
  font-weight: 700;
  cursor: pointer;
`
const BorrowAmountBox = styled(Box)`
  width: 372px;
  height: 103px;
  background: #eff0f6;
  border-radius: 10px;
  padding: 16px;
  position: relative;
`
const LiquidatedBox = styled(Box)`
  width: 100%;
  height: 54px;
  background: #f9e7ea;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
`
interface MyLoanModalProps {
  open: boolean
  repayRoBorrow: number
  myDebt: number
  onClose: Function
}
export default function MyLoanModal({ open, repayRoBorrow, onClose }: MyLoanModalProps) {
  const [check, setCheck] = useState<number>(repayRoBorrow)
  const [amount, setAmount] = useState('')
  const heath = useHeath()
  const [sliderValue] = useState<number>(+heath)
  const debtRiskLevel = useDebtRiskLevel(times(amount, check === 1 ? 1 : -1))
  const upBorrowLimitUsed = useDebtBorrowLimitUsed(times(amount, check === 1 ? 1 : -1))
  const borrowLimitUsed = useDebtBorrowLimitUsed()
  const TypographyRiskLevel = getRiskLevel(amount ? debtRiskLevel : heath)
  const riskLevelTag = getRiskLevelTag(amount ? debtRiskLevel : heath)
  const contract = useGateway()
  const poolContract = useLendingPool()
  const erc20ReserveData = useErc20ReserveData()
  const borrowLimit = useBorrowLimit()
  const decimal = useDecimal()
  const address = useAddress()
  const ethDebt = useEthDebt()
  const addTransaction = useTransactionAdder()
  const BeforeImg = styled('img')`
    position: absolute;
    display: block;
    top: calc(100% - 10.5px);
    left: ${`${plus(times(3.57, sliderValue), 25)}px`};
  `
  useEffect(() => {
    setCheck(repayRoBorrow)
  }, [repayRoBorrow])
  const borrowSubmit = () => {
    if (contract) {
      if (check === 1) {
        contract
          .borrow(poolContract?.address, amountDecimal(amount, decimal), { gasLimit })
          .then((res: any) => {
            addTransaction(res, {
              type: TransactionType.BORROW,
              recipient: address,
              amount,
            })
            onClose(false)
          })
          .catch((error: any) => {
            toast.error(error.message)
          })
      } else {
        contract
          .repay(poolContract?.address, amountDecimal(amount, decimal), address, {
            value: amountDecimal(amount, decimal),
            gasLimit,
          })
          .then((res: any) => {
            addTransaction(res, {
              type: TransactionType.REPAY,
              recipient: address,
              amount,
            })
            onClose(false)
          })
          .catch((error: any) => {
            toast.error(error.message)
          })
      }
    }
  }
  const repaySubmit = () => {
    if (contract) {
      contract
        .repay(poolContract?.address, amountDecimal(amount, decimal), address, {
          value: amountDecimal(amount, decimal),
          gasLimit,
        })
        .then((res: any) => {
          addTransaction(res, {
            type: TransactionType.REPAY,
            recipient: address,
            amount,
          })
          onClose(false)
        })
        .catch((error: any) => {
          toast.error(error.message)
        })
    }
  }

  const buttonDisabled = useMemo(() => {
    return check === 1 ? !amount || new BigNumber(amount).gt(borrowLimit) : !amount || new BigNumber(amount).gt(ethDebt)
  }, [amount, borrowLimit, check, ethDebt])
  return (
    <Modal open={open} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
      <Box sx={style}>
        <TopBox height={+ethDebt === 0 ? '156px' : '200px'}>
          <SpaceBetweenBox paddingBottom={+ethDebt === 0 ? '37px' : '0px'} alignItems="flex-start">
            <Box m="32px 0 0 36px">
              <Typography mt="16px" variant="body1" component="h1" color="#A0A3BD">
                My Debt
              </Typography>
              <Box mt="4px">
                <Typography variant="h4" component="span" fontWeight="600" color="#EFF0F6">
                  {fixedFormat(ethDebt)}
                </Typography>
                <Typography ml="6px" variant="subtitle1" component="span" fontWeight="600" color="#EFF0F6">
                  ETH
                </Typography>
              </Box>
            </Box>
            <Box m="32px 24px 0px 0px">
              <Box
                sx={{ display: 'flex', justifyContent: 'flex-end', cursor: 'pointer' }}
                mr="8px"
                onClick={() => {
                  onClose(false)
                  setAmount('')
                }}
              >
                <img src={greyShutOff} alt="" />
              </Box>
              {new BigNumber(heath).lt(100) ? (
                <HighRiskButton>
                  <Typography variant="body1" component="p" fontWeight="700" color="#FFFFFF">
                    In liquidation...
                  </Typography>
                </HighRiskButton>
              ) : new BigNumber(heath).gte(100) && new BigNumber(heath).lte(110) ? (
                <HighRiskButton>
                  <Typography variant="body1" component="p" fontWeight="700" color="#FFFFFF">
                    HIGH RISK
                  </Typography>
                </HighRiskButton>
              ) : new BigNumber(heath).gt(110) && new BigNumber(heath).lte(130) ? (
                <RiskyButton>
                  <Typography variant="body1" component="p" fontWeight="700" color="#FFFFFF">
                    RISKY
                  </Typography>
                </RiskyButton>
              ) : (
                <HealthyButton>
                  <Typography variant="body1" component="p" fontWeight="700" color="#FFFFFF">
                    HEALTHY
                  </Typography>
                </HealthyButton>
              )}
            </Box>
          </SpaceBetweenBox>
          <Box display={+ethDebt === 0 ? 'none' : ''}>
            <CenterBox mt="24px">
              <Box ml="114px">
                <BorrowTypography
                  variant="subtitle1"
                  color={check === 1 ? '#FFFFFF' : '#A0A3BD'}
                  onClick={() => {
                    setCheck(1)
                    setAmount('')
                  }}
                >
                  Borrow
                </BorrowTypography>
                <Box
                  className={check === 1 ? 'BorrowOrRepay' : ''}
                  sx={{ width: '100%', height: '5px', borderRadius: '21px', marginTop: '13.5px' }}
                ></Box>
              </Box>
              <Box ml="68px">
                <BorrowTypography
                  variant="subtitle1"
                  color={check === 2 ? '#FFFFFF' : '#A0A3BD'}
                  onClick={() => {
                    setCheck(2)
                    setAmount('')
                  }}
                >
                  Repay
                </BorrowTypography>
                <Box
                  className={check === 2 ? 'BorrowOrRepay' : ''}
                  sx={{ width: '100%', height: '5px', borderRadius: '21px', marginTop: '13.5px' }}
                ></Box>
              </Box>
            </CenterBox>
          </Box>
        </TopBox>
        <BottomBox>
          <BorrowAmountBox>
            <SpaceBetweenBox>
              <Box width={'200px'}>
                <Typography variant="body1" component="p" color="#14142A">
                  {check === 1 ? 'Borrow Amount' : 'Repay Amount'}
                </Typography>
                <CenterBox mt="4px">
                  <img src={myCollateral} alt="" />
                  <TextField
                    autoFocus={true}
                    sx={{ marginLeft: '4px', height: '45px' }}
                    placeholder="0.00"
                    value={amount}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      event.target.value = event.target.value.replace(/^\D*(\d*(?:\.\d{0,10})?).*$/g, '$1')
                      setAmount(event.target.value)
                    }}
                  />
                </CenterBox>
              </Box>
              {check === 1 ? (
                <Box>
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Typography mt="20px" variant="body2" fontWeight="600" color="#A0A3BD">
                      Borrow Limit
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Typography mt="4px" variant="body1" fontWeight="600" color="#A0A3BD">
                      {fixedFormat(borrowLimit)} ETH
                    </Typography>
                  </Box>
                </Box>
              ) : (
                <Box>
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <MAXBox
                      onClick={() => {
                        setAmount(ethDebt)
                      }}
                    >
                      <Typography variant="body2" component="p">
                        MAX
                      </Typography>
                    </MAXBox>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Typography mt="8px" variant="body1" color="#14142A">
                      {fixedFormat(ethDebt)} ETH
                    </Typography>
                  </Box>
                </Box>
              )}
            </SpaceBetweenBox>
            <BeforeImg src={loanModalBefore} alt=""></BeforeImg>
          </BorrowAmountBox>
          <Box mb="21px" mt="9px" height="8px" width="372px">
            <CustomizedSlider sliderValue={sliderValue} riskLevelTag={riskLevelTag}></CustomizedSlider>
          </Box>
          <SpaceBetweenBox mb="16.5px">
            <FlexBox>
              <Typography variant="body1" color="#A0A3BD">
                Risk level
              </Typography>
              <Typography className={riskLevelTag} ml="8px" variant="body1" fontWeight="700">
                {TypographyRiskLevel}
              </Typography>
            </FlexBox>
            <FlexBox>
              <Typography variant="body1" fontWeight="600" color="#A0A3BD">
                {heath}% {'>'}
              </Typography>
              <Typography ml="6px" variant="body1" fontWeight="700" color="#14142A">
                {amount ? debtRiskLevel : heath}%
              </Typography>
            </FlexBox>
          </SpaceBetweenBox>
          <Box sx={{ width: '371px', border: '0.5px solid #EFF0F6' }}></Box>
          <SpaceBetweenBox mt="16.5px">
            <Box>
              <Typography variant="body1" color="#A0A3BD">
                Debt (ETH)
              </Typography>
            </Box>
            <FlexBox>
              <Typography variant="body1" fontWeight="600" color="#A0A3BD">
                {fixedFormat(ethDebt)} {'>'}
              </Typography>
              <Typography ml="6px" variant="body1" fontWeight="700" color="#14142A">
                {fixedFormat(plus(ethDebt, times(amount, check === 1 ? 1 : -1)))}
              </Typography>
            </FlexBox>
          </SpaceBetweenBox>
          <SpaceBetweenBox mt="16px">
            <Box>
              <Typography variant="body1" color="#A0A3BD">
                Borrow Limit Used
              </Typography>
            </Box>
            <FlexBox>
              <Typography variant="body1" fontWeight="600" color="#A0A3BD">
                {new BigNumber(borrowLimitUsed).toFixed(2, 1)}% {'>'}
              </Typography>
              <Typography ml="6px" variant="body1" fontWeight="700" color="#14142A">
                {new BigNumber(upBorrowLimitUsed).toFixed(2, 1)}%
              </Typography>
            </FlexBox>
          </SpaceBetweenBox>
          <RightFlexBox>
            <FlexBox>
              <Box width={'65px'}>
                <Typography variant="subtitle2" color="#4BC8B1">
                  20%
                </Typography>
              </Box>
              <Box sx={{ width: '52px' }}>
                <FlexBox>
                  <img height="8.25px" width="8.25px" src={addIcon} alt="" />
                </FlexBox>
              </Box>
              <Box width={'66px'}>
                <Typography variant="subtitle2" color="#6E7191">
                  {erc20ReserveData.borrowRate}%
                </Typography>
              </Box>
              <Box width="50px">
                <RightBox>
                  <img height="8.25px" width="8.25px" src={rightIcon} alt="" />
                </RightBox>
              </Box>
              <Box>
                <Typography variant="subtitle2" color="#4E4B66">
                  10%
                </Typography>
              </Box>
            </FlexBox>
            <FlexBox>
              <Box width="117px">
                <Typography variant="body2" fontWeight="500" color="#A0A3BD">
                  Token Reward
                </Typography>
              </Box>
              <Box width="116px">
                <Typography variant="body2" fontWeight="600" color="#A0A3BD">
                  Borrow APY
                </Typography>
              </Box>
              <Box>
                <Typography variant="body2" fontWeight="600" color="#4E4B66">
                  Net Borrow APY
                </Typography>
              </Box>
            </FlexBox>
          </RightFlexBox>
          {/* <FlexBox display={+debtRiskLevel < 110 ? '' : 'none'}> */}
          <FlexBox display={new BigNumber(amount).gt(borrowLimit) ? '' : 'none'}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clipPath="url(#clip0_741_8707)">
                <circle cx="7" cy="7" r="6.5" stroke="#E1536C" />
                <path
                  d="M7.00908 8.34798C6.73708 8.34798 6.58908 8.19598 6.56508 7.89198L6.21708 3.47598C6.20108 3.22798 6.26508 3.01998 6.40908 2.85198C6.56108 2.68398 6.75708 2.59998 6.99708 2.59998C7.23708 2.59998 7.43308 2.68398 7.58508 2.85198C7.73708 3.01998 7.80108 3.22798 7.77708 3.47598L7.44108 7.89198C7.41708 8.19598 7.27308 8.34798 7.00908 8.34798ZM6.92508 11C6.69308 11 6.51308 10.94 6.38508 10.82C6.26508 10.692 6.20508 10.512 6.20508 10.28V10.076C6.20508 9.84398 6.26508 9.66798 6.38508 9.54798C6.51308 9.41998 6.69308 9.35598 6.92508 9.35598H7.08108C7.31308 9.35598 7.48908 9.41998 7.60908 9.54798C7.73708 9.66798 7.80108 9.84398 7.80108 10.076V10.28C7.80108 10.512 7.73708 10.692 7.60908 10.82C7.48908 10.94 7.31308 11 7.08108 11H6.92508Z"
                  fill="#E1536C"
                />
              </g>
              <defs>
                <clipPath id="clip0_741_8707">
                  <rect width="14" height="14" fill="white" />
                </clipPath>
              </defs>
            </svg>
            <Typography ml="0.5rem" variant="body2" fontWeight="600" color="#E1536C">
              Your collateral can easily be liquidated if the borrowing limit is reached
            </Typography>
          </FlexBox>
          {check === 1 && new BigNumber(amount).gt(borrowLimit) ? (
            // {check === 1 && +debtRiskLevel < 110 ? (
            <LiquidatedBox>
              <Typography
                sx={{
                  cursor: 'not-allowed',
                }}
                variant="body1"
                fontWeight="700"
                color="#E1536C"
              >
                Borrow
              </Typography>
            </LiquidatedBox>
          ) : (
            <Button
              disabled={buttonDisabled}
              variant="contained"
              sx={{ width: '372px', height: '54px', marginTop: '24px' }}
              onClick={() => {
                if (check === 1) {
                  borrowSubmit()
                  setAmount('')
                } else {
                  repaySubmit()
                  setAmount('')
                }
              }}
            >
              {check === 1 ? 'Borrow' : 'Repay'}
            </Button>
          )}
        </BottomBox>
      </Box>
    </Modal>
  )
}
