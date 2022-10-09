import prompt from 'assets/images/svg/common/prompt.svg'
import redPrompt from 'assets/images/svg/common/redPrompt.svg'
import { styled, Typography, Box, Button, Modal, TextField } from '@mui/material'
import { useEffect, useMemo, useState } from 'react'
// import addIcon from 'assets/images/svg/common/add.svg'
// import rightIcon from 'assets/images/svg/common/right.svg'
import myCollateral from 'assets/images/svg/common/myCollateral.svg'
import { amountDecimal, desensitization, fixedFormat, getRiskLevel, getRiskLevelTag, plus, times } from 'utils'
import BigNumber from 'bignumber.js'
import { toast } from 'react-toastify'
import { useLendingPool } from 'hooks/useLendingPool'
import {
  useAddress,
  useBorrowLimit,
  useCollateralBorrowLimitUsed,
  useCollateralRiskLevel,
  useDecimal,
  // useErc20ReserveData,
  useEthCollateral,
  useHeath,
  useUsedCollateral,
  useWalletBalance,
} from 'state/user/hooks'
import { gasLimit } from 'config'
import { useTransactionAdder } from 'state/transactions/hooks'
// import { TransactionType } from 'state/transactions/types'
// import { useApproveCallback } from 'hooks/transactions/useApproveCallback'
// import { ApprovalState } from 'hooks/transactions/useApproval'
import { TransactionType } from 'state/transactions/types'
import { useGateway } from 'hooks/useGateway'
import { SpaceBetweenBox } from 'styleds'
import { useApproveCallback, useTTokenApproveCallback } from 'hooks/transactions/useApproveCallback'
import { ApprovalState } from 'hooks/transactions/useApproval'
// import { useContract } from 'hooks/useContract'
// import erc20Abi from 'abis/MockErc20.json'
// import { fromWei } from 'web3-utils'

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
const BottomBox = styled(Box)`
  margin-left: 2.375rem;
  margin-right: 2.375rem;
  margin-top: -0.75rem;
  background: #ffffff;
  box-shadow: 0px 0.9375rem 1.875rem rgba(20, 20, 42, 0.2);
  border-radius: 0.75rem;
  padding: 1rem;
  .MuiOutlinedInput-root {
    height: 1.8125rem;
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
// const AddBgBox = styled(Box)`
//   display: flex;
//   align-items: center;
//   width: 18px;
//   border-radius: 100%;
//   height: 18px;
//   background: #eff0f6;
//   padding: 4.88px;
// `
// const RightFlexBox = styled(Box)`
//   background: #f7f7fc;
//   border-radius: 10px;
//   padding: 16px;
//   margin-top: 24px;
//   margin-bottom: 24px;
// `
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
const NetSupplyAPY = styled(Box)`
  background: #f7f7fc;
  border-radius: 6px;
  width: 100%;
  padding: 0.4375rem;
  display: flex;
  align-items: center;
  margin-top: 1.5rem;
  margin-bottom: 0.5rem;
  justify-content: center;
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
  const [amount, setAmount] = useState('')
  const contract = useGateway()
  const poolContract = useLendingPool()
  const address = useAddress()
  const heath = useHeath()
  const ethCollateral = useEthCollateral()
  const collateralRiskLevel = useCollateralRiskLevel(times(amount, borrowOrRepay === 1 ? 1 : -1))
  const TypographyRiskLevel = getRiskLevel(collateralRiskLevel)
  const riskLevelTag = getRiskLevelTag(collateralRiskLevel)
  const borrowLimitUsed = useCollateralBorrowLimitUsed()
  const upBorrowLimitUsed = useCollateralBorrowLimitUsed(times(amount, borrowOrRepay === 1 ? 1 : -1))
  const borrowLimit = useBorrowLimit() //操作前的borrowLimit
  const upBorrowLimit = useBorrowLimit(times(amount, borrowOrRepay === 1 ? 1 : -1)) //操作后的borrowLimit
  const usedCollateral = useUsedCollateral()
  // const erc20ReserveData = useErc20ReserveData()
  const addTransaction = useTransactionAdder()
  const [approval, approveCallback] = useApproveCallback(amount, contract?.address)
  const [tokenApproval, tokenApproveCallback] = useTTokenApproveCallback(amount, contract?.address)
  // const erc20Contract = useContract(ERC20_ADDRESS, erc20Abi)
  const decimal = useDecimal()
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
  const supplySubmit = async () => {
    if (new BigNumber(amount).lte(0)) {
      toast.error('Minimum supply 0')
      return
    }
    if (contract && address) {
      if (approval !== ApprovalState.APPROVED) {
        await approveCallback()
      } else {
        contract
          .deposit(poolContract?.address, address, {
            value: amountDecimal(amount, decimal),
            gasLimit,
          })
          .then((res: any) => {
            addTransaction(res, {
              type: TransactionType.DEPOSIT,
              recipient: address,
              amount,
            })
            toast.success(desensitization(res.hash))
            setAmount('')
            setOpenMySupplyModal(false)
          })
          .catch((error: any) => {
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
      if (tokenApproval !== ApprovalState.APPROVED) {
        await tokenApproveCallback()
      } else {
        contract
          .withdraw(poolContract?.address, amountDecimal(amount, decimal), address, { gasLimit })
          .then((res: any) => {
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
            toast.error(error.message)
          })
      }
    }
  }
  const nonCollateral = useMemo(() => {
    if (usedCollateral) {
      return 'Used as Collateral'
    } else {
      return 'Non-collateral'
    }
  }, [usedCollateral])

  const ModalType = useMemo(() => {
    return amount !== ''
  }, [amount])

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

  return (
    <Modal open={openMySupplyModal} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
      <Box sx={style}>
        <TopBox>
          <SupplySpaceBetweenBox alignItems="flex-start">
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
              <FlexBox mt="1.8125rem">
                <Typography mr="0.375rem" variant="body1" color="#FFFFFF">
                  {nonCollateral}
                </Typography>
                <img src={prompt} alt="" />
              </FlexBox>
            </Box>
          </SupplySpaceBetweenBox>
          <SpaceBetweenBox m="1.125rem 3.375rem 0 3.5rem">
            <Box display={supplyLimit !== '0' ? '' : 'none'}>
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
                sx={{ width: '100%', height: '0.3125rem', borderRadius: '1.3125rem', marginTop: '0.4375rem' }}
              ></Box>
            </Box>
            <Box display={supplyLimit !== '0' ? '' : 'none'}>
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
                sx={{ width: '100%', height: '0.3125rem', borderRadius: '1.3125rem', marginTop: '0.4375rem' }}
              ></Box>
            </Box>
          </SpaceBetweenBox>
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
                    sx={{ marginLeft: '0.4375rem', fontSize: '1.375rem' }}
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
              <Box>
                <Typography fontWeight="600" variant="body2" component="span" color="#A0A3BD">
                  {fixedFormat(mySupply)} {'>'}
                </Typography>
                <Typography ml="0.375rem" variant="body2" component="span" fontWeight="700" color="#14142A">
                  {fixedFormat(plus(mySupply, amount ? (borrowOrRepay === 1 ? amount : times(amount, -1)) : 0))}
                </Typography>
              </Box>
            </SpaceBetweenBox>
            {ModalType && (
              <Box>
                <SpaceBetweenBox mt="1rem">
                  <Typography variant="body2" color="#A0A3BD">
                    Borrow Limited (ETH)
                  </Typography>
                  <Box>
                    <Typography variant="body2" fontWeight="600" component="span" color={'#A0A3BD'}>
                      {fixedFormat(borrowLimit)} {'>'}
                    </Typography>
                    <Typography
                      ml="0.375rem"
                      variant="body2"
                      component="span"
                      fontWeight="700"
                      color={overSupply ? '#E1536C' : '#14142A'}
                    >
                      {fixedFormat(upBorrowLimit)}
                    </Typography>
                  </Box>
                </SpaceBetweenBox>
                <SpaceBetweenBox mt="1rem">
                  <Typography variant="body2" color="#A0A3BD">
                    Borrow Limit Used
                  </Typography>
                  <Box>
                    <Typography variant="body2" fontWeight="600" component="span" color="#A0A3BD">
                      {new BigNumber(borrowLimitUsed).toFixed(2, 1)}% {'>'}
                    </Typography>
                    <Typography
                      ml="0.375rem"
                      variant="body2"
                      component="span"
                      fontWeight="700"
                      color={overSupply ? '#E1536C' : '#14142A'}
                    >
                      {new BigNumber(upBorrowLimitUsed).toFixed(2, 1)}%
                    </Typography>
                  </Box>
                </SpaceBetweenBox>
                <SpaceBetweenBox mt="1rem">
                  <Box>
                    <Typography variant="body2" component="span" color="#A0A3BD">
                      Risk level
                    </Typography>
                    <Typography className={riskLevelTag} ml="0.5rem" variant="body2" component="span" fontWeight="700">
                      {TypographyRiskLevel}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Typography fontWeight="600" variant="body2" component="span" color="#A0A3BD">
                      {heath}% {'>'}
                    </Typography>
                    <Typography ml="6px" variant="body2" component="span" fontWeight="700" color="#14142A">
                      {amount ? collateralRiskLevel : heath}%
                    </Typography>
                  </Box>
                </SpaceBetweenBox>
              </Box>
            )}
          </Box>
          {/* <RightFlexBox>
            <FlexBox>
              <Box width={'65px'}>
                <Typography variant="subtitle2" color="#4BC8B1">
                  20%
                </Typography>
              </Box>
              <Box sx={{ width: '52px' }}>
                <AddBgBox>
                  <img height="8.25px" width="8.25px" src={addIcon} alt="" />
                </AddBgBox>
              </Box>
              <Box width={'66px'}>
                <Typography variant="subtitle2" color="#6E7191">
                  {erc20ReserveData.depositRate}%
                </Typography>
              </Box>
              <Box width="50px">
                <AddBgBox>
                  <img height="8.25px" width="8.25px" src={rightIcon} alt="" />
                </AddBgBox>
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
          </RightFlexBox> */}
          <NetSupplyAPY>
            <Typography variant="body2" fontWeight="600" color="#A0A3BD" lineHeight="0.75rem">
              Net Supply APY
            </Typography>
            <Typography mx="0.375rem" fontWeight="600" variant="body2" lineHeight="0.75rem">
              10%
            </Typography>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="8" cy="7.99805" r="6.5" stroke="#A0A3BD" />
              <path
                d="M7.5 7.49805C7.5 7.2219 7.72386 6.99805 8 6.99805C8.27614 6.99805 8.5 7.2219 8.5 7.49805V11.498C8.5 11.7742 8.27614 11.998 8 11.998C7.72386 11.998 7.5 11.7742 7.5 11.498V7.49805Z"
                fill="#A0A3BD"
              />
              <path
                d="M9 4.99805C9 5.55033 8.55228 5.99805 8 5.99805C7.44772 5.99805 7 5.55033 7 4.99805C7 4.44576 7.44772 3.99805 8 3.99805C8.55228 3.99805 9 4.44576 9 4.99805Z"
                fill="#A0A3BD"
              />
            </svg>
          </NetSupplyAPY>
          <Button
            disabled={buttonDisabled}
            variant="contained"
            color={overSupply ? 'error' : 'primary'}
            sx={{ width: '100%', height: '3rem' }}
            onClick={() => {
              // supply
              if (borrowOrRepay === 1) {
                supplySubmit()
                setAmount('')
              } else {
                withdrawSubmit()
                setAmount('')
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
          </Button>
          <Box mt="1rem" display={overSupply ? '' : 'none'}>
            <FlexBox>
              <Box mr="8px" pt="1px" height="2.375rem">
                <img src={redPrompt} alt="" />
              </Box>
              <Typography color="#E1536C" fontWeight="600" variant="body2">
                If you withdraw the maximum amount of collateral ETH, your collateral will be easily liquidate
              </Typography>
            </FlexBox>
          </Box>
        </BottomBox>
      </Box>
    </Modal>
  )
}
