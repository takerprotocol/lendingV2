import greyShutOff from 'assets/images/svg/common/greyShutOff.svg'
import { styled, Typography, Box, Button, Modal, TextField } from '@mui/material'
import redPrompt from 'assets/images/svg/common/redPrompt.svg'
import { useEffect, useMemo, useState } from 'react'
import loanModalBefore from 'assets/images/svg/dashboard/loanModal-before.svg'
import CustomizedSlider from 'components/Slider'
import myCollateral from 'assets/images/svg/common/myCollateral.svg'
import { fixedFormat, getRiskLevel, getRiskLevelTag, plus, times, amountDecimal, minus, div } from 'utils'
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
import TipsTooltip from '../TipsTooltip'
import { useDTokenApproveCallback } from 'hooks/transactions/useApproveCallback'
import { ApprovalState } from 'hooks/transactions/useApproval'
const style = {
  width: '100%',
  transform: 'rgba(0, 0, 0, 0.5)',
  borderRadius: '12px',
  position: 'relative',
}
const TopBox = styled(Box)`
  margin-left: 2.375rem;
  margin-right: 2.375rem;
  border-radius: 0.75rem 0.75rem 0px 0px;
  background: linear-gradient(
      58.83deg,
      rgba(102, 166, 232, 0) 2.81%,
      rgba(135, 143, 248, 0.147) 62.58%,
      rgba(105, 165, 233, 0.3) 100%
    ),
    linear-gradient(180deg, #1d172e 0%, #181529 77.33%);
  box-shadow: 0px 0.625rem 1.25rem rgba(75, 75, 122, 0.2);
  .BorrowOrRepay {
    color: #ffffff;
    background: #ffffff;
  }
`
const BottomBox = styled(Box)`
  margin-left: 2.375rem;
  margin-right: 2.375rem;
  background: #ffffff;
  box-shadow: 0px 0.9375rem 1.875rem rgba(20, 20, 42, 0.2);
  border-radius: 0.75rem;
  margin-top: -0.75rem;
  padding: 1rem;
  input::-webkit-input-placeholder {
    color: #a0a3bd;
  }
  input::-moz-placeholder {
    color: #a0a3bd;
  }
  input:-ms-input-placeholder {
    color: #a0a3bd;
  }
  input:-moz-placeholder {
    color: #a0a3bd;
  }
  .MuiOutlinedInput-input {
    font-family: 'Quicksand';
    font-style: normal;
    font-weight: 500;
    font-size: 22px;
    line-height: 130%;
  }
  .MuiSlider-colorPrimary {
    padding: 0;
  }
`
const CenterBox = styled(Box)`
  display: flex;
  align-items: center;
  .MuiInputBase-input {
    font-size: 1.375rems;
  }
`
const MAXBox = styled(Box)`
  width: 2.625rem;
  height: 1.3125rem;
  padding: 0.0625rem 0.5rem;
  background: #d9dbe9;
  border-radius: 0.25rem;
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
const StartBox = styled(Box)`
  margin-top: 1rem;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
`
// const RightBox = styled(Box)`
//   display: flex;
//   align-items: center;
//   justify-content: flex-start;
//   width: 18px;
//   border-radius: 100%;
//   height: 18px;
//   background: #eff0f6;
//   padding: 4.88px;
// `
const HealthyButton = styled(Box)`
  padding: 0.25rem 0.75rem;
  margin-top: 1.625rem;
  border-radius: 1.25rem;
  cursor: pointer;
  background: linear-gradient(180deg, #1cc1a4 0%, #1cb5ab 100%);
  box-shadow: 0px 0.25rem 0.5rem rgba(28, 183, 171, 0.1);
`
const HighRiskButton = styled(Box)`
  padding: 0.25rem 0.75rem;
  margin-top: 1.625rem;
  border-radius: 1.25rem;
  cursor: pointer;
  background: linear-gradient(180deg, #ff7272 0%, #e1536c 100%);
  box-shadow: 0px 0.25rem 0.5rem rgba(221, 140, 140, 0.1);
`
const RiskyButton = styled(Box)`
  padding: 0.25rem 0.75rem;
  margin-top: 1.625rem;
  border-radius: 1.25rem;
  cursor: pointer;
  background: linear-gradient(180deg, #fba170 0%, #ef884f 100%);
  box-shadow: 0px 0.25rem 0.5rem rgba(221, 183, 140, 0.1);
`
const BorrowTypography = styled(Typography)`
  font-family: 'Quicksand';
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 160%;
  display: flex;
  align-items: center;
  text-align: center;
`
const BorrowAmountBox = styled(Box)`
  background: #eff0f6;
  border-radius: 0.5rem;
  padding: 0 1rem 1rem 1rem;
  position: relative;
  margin-bottom: 0.6875rem;
  &.left {
    border-bottom-left-radius: 0px !important;
  }
  &.right {
    border-bottom-right-radius: 0px !important;
  }
`
const ValueTypography = styled(Typography)`
  font-family: 'Quicksand';
  font-style: normal;
  font-weight: 600;
  font-size: 1.25rem;
  display: contents;
  line-height: 2rem;
  color: #eff0f6;
`
const ValueTextField = styled(TextField)`
  font-family: 'Quicksand';
  font-style: normal;
  font-weight: 500;
  font-size: 22px;
  line-height: 130%;
  color: #14142a;
`
const NetBorrowAPY = styled(Box)`
  background: #f7f7fc;
  border-radius: 6px;
  width: 100%;
  display: flex;
  padding: 0.375rem 0;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1.625rem;
`
interface MyLoanModalProps {
  open: boolean
  repayRoBorrow: number
  onClose: Function
}
export default function MobileMyLoanModal({ open, repayRoBorrow, onClose }: MyLoanModalProps) {
  const [check, setCheck] = useState<number>(repayRoBorrow)
  const [amount, setAmount] = useState<string>('')
  const [slider, setSlider] = useState<number>(0)
  const heath = useHeath()
  const debtRiskLevel = useDebtRiskLevel(times(amount, check === 1 ? 1 : -1))
  const upBorrowLimitUsed = useDebtBorrowLimitUsed(times(amount, check === 1 ? 1 : -1))
  const borrowLimitUsed = useDebtBorrowLimitUsed()
  const TypographyRiskLevel = getRiskLevel(amount ? debtRiskLevel : heath)
  const riskLevelTag = getRiskLevelTag(amount ? debtRiskLevel : heath)
  const contract = useGateway()
  const erc20ReserveData = useErc20ReserveData()
  const poolContract = useLendingPool()
  // const erc20ReserveData = useErc20ReserveData()
  const borrowLimit = useBorrowLimit()
  const decimal = useDecimal()
  const address = useAddress()
  const ethDebt = useEthDebt()
  const addTransaction = useTransactionAdder()
  const [tokenApproval, tokenApproveCallback] = useDTokenApproveCallback(amount, contract?.address)
  const repayValue = useMemo(() => {
    return times(div(amount, ethDebt), 100)
  }, [amount, ethDebt])
  const beforeValue = useMemo(() => {
    if (new BigNumber(upBorrowLimitUsed).gte(100)) {
      return 100
    } else if (new BigNumber(upBorrowLimitUsed).lte(0)) {
      return 0
    } else {
      return upBorrowLimitUsed
    }
  }, [upBorrowLimitUsed])
  // const bef = useMemo(() => {
  //   if (new BigNumber(beforeValue).gte(100)) {
  //     return 94
  //   } else if (new BigNumber(beforeValue).lte(0)) {
  //     return 0
  //   } else {
  //     return beforeValue
  //   }
  // }, [beforeValue])
  const BeforeImg = styled('img')`
    position: absolute;
    display: block;
    top: calc(100% - 10.5px);
    left: calc(${check === 1 ? beforeValue : repayValue} * 0.1575rem);
  `
  useEffect(() => {
    setCheck(repayRoBorrow)
  }, [repayRoBorrow])
  const borrowSubmit = async () => {
    if (contract) {
      if (check === 1) {
        if (tokenApproval !== ApprovalState.APPROVED) {
          await tokenApproveCallback()
        } else {
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
        }
      } else {
        if (tokenApproval !== ApprovalState.APPROVED) {
          await tokenApproveCallback()
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
  useEffect(() => {
    const count = new BigNumber(borrowLimit).times(new BigNumber(slider).div(100)).toFixed(2, 1)
    if (check === 1) {
      if (new BigNumber(count).gte(minus(borrowLimit, ethDebt))) {
        setAmount(Number(minus(borrowLimit, ethDebt)).toFixed(2))
      } else {
        setAmount(count)
      }
    } else {
      const sun = new BigNumber(ethDebt).times(new BigNumber(slider).div(100)).toFixed(2, 1)
      setAmount(sun)
    }
  }, [borrowLimit, check, ethDebt, slider])
  return (
    <Modal open={open} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
      <Box sx={style}>
        <TopBox height={+ethDebt === 0 ? '8.0625rem' : '10.0625rem'}>
          <SpaceBetweenBox paddingBottom={+ethDebt === 0 ? '2.25rem' : '0px'} alignItems="flex-start">
            <Box m="1.5rem 0 0 1.5rem">
              <Typography mt="1.5rem" variant="body2" component="h1" color="#A0A3BD">
                My Debt
              </Typography>
              <Box>
                <ValueTypography>{fixedFormat(ethDebt)}</ValueTypography>
                <Typography ml="0.375rem" variant="body1" component="span" fontWeight="700" color="#EFF0F6">
                  ETH
                </Typography>
              </Box>
            </Box>
            <Box m="1.5rem 1rem 0px 0px">
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
                  <Typography variant="body2" component="p" fontWeight="700" color="#FFFFFF">
                    In liquidation...
                  </Typography>
                </HighRiskButton>
              ) : new BigNumber(heath).gte(100) && new BigNumber(heath).lte(110) ? (
                <HighRiskButton>
                  <Typography variant="body2" component="p" fontWeight="700" color="#FFFFFF">
                    HIGH RISK
                  </Typography>
                </HighRiskButton>
              ) : new BigNumber(heath).gt(110) && new BigNumber(heath).lte(130) ? (
                <RiskyButton>
                  <Typography variant="body2" component="p" fontWeight="700" color="#FFFFFF">
                    RISKY
                  </Typography>
                </RiskyButton>
              ) : (
                <HealthyButton>
                  <Typography variant="body2" component="p" fontWeight="700" color="#FFFFFF">
                    HEALTHY
                  </Typography>
                </HealthyButton>
              )}
            </Box>
          </SpaceBetweenBox>
          <Box display={+ethDebt === 0 ? 'none' : ''}>
            <CenterBox mt="1.125rem">
              <Box ml="4.875rem">
                <BorrowTypography
                  color={check === 1 ? '#FFFFFF' : '#A0A3BD'}
                  onClick={() => {
                    setCheck(1)
                    setAmount('')
                    setSlider(0)
                  }}
                >
                  Borrow
                </BorrowTypography>
                <Box
                  className={check === 1 ? 'BorrowOrRepay' : ''}
                  sx={{ width: '100%', height: '0.3125rem', borderRadius: '1.3125rem', marginTop: '0.4375rem' }}
                ></Box>
              </Box>
              <Box ml="2.9375rem">
                <BorrowTypography
                  color={check === 2 ? '#FFFFFF' : '#A0A3BD'}
                  onClick={() => {
                    setCheck(2)
                    setAmount('')
                    setSlider(0)
                  }}
                >
                  Repay
                </BorrowTypography>
                <Box
                  className={check === 2 ? 'BorrowOrRepay' : ''}
                  sx={{ width: '100%', height: '0.3125rem', borderRadius: '1.3125rem', marginTop: '0.4375rem' }}
                ></Box>
              </Box>
            </CenterBox>
          </Box>
        </TopBox>
        <BottomBox>
          <BorrowAmountBox
            className={
              new BigNumber(check === 1 ? beforeValue : repayValue).gt(99)
                ? 'right'
                : new BigNumber(check === 1 ? beforeValue : repayValue).lt(1)
                ? 'left'
                : ''
            }
          >
            <SpaceBetweenBox sx={{ alignItems: 'flex-start' }}>
              <Box width="9rem" mt="1rem">
                <Typography variant="body2" lineHeight="0.75rem" color="#14142A">
                  {check === 1 ? 'Borrow Amount' : 'Repay Amount'}
                </Typography>
                <CenterBox mt="0.5rem">
                  <img src={myCollateral} alt="" />
                  <ValueTextField
                    autoFocus={true}
                    sx={{ marginLeft: '0.25rem', height: '1.8125rem' }}
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
                <Box mt="1.25rem">
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Typography variant="body2" fontWeight="600" color="#A0A3BD">
                      Borrow Limit
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Typography mt="0.25rem" variant="body2" fontWeight="600" color="#A0A3BD">
                      {fixedFormat(borrowLimit)} ETH
                    </Typography>
                  </Box>
                </Box>
              ) : (
                <Box mt="1.0625rem">
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <MAXBox
                      onClick={() => {
                        setAmount(ethDebt)
                      }}
                    >
                      <Typography variant="body2">MAX</Typography>
                    </MAXBox>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Typography mt="0.5rem" variant="body2" color="#14142A">
                      {fixedFormat(ethDebt)} ETH
                    </Typography>
                  </Box>
                </Box>
              )}
            </SpaceBetweenBox>
            <BeforeImg src={loanModalBefore} alt=""></BeforeImg>
          </BorrowAmountBox>
          <CustomizedSlider
            sliderValue={check === 1 ? Number(upBorrowLimitUsed) : +repayValue}
            setSlider={setSlider}
            riskLevelTag={riskLevelTag}
          ></CustomizedSlider>
          <SpaceBetweenBox mt="0.5rem" mb="1rem">
            <FlexBox>
              <Typography variant="body1" color="#A0A3BD">
                Risk level
              </Typography>
              <Typography className={riskLevelTag} ml="0.5rem" variant="body1" fontWeight="700">
                {TypographyRiskLevel}
              </Typography>
            </FlexBox>
            <FlexBox>
              <Typography variant="body1" fontWeight="600" color="#A0A3BD">
                {new BigNumber(heath).toFormat(0)}% {'>'}
              </Typography>
              <Typography ml="6px" variant="body1" fontWeight="700" color="#14142A">
                {new BigNumber(amount ? debtRiskLevel : heath).toFormat(0)}%
              </Typography>
            </FlexBox>
          </SpaceBetweenBox>
          <Box sx={{ width: '100%', border: '0.0313rem solid #EFF0F6' }}></Box>
          <SpaceBetweenBox mt="1rem">
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
          <SpaceBetweenBox mt="1rem">
            <Box>
              <Typography variant="body1" color="#A0A3BD">
                Borrow Limit Used
              </Typography>
            </Box>
            <FlexBox>
              <Typography variant="body1" fontWeight="600" color="#A0A3BD">
                {new BigNumber(borrowLimitUsed).toFixed(2, 1)}% {'>'}
              </Typography>
              {new BigNumber(new BigNumber(upBorrowLimitUsed).toFixed(2, 1)).lt(100) ? (
                <Typography ml="0.375rem" variant="body1" fontWeight="700" color="#14142A">
                  {new BigNumber(upBorrowLimitUsed).toFixed(2, 1)}%
                </Typography>
              ) : (
                <Typography ml="0.375rem" color="#E1536C" variant="body1" fontWeight="700">
                  100%+
                </Typography>
              )}
            </FlexBox>
          </SpaceBetweenBox>
          <NetBorrowAPY>
            <Typography variant="body2" fontWeight="600" color="#A0A3BD" lineHeight="0.75rem">
              Net Borrow APY
            </Typography>
            <Typography mx="0.375rem" fontWeight="600" variant="body2" lineHeight="0.75rem">
              {erc20ReserveData.borrowRate}%
            </Typography>
            <TipsTooltip value="1122"></TipsTooltip>
          </NetBorrowAPY>
          <Button
            disabled={Number(amount) === 0 || buttonDisabled}
            color={new BigNumber(debtRiskLevel).lt(110) && check === 1 ? 'error' : 'primary'}
            variant="contained"
            sx={{ width: '100%', height: '3rem', marginTop: '0.5rem' }}
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
            {check === 1
              ? tokenApproval === ApprovalState.APPROVED || !amount
                ? 'Borrow'
                : tokenApproval === ApprovalState.PENDING
                ? 'Loading'
                : 'Approve'
              : tokenApproval === ApprovalState.APPROVED || !amount
              ? 'Repay'
              : tokenApproval === ApprovalState.PENDING
              ? 'Loading'
              : 'Approve'}
          </Button>
          {new BigNumber(debtRiskLevel).lt(110) && check === 1 && (
            <StartBox>
              <Box mt="0.125rem" mr="0.5rem">
                <img src={redPrompt} alt="" />
              </Box>
              <Typography color="#E1536C" variant="body2">
                Your collateral can easily be liquidated if the borrowing limit is reached
              </Typography>
            </StartBox>
          )}
        </BottomBox>
      </Box>
    </Modal>
  )
}
