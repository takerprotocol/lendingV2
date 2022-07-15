import greyShutOff from 'assets/images/svg/common/close-white.svg'
import prompt from 'assets/images/svg/common/prompt.svg'
import redPrompt from 'assets/images/svg/common/redPrompt.svg'
import { styled, Typography, Box, Button, Modal, TextField } from '@mui/material'
import { useEffect, useState } from 'react'
import addIcon from 'assets/images/svg/common/add.svg'
import rightIcon from 'assets/images/svg/common/right.svg'
import myCollateral from 'assets/images/svg/common/myCollateral.svg'
import { fixedFormat } from 'utils'
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
  margin-top: -12px;
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
const SpaceBetweenBox = styled(Box)`
  display: flex;
  justify-content: space-between;
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
  padding: 2px 8px;
  border: 1px solid #14142a;
  border-radius: 4px;
  margin-top: 16px;
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
interface MySupplyModalProps {
  openMySupplyModal: boolean
  setOpenMySupplyModal: Function
  type: number
  mySupply: number
}
export default function MySupplyModal({ openMySupplyModal, setOpenMySupplyModal, type, mySupply }: MySupplyModalProps) {
  const [borrowOrRepay, setBorrowOrRepay] = useState<number>(type)
  const [supplyLimit] = useState<number>(20)
  const [withdrawal] = useState<boolean>(true)
  const [supply] = useState<boolean>(true)
  const [textFieldValue, setTextFieldValue] = useState<string>('')
  const [supplyAmount, setSupplyAmount] = useState<number>(0)
  const [state, setState] = useState<boolean>(false)
  const [withdrawalMax, setWithdrawalMax] = useState<boolean>(false)
  function textFieldChange(event?: any) {
    if (event) {
      setTextFieldValue(
        event.target.value
          .replace(/[^\d^\\.?]+/g, '')
          .replace(/^0+(\d)/, '$1')
          .replace(/^\./, '0.')
          .match(/^\d*(\.?\d{0,4})/g)[0]
      )
      if (borrowOrRepay === 1) {
        setSupplyAmount(+textFieldValue)
      } else {
        setSupplyAmount(-textFieldValue)
      }
    }
  }
  // console.log(mySupply + supplyAmount <= supplyLimit && withdrawal && borrowOrRepay === 1)
  useEffect(() => {
    if (borrowOrRepay === 1) {
      setSupplyAmount(+textFieldValue)
    } else {
      setSupplyAmount(-textFieldValue)
    }
    setState(withdrawal && supply)
    setWithdrawalMax(borrowOrRepay === 2 && +textFieldValue >= supplyLimit)
  }, [borrowOrRepay, supply, supplyLimit, textFieldValue, withdrawal])
  useEffect(() => {
    setBorrowOrRepay(type)
  }, [type])
  return (
    <Modal open={openMySupplyModal} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
      <Box sx={style}>
        <TopBox>
          <SpaceBetweenBox alignItems="flex-start">
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
                mr="8px"
                onClick={() => {
                  setOpenMySupplyModal(false)
                }}
              >
                <img src={greyShutOff} alt="" />
              </Box>
              <FlexBox mt="43px">
                <Typography mr="6px" variant="body1" component="p" color="#FFFFFF">
                  {borrowOrRepay === 1
                    ? supplyAmount + mySupply < supplyLimit && withdrawal
                      ? 'Used as Collateral'
                      : 'Non-collateral'
                    : supplyAmount >= supplyLimit
                    ? 'Used as Collateral'
                    : 'Non-collateral'}
                </Typography>
                <img src={prompt} alt="" />
              </FlexBox>
            </Box>
          </SpaceBetweenBox>
          <SpaceBetweenBox mt="28px">
            <Box display={state ? '' : 'none'} ml="80px">
              <Typography
                variant="subtitle1"
                fontWeight="700"
                component="h1"
                sx={{ cursor: 'pointer' }}
                color={borrowOrRepay === 1 ? '#FFFFFF' : 'rgba(255, 255, 255, 0.7)'}
                onClick={() => {
                  setBorrowOrRepay(1)
                  setTextFieldValue('')
                }}
              >
                Supply
              </Typography>
              <Box
                className={borrowOrRepay === 1 ? 'BorrowOrRepay' : ''}
                sx={{ width: '64px', height: '5px', borderRadius: '21px', marginTop: '13px' }}
              ></Box>
            </Box>
            <Box display={state ? '' : 'none'} mr="73px">
              <Typography
                variant="subtitle1"
                fontWeight="700"
                component="h1"
                sx={{ cursor: 'pointer' }}
                color={borrowOrRepay === 2 ? '#FFFFFF' : 'rgba(255, 255, 255, 0.7)'}
                onClick={() => {
                  setBorrowOrRepay(2)
                  setTextFieldValue('')
                }}
              >
                Withdraw
              </Typography>
              <Box
                className={borrowOrRepay === 2 ? 'BorrowOrRepay' : ''}
                sx={{ width: '64px', height: '5px', borderRadius: '21px', marginTop: '13px' }}
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
                <CenterBox width="200px">
                  <img src={myCollateral} alt="" />
                  <TextField
                    autoFocus={true}
                    sx={{ marginLeft: '7px', fontSize: '28px' }}
                    placeholder="0.00"
                    onChange={textFieldChange}
                    value={textFieldValue}
                    onKeyUp={textFieldChange}
                  />
                </CenterBox>
              </Box>
              <Box>
                <Box
                  sx={{ display: 'flex', justifyContent: 'flex-end' }}
                  onClick={() => {
                    setTextFieldValue(`${supplyLimit - mySupply}`)
                  }}
                >
                  <MAXBox className={supplyAmount >= supplyLimit - mySupply ? 'max' : ''}>
                    <Typography variant="body2" component="p" fontWeight="700">
                      MAX
                    </Typography>
                  </MAXBox>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Typography mt="4px" variant="body1" fontWeight="600" component="p" color="#14142A">
                    {fixedFormat(supplyLimit)} ETH
                  </Typography>
                </Box>
              </Box>
            </SpaceBetweenBox>
          </BorrowAmountBox>
          <Box mb="15px" mt="17px" width="372px"></Box>
          <SpaceBetweenBox mt="16.5px">
            <Box>
              <Typography variant="body1" component="p" color="#A0A3BD">
                Supply Amount (ETH)
              </Typography>
              {((mySupply + supplyAmount <= supplyLimit && withdrawal && borrowOrRepay === 1) || withdrawalMax) && (
                <>
                  <Typography mt="16px" variant="body1" component="p" color="#A0A3BD">
                    Borrow Limited (ETH)
                  </Typography>
                  <Typography mt="16px" variant="body1" component="p" color="#A0A3BD">
                    Borrow Limit Used
                  </Typography>
                </>
              )}
            </Box>
            <Box>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Typography variant="body1" component="span" color="#A0A3BD">
                  {fixedFormat(mySupply)} {'>'}
                </Typography>
                <Typography ml="6px" variant="body1" component="span" fontWeight="700" color="#14142A">
                  {fixedFormat(mySupply + supplyAmount)}
                </Typography>
              </Box>
              {((mySupply + supplyAmount <= supplyLimit && withdrawal && borrowOrRepay === 1) || withdrawalMax) && (
                <>
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end' }} mt="16px">
                    <Typography variant="body1" component="span" color={'#A0A3BD'}>
                      20% {'>'}
                    </Typography>
                    <Typography
                      ml="6px"
                      variant="body1"
                      component="span"
                      fontWeight="700"
                      color={withdrawalMax ? '#E1536C' : '#14142A'}
                    >
                      20%
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end' }} mt="16px">
                    <Typography variant="body1" component="span" color="#A0A3BD">
                      20% {'>'}
                    </Typography>
                    <Typography
                      ml="6px"
                      variant="body1"
                      component="span"
                      fontWeight="700"
                      color={withdrawalMax ? '#E1536C' : '#14142A'}
                    >
                      20%
                    </Typography>
                  </Box>
                </>
              )}
            </Box>
          </SpaceBetweenBox>
          {((mySupply + supplyAmount <= supplyLimit && withdrawal && borrowOrRepay === 1) || withdrawalMax) && (
            <SpaceBetweenBox mt="16px">
              <Box>
                <Typography variant="body1" component="span" color="#A0A3BD">
                  Risk level
                </Typography>
                <Typography ml="8px" variant="body1" component="span" fontWeight="700" color="#4BC8B1">
                  HEALTHY
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Typography variant="body1" component="span" color="#A0A3BD">
                  186% {'>'}
                </Typography>
                <Typography ml="6px" variant="body1" component="span" fontWeight="700" color="#14142A">
                  186%
                </Typography>
              </Box>
            </SpaceBetweenBox>
          )}
          <RightFlexBox>
            <FlexBox>
              <Box width={'65px'}>
                <Typography component="p" variant="subtitle2" lineHeight="16px" color="#4BC8B1">
                  20%
                </Typography>
              </Box>
              <Box sx={{ width: '52px' }}>
                <AddBgBox>
                  <img height="8.25px" width="8.25px" src={addIcon} alt="" />
                </AddBgBox>
              </Box>
              <Box width={'66px'}>
                <Typography component="p" variant="subtitle2" lineHeight="16px" color="#6E7191">
                  -10%
                </Typography>
              </Box>
              <Box width="50px">
                <AddBgBox>
                  <img height="8.25px" width="8.25px" src={rightIcon} alt="" />
                </AddBgBox>
              </Box>

              <Box>
                <Typography component="p" variant="subtitle2" lineHeight="16px" color="#4E4B66">
                  10%
                </Typography>
              </Box>
            </FlexBox>
            <FlexBox>
              <Box width="117px">
                <Typography component="span" variant="body2" fontWeight="500" color="#A0A3BD">
                  Token Reward
                </Typography>
              </Box>
              <Box width="116px">
                <Typography component="span" variant="body2" fontWeight="600" color="#A0A3BD">
                  Borrow APY
                </Typography>
              </Box>
              <Box>
                <Typography component="span" variant="body2" fontWeight="600" color="#4E4B66">
                  Net Borrow APY
                </Typography>
              </Box>
            </FlexBox>
          </RightFlexBox>
          <Box mb="16px" display={withdrawalMax ? '' : 'none'}>
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
            disabled={!supplyAmount || supplyAmount > supplyLimit}
            variant="contained"
            color={withdrawalMax ? 'error' : 'primary'}
            sx={{ width: '372px', height: '54px' }}
          >
            Withdraw
          </Button>
        </BottomBox>
      </Box>
    </Modal>
  )
}
