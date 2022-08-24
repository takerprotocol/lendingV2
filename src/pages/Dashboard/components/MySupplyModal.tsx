import greyShutOff from 'assets/images/svg/common/close-white.svg'
import prompt from 'assets/images/svg/common/prompt.svg'
import redPrompt from 'assets/images/svg/common/redPrompt.svg'
import { styled, Typography, Box, Button, Modal, TextField } from '@mui/material'
import { useEffect, useMemo, useState } from 'react'
import addIcon from 'assets/images/svg/common/add.svg'
import rightIcon from 'assets/images/svg/common/right.svg'
import myCollateral from 'assets/images/svg/common/myCollateral.svg'
import {
  amountDecimal,
  desensitization,
  div,
  fixedFormat,
  getRiskLevel,
  getRiskLevelTag,
  percent,
  plus,
  times,
} from 'utils'
import BigNumber from 'bignumber.js'
import { toast } from 'react-toastify'
import { useLendingPool } from 'hooks/useLendingPool'
import {
  useAddress,
  useBorrowLimit,
  useCollateralBorrowLimitUsed,
  useCollateralRiskLevel,
  useDecimal,
  useErc20ReserveData,
  useEthCollateral,
  useEthDebt,
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
// import { useContract } from 'hooks/useContract'
// import erc20Abi from 'abis/MockErc20.json'
// import { fromWei } from 'web3-utils'

const style = {
  width: '420px',
  transform: 'rgba(0, 0, 0, 0.5)',
  borderRadius: '12px',
  position: 'relative',
}
const TopBox = styled(Box)`
  width: 420px;
  padding: 32px 32px 12px 36px;
  background: linear-gradient(249.47deg, #6aa2f7 0%, #627eea 100%);
  box-shadow: 0px 10px 20px rgba(20, 20, 42, 0.3);
  border-radius: 12px 12px 0px 0px;
  .BorrowOrRepay {
    color: #ffffff;
    background: #ffffff;
  }
`
const BottomBox = styled(Box)`
  width: 420px;
  margin-top: -14px;
  background: #ffffff;
  box-shadow: 0px 15px 30px rgba(20, 20, 42, 0.2);
  border-radius: 12px;
  padding: 24px;
`
const CenterBox = styled(Box)`
  display: flex;
  align-items: center;
  .MuiInputBase-input {
    font-size: 28px;
  }
`
const FlexBox = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: flex-start;
`
const AddBgBox = styled(Box)`
  display: flex;
  align-items: center;
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
  margin-bottom: 24px;
`
const BorrowAmountBox = styled(Box)`
  width: 372px;
  height: 103px;
  background: #eff0f6;
  border-radius: 10px;
  padding: 16px;
`
export const MAXBox = styled(Box)`
  padding: 1px 8px;
  border: 1px solid #14142a;
  border-radius: 4px;
  margin-top: 12px;
  width: 42px;
  cursor: pointer;
  color: #14142a;
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
interface MySupplyModalProps {
  openMySupplyModal: boolean
  setOpenMySupplyModal: Function
  type: number
  mySupply: string
}
export default function MySupplyModal({ openMySupplyModal, setOpenMySupplyModal, type, mySupply }: MySupplyModalProps) {
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
  const ethDebt = useEthDebt()
  const borrowLimitUsed = useCollateralBorrowLimitUsed(times(amount, borrowOrRepay === 1 ? 1 : -1))
  const borrowLimit = useBorrowLimit() //操作前的borrowLimit
  const upBorrowLimit = useBorrowLimit(times(amount, borrowOrRepay === 1 ? 1 : -1)) //操作后的borrowLimit
  const usedCollateral = useUsedCollateral()
  const erc20ReserveData = useErc20ReserveData()
  const addTransaction = useTransactionAdder()
  // const [approval, approveCallback] = useApproveCallback(amount, contract?.address)
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
  const withdrawSubmit = () => {
    if (new BigNumber(amount).lte(0)) {
      toast.error('Minimum supply 0')
      return
    }
    if (contract && address) {
      contract
        .withdraw(poolContract?.address, amountDecimal(amount, decimal), address, { gasLimit })
        .then((res: any) => {
          toast.success(res.hash)
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
      return new BigNumber(mySupply).lte(amount)
    } else {
      return false
    }
  }, [amount, mySupply, borrowOrRepay])

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
              <Typography mt="16px" variant="body1" component="h1" color="#FFFFFF">
                Currently Supplying
              </Typography>
              <Box mt="4px">
                <Typography variant="h4" component="span" fontWeight="600" color="#EFF0F6">
                  {fixedFormat(mySupply)}
                </Typography>
                <Typography ml="6px" variant="subtitle1" component="span" fontWeight="600" color="#EFF0F6">
                  ETH
                </Typography>
              </Box>
            </Box>
            <Box>
              <Box
                sx={{ display: 'flex', justifyContent: 'flex-end', cursor: 'pointer' }}
                onClick={() => {
                  setOpenMySupplyModal(false)
                }}
              >
                <img src={greyShutOff} alt="" />
              </Box>
              <FlexBox mt="43px">
                <Typography mr="6px" variant="body1" component="p" color="#FFFFFF">
                  {nonCollateral}
                </Typography>
                <img src={prompt} alt="" />
              </FlexBox>
            </Box>
          </SupplySpaceBetweenBox>
          <SpaceBetweenBox mt="24px">
            <Box ml="80px" display={supplyLimit !== '0' ? '' : 'none'}>
              <Typography
                variant="subtitle1"
                fontWeight="700"
                lineHeight="28px"
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
                sx={{ width: '100%', height: '5px', borderRadius: '21px', marginTop: '14px' }}
              ></Box>
            </Box>
            <Box mr="72px" display={supplyLimit !== '0' ? '' : 'none'}>
              <Typography
                variant="subtitle1"
                fontWeight="700"
                lineHeight="28px"
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
                sx={{ width: '100%', height: '5px', borderRadius: '21px', marginTop: '14px' }}
              ></Box>
            </Box>
          </SpaceBetweenBox>
        </TopBox>
        <BottomBox>
          <BorrowAmountBox>
            <SpaceBetweenBox>
              <Box>
                <Typography variant="body1" component="p" color="#14142A">
                  {borrowOrRepay === 1 ? 'Supply Amount' : 'Withdraw Amount'}
                </Typography>
                <CenterBox mt="4px" width="200px">
                  <img src={myCollateral} alt="" />
                  <TextField
                    autoFocus={true}
                    sx={{ marginLeft: '7px', fontSize: '28px' }}
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
                    <Typography variant="body2" fontWeight="700">
                      MAX
                    </Typography>
                  </MAXBox>
                </Box>
                <Box mt="8px" sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Typography variant="body1" fontWeight="600" component="p" color="#14142A">
                    {borrowOrRepay === 1 ? fixedFormat(supplyLimit) : mySupply} ETH
                  </Typography>
                </Box>
              </Box>
            </SpaceBetweenBox>
          </BorrowAmountBox>
          <Box mt="16px">
            <SpaceBetweenBox>
              <Typography variant="body1" color="#A0A3BD">
                Supply Amount (ETH)
              </Typography>
              <Box>
                <Typography fontWeight="600" variant="body1" component="span" color="#A0A3BD">
                  {fixedFormat(mySupply)} {'>'}
                </Typography>
                <Typography ml="6px" variant="body1" component="span" fontWeight="700" color="#14142A">
                  {fixedFormat(plus(mySupply, amount ? (borrowOrRepay === 1 ? amount : times(amount, -1)) : 0))}
                </Typography>
              </Box>
            </SpaceBetweenBox>
            {ModalType && (
              <Box>
                <SpaceBetweenBox mt="16px">
                  <Typography variant="body1" color="#A0A3BD">
                    Borrow Limited (ETH)
                  </Typography>
                  <Box>
                    <Typography variant="body1" fontWeight="600" component="span" color={'#A0A3BD'}>
                      {borrowLimit} {'>'}
                    </Typography>
                    <Typography
                      ml="6px"
                      variant="body1"
                      component="span"
                      fontWeight="700"
                      color={overSupply ? '#E1536C' : '#14142A'}
                    >
                      {upBorrowLimit}
                    </Typography>
                  </Box>
                </SpaceBetweenBox>
                <SpaceBetweenBox mt="16px">
                  <Typography variant="body1" color="#A0A3BD">
                    Borrow Limit Used
                  </Typography>
                  <Box>
                    <Typography variant="body1" fontWeight="600" component="span" color="#A0A3BD">
                      {percent(div(ethDebt, borrowLimit), 1)} {'>'}
                    </Typography>
                    <Typography
                      ml="6px"
                      variant="body1"
                      component="span"
                      fontWeight="700"
                      color={overSupply ? '#E1536C' : '#14142A'}
                    >
                      {percent(borrowLimitUsed, 1)}
                    </Typography>
                  </Box>
                </SpaceBetweenBox>
                <SpaceBetweenBox mt="16px">
                  <Box>
                    <Typography variant="body1" component="span" color="#A0A3BD">
                      Risk level
                    </Typography>
                    <Typography className={riskLevelTag} ml="8px" variant="body1" component="span" fontWeight="700">
                      {TypographyRiskLevel}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Typography fontWeight="600" variant="body1" component="span" color="#A0A3BD">
                      {heath}% {'>'}
                    </Typography>
                    <Typography ml="6px" variant="body1" component="span" fontWeight="700" color="#14142A">
                      {amount ? collateralRiskLevel : heath}%
                    </Typography>
                  </Box>
                </SpaceBetweenBox>
              </Box>
            )}
          </Box>
          <RightFlexBox>
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
          </RightFlexBox>
          <Box mb="16px" display={overSupply ? '' : 'none'}>
            <FlexBox>
              <Box mr="8px" pt="1px" height="38px">
                <img src={redPrompt} alt="" />
              </Box>
              <Typography color="#E1536C" fontWeight="600" variant="body2">
                If you withdraw the maximum amount of collateral ETH, your collateral will be easily liquidate
              </Typography>
            </FlexBox>
          </Box>
          <Button
            disabled={buttonDisabled}
            variant="contained"
            color={overSupply ? 'error' : 'primary'}
            sx={{ width: '372px', height: '54px' }}
            onClick={() => {
              // supply
              if (borrowOrRepay === 1) {
                supplySubmit()
              } else {
                withdrawSubmit()
              }
            }}
          >
            {borrowOrRepay === 1 ? 'Supply' : 'Withdraw'}
          </Button>
        </BottomBox>
      </Box>
    </Modal>
  )
}
