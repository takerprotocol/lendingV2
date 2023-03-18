// import prompt from 'assets/images/svg/common/prompt.svg'
import redPrompt from 'assets/images/svg/common/redPrompt.svg'
import { styled, Typography, Box, Button, Modal, TextField } from '@mui/material'
import { useEffect, useMemo, useState } from 'react'
import myCollateral from 'assets/images/svg/common/myCollateral.svg'
import { amountDecimal, desensitization, fixedFormat, plus, times } from 'utils'
import BigNumber from 'bignumber.js'
import { toast } from 'react-toastify'
import { useLendingPool } from 'hooks/useLendingPool'
import {
  useAddress,
  // useBorrowLimit,
  // useCollateralBorrowLimitUsed,
  useCollateralRiskLevel,
  useDecimal,
  useEthCollateral,
  // useHeath,
  useUsedCollateral,
  useWalletBalance,
} from 'state/user/hooks'
// import { gasLimit } from 'config'
import {
  isTransactionRecent,
  useAllTransactions,
  useTransactionAdder,
  useTransactionPending,
} from 'state/transactions/hooks'
import { TransactionType } from 'state/transactions/types'
import { useGateway } from 'hooks/useGateway'
import { SpaceBetweenBox } from 'styleds'
import { useApproveCallback, useTTokenApproveCallback } from 'hooks/transactions/useApproveCallback'
import { ApprovalState } from 'hooks/transactions/useApproval'
import TipsTooltip from '../TipsTooltip'
import { Loading } from 'components/Loading'
import { useShowChangeNetWork } from 'state/application/hooks'

const style = {
  width: '100%',
  transform: 'rgba(0, 0, 0, 0.5)',
  position: 'relative',
}
const TopBox = styled(Box)`
  margin-left: 2.375rem;
  margin-right: 2.375rem;
  padding: 1rem 1rem 0.625rem 1.5rem;
  background: linear-gradient(249.47deg, #6aa2f7 0%, #627eea 100%);
  box-shadow: 0px 0.625rem 1.25rem rgba(20, 20, 42, 0.3);
  border-radius: 0.75rem 0.75rem 0px 0px;
  .BorrowOrRepay {
    color: #ffffff;
    background: #ffffff;
  }
`
const StepTypography = styled(Typography)`
  font-weight: 500;
  font-size: 12px;
  margin-right: 8px;
  line-height: 160%;
  color: #ffffff;
`
const BottomBox = styled(Box)`
  margin-left: 2.375rem;
  margin-right: 2.375rem;
  margin-top: -0.8125rem;
  background: #ffffff;
  box-shadow: 0px 0.9375rem 1.875rem rgba(20, 20, 42, 0.2);
  border-radius: 0.75rem;
  padding: 1rem;
  .MuiOutlinedInput-root {
    height: 1.8125rem;
  }
  .error {
    box-shadow: none;
  }
`
const CenterBox = styled(Box)`
  display: flex;
  align-items: center;
  .MuiInputBase-input {
    font-family: 'Quicksand';
    font-style: normal;
    font-weight: 500;
    font-size: 1.375rem;
    line-height: 1.8125rem;
  }
`
const FlexBox = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: flex-start;
`
const BorrowAmountBox = styled(Box)`
  width: 100%;
  background: #eff0f6;
  border-radius: 0.5rem;
  padding: 1rem;
`
const ValueTypography = styled(Typography)`
  font-family: 'Quicksand';
  font-style: normal;
  font-weight: 600;
  font-size: 1.25rem;
  line-height: 160%;
  color: #eff0f6;
  display: contents;
`
const ValueTextField = styled(TextField)`
  font-family: 'Quicksand';
  font-style: normal;
  font-weight: 500;
  font-size: 1.375rem;
  line-height: 1.8125rem;
`
export const MAXBox = styled(Box)`
  padding: 0.0625rem 0.5rem;
  background: #d9dbe9;
  border-radius: 0.25rem;
  color: #262338;
  &.max {
    color: #ffffff;
    background: #14142a;
  }
  :hover {
    color: #ffffff;
    background: #14142a;
  }
`
export const SupplySpaceBetweenBox = styled(Box)`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`
const NetSupplyAPY = styled(FlexBox)`
  background: #f7f7fc;
  border-radius: 0.375rem;
  width: 100%;
  padding: 0.4375rem;
  display: flex;
  margin-top: 1.5rem;
  margin-bottom: 0.5rem;
`
interface MySupplyModalProps {
  openMySupplyModal: boolean
  setOpenMySupplyModal: Function
  type: number
  mySupply: string
}
export default function MobileMyAssetsModal({
  openMySupplyModal,
  setOpenMySupplyModal,
  type,
  mySupply,
}: MySupplyModalProps) {
  const [borrowOrRepay, setBorrowOrRepay] = useState<number>(type)
  // const [supplyLimit, setSupplyLimit] = useState('')
  const supplyLimit = useWalletBalance()
  const [loading, setLoading] = useState(false)
  const [amount, setAmount] = useState('')
  const contract = useGateway()
  const poolContract = useLendingPool()
  const address = useAddress()
  const showChangeNetWork = useShowChangeNetWork()
  // const heath = useHeath()
  const ethCollateral = useEthCollateral()
  const collateralRiskLevel = useCollateralRiskLevel(times(amount, borrowOrRepay === 1 ? 1 : -1))
  // const TypographyRiskLevel = getRiskLevel(collateralRiskLevel)
  // const riskLevelTag = getRiskLevelTag(collateralRiskLevel)
  // const borrowLimitUsed = useCollateralBorrowLimitUsed()
  // const upBorrowLimitUsed = useCollateralBorrowLimitUsed(times(amount, borrowOrRepay === 1 ? 1 : -1))
  // const borrowLimit = useBorrowLimit() //操作前的borrowLimit
  // const upBorrowLimit = useBorrowLimit(times(amount, borrowOrRepay === 1 ? 1 : -1)) //操作后的borrowLimit
  const usedCollateral = useUsedCollateral()
  // const erc20ReserveData = useErc20ReserveData()
  const addTransaction = useTransactionAdder()
  const [approval, approveCallback] = useApproveCallback(amount, contract?.address)
  const [tokenApproval, tokenApproveCallback] = useTTokenApproveCallback(amount, contract?.address)
  const transactionPending = useTransactionPending()
  // const erc20Contract = useContract(ERC20_ADDRESS, erc20Abi)
  const decimal = useDecimal()
  const transactions = useAllTransactions()
  const flag = useMemo(() => {
    return Object.keys(transactions).filter((hash) => {
      const tx = transactions[hash]
      return (
        tx &&
        tx.receipt &&
        (tx.info.type === TransactionType.APPROVAL ||
          tx.info.type === TransactionType.DEPOSIT ||
          tx.info.type === TransactionType.WITHDRAW) &&
        isTransactionRecent(tx)
      )
    }).length
  }, [transactions])
  useEffect(() => {
    setLoading(false)
  }, [flag])
  // useEffect(() => {
  //   if (erc20Contract && address) {
  //     erc20Contract.balanceOf(address).then((res: BigNumber) => {
  //       setSupplyLimit(fromWei(res.toString()).toString())
  //     })
  //   }
  // }, [erc20Contract, address])
  useEffect(() => {
    setBorrowOrRepay(type)
  }, [type])
  const depositPending = useMemo(() => {
    return transactionPending.filter((el) => el.info.type === TransactionType.DEPOSIT)
  }, [transactionPending])

  const withdrawPending = useMemo(() => {
    return transactionPending.filter((el) => el.info.type === TransactionType.WITHDRAW)
  }, [transactionPending])
  const supplySubmit = async () => {
    if (new BigNumber(amount).lte(0)) {
      toast.error('Minimum supply 0')
      return
    }
    if (contract && address) {
      setLoading(true)
      if (approval !== ApprovalState.APPROVED) {
        await approveCallback().catch(() => setLoading(false))
      } else {
        contract
          .deposit(poolContract?.address, address, {
            value: amountDecimal(amount, decimal),
            // gasLimit,
          })
          .then((res: any) => {
            setLoading(false)
            addTransaction(res, {
              type: TransactionType.DEPOSIT,
              recipient: address,
              amount,
            })
            toast.success(desensitization(res.hash))
            // setAmount('')
            setOpenMySupplyModal(false)
          })
          .catch((error: any) => {
            setLoading(false)
            toast.error(error.message)
          })
      }
    }
  }
  const withdrawSubmit = async () => {
    if (new BigNumber(amount).lte(0)) {
      toast.error('Minimum supply 0')
      return
    }
    if (contract && address) {
      setLoading(true)
      if (tokenApproval !== ApprovalState.APPROVED) {
        await tokenApproveCallback().catch(() => setLoading(false))
      } else {
        contract
          .withdraw(poolContract?.address, amountDecimal(amount, decimal), address)
          .then((res: any) => {
            setLoading(false)
            toast.success(desensitization(res.hash))
            addTransaction(res, {
              type: TransactionType.WITHDRAW,
              recipient: address,
              amount,
            })
            setAmount('')
            setOpenMySupplyModal(false)
          })
          .catch((error: any) => {
            setLoading(false)
            toast.error(error.message)
          })
      }
    }
  }
  const finalApprove = useMemo(() => {
    return borrowOrRepay === 1 ? approval : tokenApproval
  }, [approval, borrowOrRepay, tokenApproval])

  const overSupply = useMemo(() => {
    if (borrowOrRepay === 2) {
      return new BigNumber(collateralRiskLevel).lt(110)
    } else {
      return false
    }
  }, [borrowOrRepay, collateralRiskLevel])

  const buttonDisabled = useMemo(() => {
    return borrowOrRepay === 1
      ? !amount || new BigNumber(amount).gt(supplyLimit)
      : !amount || new BigNumber(amount).gt(ethCollateral)
  }, [amount, borrowOrRepay, ethCollateral, supplyLimit])
  console.log(showChangeNetWork)
  return (
    <Modal open={openMySupplyModal} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
      <Box sx={style}>
        <TopBox>
          <SupplySpaceBetweenBox mb={showChangeNetWork ? '18px' : '0'} alignItems="flex-start">
            <Box>
              <Typography mt="2rem" variant="body2" color="rgba(255, 255, 255, 0.7)">
                Currently Supplying
              </Typography>
              <Box>
                <ValueTypography>{fixedFormat(mySupply)}</ValueTypography>
                <Typography ml="0.375rem" variant="body1" component="span" fontWeight="700" color="#EFF0F6">
                  ETH
                </Typography>
              </Box>
            </Box>
            <Box>
              <Box
                sx={{ display: 'flex', justifyContent: 'flex-end', cursor: 'pointer' }}
                onClick={() => {
                  setOpenMySupplyModal(false)
                  setAmount('')
                }}
              >
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    opacity="0.7"
                    d="M23.1943 10.4171C23.6393 9.97216 23.6393 9.2507 23.1943 8.80571C22.7493 8.36073 22.0278 8.36073 21.5829 8.80571L16 14.3886L10.4171 8.80571C9.97216 8.36073 9.2507 8.36073 8.80571 8.80571C8.36073 9.2507 8.36073 9.97216 8.80571 10.4171L14.3886 16L8.80572 21.5829C8.36073 22.0278 8.36073 22.7493 8.80571 23.1943C9.2507 23.6393 9.97216 23.6393 10.4171 23.1943L16 17.6114L21.5829 23.1943C22.0278 23.6393 22.7493 23.6393 23.1943 23.1943C23.6393 22.7493 23.6393 22.0278 23.1943 21.5829L17.6114 16L23.1943 10.4171Z"
                    fill="white"
                  />
                </svg>
              </Box>
              {/* <FlexBox mt={usedCollateral ? '0.75rem' : '1.8125rem'}>
                {!usedCollateral ? (
                  <Typography mr="0.375rem" variant="body2" color="rgba(255, 255, 255, 0.7)">
                    Non-collateral
                  </Typography>
                ) : (
                  <Box mr="0.25rem">
                    <Typography mr="0.375rem" lineHeight="140%" variant="body2" color="rgba(255, 255, 255, 0.7)">
                      Used as&nbsp;
                    </Typography>
                    <Typography mr="0.375rem" lineHeight="140%" variant="body2" color="rgba(255, 255, 255, 0.7)">
                      Collateral
                    </Typography>
                  </Box>
                )}
                <img src={prompt} alt="" />
              </FlexBox> */}
            </Box>
          </SupplySpaceBetweenBox>
          {!showChangeNetWork && (
            <SpaceBetweenBox m="1.125rem 3.375rem 0 3.5rem">
              <Box display={usedCollateral ? '' : 'none'}>
                <Typography
                  variant="body1"
                  fontWeight="700"
                  sx={{ cursor: 'pointer' }}
                  color={borrowOrRepay === 1 ? '#FFFFFF' : 'rgba(255, 255, 255, 0.7)'}
                  onClick={() => {
                    setBorrowOrRepay(1)
                    setAmount('')
                  }}
                >
                  Supply
                </Typography>
                <Box
                  className={borrowOrRepay === 1 ? 'BorrowOrRepay' : ''}
                  sx={{ width: '100%', height: '0.3125rem', borderRadius: '1.3125rem', marginTop: '0.3125rem' }}
                ></Box>
              </Box>
              <Box display={usedCollateral ? '' : 'none'}>
                <Typography
                  variant="body1"
                  fontWeight="700"
                  sx={{ cursor: 'pointer' }}
                  color={borrowOrRepay === 2 ? '#FFFFFF' : 'rgba(255, 255, 255, 0.7)'}
                  onClick={() => {
                    setBorrowOrRepay(2)
                    setAmount('')
                  }}
                >
                  Withdraw
                </Typography>
                <Box
                  className={borrowOrRepay === 2 ? 'BorrowOrRepay' : ''}
                  sx={{ width: '100%', height: '0.3125rem', borderRadius: '1.3125rem', marginTop: '0.3125rem' }}
                ></Box>
              </Box>
            </SpaceBetweenBox>
          )}
        </TopBox>
        <BottomBox>
          <BorrowAmountBox>
            <SpaceBetweenBox>
              <Box>
                <Typography variant="body2" lineHeight="0.75rem" color="#1F1D23">
                  {borrowOrRepay === 1 ? 'Supply Amount' : 'Withdraw Amount'}
                </Typography>
                <CenterBox mt="0.5rem" width="9rem">
                  <img src={myCollateral} alt="" />
                  <ValueTextField
                    autoFocus={true}
                    sx={{ marginLeft: '0.25rem', fontSize: '1.375rem' }}
                    placeholder="0.00"
                    value={amount}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      event.target.value = event.target.value.replace(/^\D*(\d*(?:\.\d{0,10})?).*$/g, '$1')
                      setAmount(event.target.value)
                    }}
                  />
                </CenterBox>
              </Box>
              <Box>
                <Box
                  sx={{ display: 'flex', justifyContent: 'flex-end' }}
                  onClick={() => {
                    if (borrowOrRepay === 1) {
                      setAmount(supplyLimit)
                    } else {
                      setAmount(mySupply)
                    }
                  }}
                >
                  <MAXBox
                    className={new BigNumber(amount).gte(borrowOrRepay === 1 ? supplyLimit : mySupply) ? 'max' : ''}
                  >
                    <Typography variant="body2" fontWeight="600">
                      MAX
                    </Typography>
                  </MAXBox>
                </Box>
                <Box mt="0.5rem" sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Typography variant="body2" fontWeight="600">
                    {borrowOrRepay === 1 ? fixedFormat(supplyLimit) : mySupply} ETH
                  </Typography>
                </Box>
              </Box>
            </SpaceBetweenBox>
          </BorrowAmountBox>
          <Box mt="1.5rem">
            <SpaceBetweenBox>
              <Typography variant="body2" color="#A0A3BD">
                Supply Amount (ETH)
              </Typography>
              <FlexBox>
                <Typography fontWeight="600" variant="body2" color="#A0A3BD">
                  {fixedFormat(mySupply)} {'>'}
                </Typography>
                <Typography ml="0.375rem" variant="body2" fontWeight="700" color="#14142A">
                  {fixedFormat(plus(mySupply, amount ? (borrowOrRepay === 1 ? amount : times(amount, -1)) : 0))}
                </Typography>
              </FlexBox>
            </SpaceBetweenBox>
            {/* {usedCollateral && (
              <Box>
                <SpaceBetweenBox mt="1rem">
                  <Typography variant="body2" color="#A0A3BD">
                    Borrow Limited (ETH)
                  </Typography>
                  <FlexBox>
                    <Typography variant="body2" fontWeight="600" color={'#A0A3BD'}>
                      {fixedFormat(borrowLimit)} {'>'}
                    </Typography>
                    <Typography
                      ml="0.375rem"
                      variant="body2"
                      fontWeight="700"
                      color={overSupply ? '#E1536C' : '#14142A'}
                    >
                      {fixedFormat(upBorrowLimit)}
                    </Typography>
                  </FlexBox>
                </SpaceBetweenBox>
                <SpaceBetweenBox mt="1rem">
                  <Typography variant="body2" color="#A0A3BD">
                    Borrow Limit Used
                  </Typography>
                  <FlexBox>
                    <Typography variant="body2" fontWeight="600" color="#A0A3BD">
                      {new BigNumber(borrowLimitUsed).toFixed(2, 1)}% {'>'}
                    </Typography>
                    <Typography
                      ml="0.375rem"
                      variant="body2"
                      fontWeight="700"
                      color={overSupply ? '#E1536C' : '#14142A'}
                    >
                      {new BigNumber(upBorrowLimitUsed).toFixed(2, 1)}%
                    </Typography>
                  </FlexBox>
                </SpaceBetweenBox>
                <SpaceBetweenBox mt="1rem">
                  <FlexBox>
                    <Typography variant="body2" color="#A0A3BD">
                      Heath Level
                    </Typography>
                    <Typography className={riskLevelTag} ml="0.5rem" variant="body2" fontWeight="700">
                      {TypographyRiskLevel}
                    </Typography>
                  </FlexBox>
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Typography fontWeight="600" variant="body2" color="#A0A3BD">
                      {Math.floor(Number(heath))}% {'>'}
                    </Typography>
                    <Typography ml="6px" variant="body2" fontWeight="700" color="#14142A">
                      {Math.floor(Number(amount ? collateralRiskLevel : heath))}%
                    </Typography>
                  </Box>
                </SpaceBetweenBox>
              </Box>
            )} */}
          </Box>
          <NetSupplyAPY>
            <Typography variant="body2" ml="4.25rem" fontWeight="600" color="#A0A3BD" lineHeight="0.75rem">
              Net Supply APY
            </Typography>
            <Typography mx="0.375rem" fontWeight="600" variant="body2" lineHeight="0.75rem">
              10%
            </Typography>
            <TipsTooltip size="14" value="1234"></TipsTooltip>
          </NetSupplyAPY>
          {/* <Button
            disabled={buttonDisabled}
            variant="contained"
            className={overSupply ? 'error' : ''}
            color={overSupply ? 'error' : 'primary'}
            sx={{ width: '100%', height: '3rem' }}
            onClick={() => {
              if (borrowOrRepay === 1) {
                supplySubmit()
                // setAmount('')
              } else {
                withdrawSubmit()
                // setAmount('')
              }
            }}
          >
             {borrowOrRepay === 1
              ? approval === ApprovalState.APPROVED || !amount
                ? 'Supply'
                : approval === ApprovalState.PENDING
                ? 'Pending'
                : 'Approve'
              : tokenApproval === ApprovalState.APPROVED || !amount
              ? 'Withdraw'
              : tokenApproval === ApprovalState.PENDING
              ? 'Pending'
              : 'Approve'} 
            {borrowOrRepay === 1 ? 'Supply' : 'Withdraw'}
          </Button> */}
          <Box justifyContent="space-between" marginTop="24px" display="flex" alignItems="center">
            {tokenApproval !== ApprovalState.APPROVED && new BigNumber(amount).gt(0) && (
              <Button
                variant="contained"
                disabled={finalApprove !== ApprovalState.NOT_APPROVED}
                sx={{ width: '50%', height: '3rem', marginRight: '1rem' }}
                onClick={() => {
                  // supply
                  if (borrowOrRepay === 1) {
                    supplySubmit()
                    // setAmount('')
                  } else {
                    withdrawSubmit()
                    // setAmount('')
                  }
                }}
              >
                {depositPending.length > 0 || withdrawPending.length > 0 || loading ? <Loading></Loading> : <></>}
                {!loading && <StepTypography sx={{ opacity: '0.7' }}>Step1</StepTypography>}Approve
              </Button>
            )}
            <Button
              disabled={buttonDisabled}
              variant="contained"
              sx={{
                width: finalApprove !== ApprovalState.APPROVED && new BigNumber(amount).gt(0) ? '50%' : '100%',
                height: '3rem',
              }}
              color={overSupply ? 'error' : 'primary'}
              onClick={() => {
                // supply
                if (borrowOrRepay === 1) {
                  supplySubmit()
                  // setAmount('')
                } else {
                  withdrawSubmit()
                  // setAmount('')
                }
              }}
            >
              {depositPending.length > 0 ||
              withdrawPending.length > 0 ||
              (loading && finalApprove === ApprovalState.APPROVED) ? (
                <Loading></Loading>
              ) : (
                <></>
              )}
              {!loading && finalApprove !== ApprovalState.APPROVED && new BigNumber(amount).gt(0) && (
                <StepTypography>Step2</StepTypography>
              )}
              {borrowOrRepay === 1 ? 'Supply' : 'Withdraw'}
            </Button>
          </Box>
          {overSupply && (
            <Box mt="1rem">
              <FlexBox>
                <Box mr="0.5rem" mt="-0.875rem" pt="1px" height="2.375rem">
                  <img src={redPrompt} alt="" />
                </Box>
                <Typography color="#E1536C" variant="body2">
                  If you withdraw the maximum amount of collateral ETH, your collateral will be easily liquidate
                </Typography>
              </FlexBox>
            </Box>
          )}
        </BottomBox>
      </Box>
    </Modal>
  )
}
