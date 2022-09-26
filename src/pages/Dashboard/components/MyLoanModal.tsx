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
        </BottomBox>
      </Box>
    </Modal>
  )
}
