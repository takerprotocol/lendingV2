import greyShutOff from 'assets/images/svg/common/close-white.svg'
import prompt from 'assets/images/svg/common/prompt.svg'
import { styled, Typography, Box, Button, Modal, TextField } from '@mui/material'
import { useEffect, useState } from 'react'
import addIcon from 'assets/images/svg/common/add.svg'
import rightIcon from 'assets/images/svg/common/right.svg'
import myCollateral from 'assets/images/svg/common/myCollateral.svg'
const style = {
  width: '420px',
  transform: 'rgba(0, 0, 0, 0.5)',
  borderRadius: '12px',
  position: 'relative',
}
const TopBox = styled(Box)`
  width: 420px;
  height: 200px;
  background: linear-gradient(81.09deg, #688ff2 0.64%, #7a81f9 50.49%, #9272eb 100.5%);
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
  :hover {
    color: #ffffff;
    background: #14142a;
  }
`
interface MySupplyModalType {
  openMySupplyModal: boolean
  setOpenMySupplyModal: Function
  type: number
}
export default function MySupplyModal({ openMySupplyModal, setOpenMySupplyModal, type }: MySupplyModalType) {
  const [borrowOrRepay, setBorrowOrRepay] = useState<number>(type)
  useEffect(() => {
    setBorrowOrRepay(type)
  }, [type])
  return (
    <Modal open={openMySupplyModal} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
      <Box sx={style}>
        <TopBox>
          <SpaceBetweenBox alignItems="flex-start">
            <Box m="32px 0 0 36px">
              <Typography mt="16px" variant="body1" component="h1" color="#FFFFFF">
                Currently Supplying
              </Typography>
              <Box mt="4px">
                <Typography variant="h4" component="span" fontWeight="600" color="#EFF0F6">
                  3.0918
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
                  setOpenMySupplyModal(false)
                }}
              >
                <img src={greyShutOff} alt="" />
              </Box>
              <FlexBox mt="43px">
                <Typography mr="6px" variant="body1" component="p" color="#FFFFFF">
                  Used as Collateral
                </Typography>
                <img src={prompt} alt="" />
              </FlexBox>
            </Box>
          </SpaceBetweenBox>
          <SpaceBetweenBox mt="24px">
            <Box ml="114px">
              <Typography
                variant="subtitle1"
                fontWeight="700"
                component="h1"
                sx={{ cursor: 'pointer' }}
                color={borrowOrRepay === 1 ? '#FFFFFF' : 'rgba(255, 255, 255, 0.7)'}
                onClick={() => {
                  setBorrowOrRepay(1)
                }}
              >
                Supply
              </Typography>
              <Box
                className={borrowOrRepay === 1 ? 'BorrowOrRepay' : ''}
                sx={{ width: '64px', height: '5px', borderRadius: '21px', marginTop: '13px' }}
              ></Box>
            </Box>
            <Box mr="118px">
              <Typography
                variant="subtitle1"
                fontWeight="700"
                component="h1"
                sx={{ cursor: 'pointer' }}
                color={borrowOrRepay === 2 ? '#FFFFFF' : 'rgba(255, 255, 255, 0.7)'}
                onClick={() => {
                  setBorrowOrRepay(2)
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
                  Supply Amount
                </Typography>
                <CenterBox width="200px">
                  <img src={myCollateral} alt="" />
                  <TextField autoFocus={true} sx={{ marginLeft: '7px', fontSize: '28px' }} placeholder="0.00" />
                </CenterBox>
              </Box>
              {borrowOrRepay === 3 ? (
                <Box>
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Typography mt="16px" variant="body2" component="p" color="#A0A3BD">
                      Borrow Limit
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Typography mt="4px" variant="body1" component="p" color="#A0A3BD">
                      18.0928 ETH
                    </Typography>
                  </Box>
                </Box>
              ) : (
                <Box>
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <MAXBox>
                      <Typography variant="body2" component="p" fontWeight="700">
                        MAX
                      </Typography>
                    </MAXBox>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Typography mt="4px" variant="body1" fontWeight="600" component="p" color="#14142A">
                      18.0928 ETH
                    </Typography>
                  </Box>
                </Box>
              )}
            </SpaceBetweenBox>
          </BorrowAmountBox>
          <Box mb="15px" mt="17px" width="372px"></Box>
          <SpaceBetweenBox mt="16.5px">
            <Box>
              <Typography variant="body1" component="p" color="#A0A3BD">
                Supply Amount (ETH)
              </Typography>
              <Typography mt="16px" variant="body1" component="p" color="#A0A3BD">
                Borrow Limited (ETH)
              </Typography>
              <Typography mt="16px" variant="body1" component="p" color="#A0A3BD">
                Borrow Limit Used
              </Typography>
            </Box>
            <Box>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Typography variant="body1" component="span" color="#A0A3BD">
                  3.0918 {'>'}
                </Typography>
                <Typography ml="6px" variant="body1" component="span" fontWeight="700" color="#14142A">
                  3.0918
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }} mt="16px">
                <Typography variant="body1" component="span" color="#A0A3BD">
                  20% {'>'}
                </Typography>
                <Typography ml="6px" variant="body1" component="span" fontWeight="700" color="#14142A">
                  20%
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }} mt="16px">
                <Typography variant="body1" component="span" color="#A0A3BD">
                  20% {'>'}
                </Typography>
                <Typography ml="6px" variant="body1" component="span" fontWeight="700" color="#14142A">
                  20%
                </Typography>
              </Box>
            </Box>
          </SpaceBetweenBox>
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
          <Button disabled variant="contained" sx={{ width: '372px', height: '54px', marginTop: '24px' }}>
            Withdraw
          </Button>
        </BottomBox>
      </Box>
    </Modal>
  )
}
