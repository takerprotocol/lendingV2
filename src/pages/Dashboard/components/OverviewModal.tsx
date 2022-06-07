import * as React from 'react'
import greyShutOff from 'assets/images/svg/common/greyShutOff.svg'
import { styled, Typography, Box, Button, Modal, TextField } from '@mui/material'
import { useEffect, useState } from 'react'
import addIcon from 'assets/images/svg/common/add.svg'
import rightIcon from 'assets/images/svg/common/right.svg'
import CustomizedSlider from 'components/Slider'
import myCollateral from 'assets/images/svg/common/myCollateral.svg'
const style = {
  width: '420px',
  height: '674px',
  transform: 'rgba(0, 0, 0, 0.5)',
  borderRadius: '12px',
  position: 'relative',
}
const TopBox = styled(Box)`
  width: 420px;
  height: 200px;
  background: linear-gradient(
      60.76deg,
      rgba(102, 166, 232, 0) 0%,
      rgba(135, 143, 248, 0.147) 61.5%,
      rgba(105, 165, 233, 0.3) 100%
    ),
    linear-gradient(180deg, #1d172e 0%, #181529 83.56%);
  box-shadow: 0px 10px 20px rgba(75, 75, 122, 0.2);
  border-radius: 12px 12px 0px 0px;
  position: absolute;
  .BorrowOrRepay {
    color: #ffffff;
    background: #ffffff;
  }
`
const BottomBox = styled(Box)`
  height: 485px;
  width: 420px;
  background: #ffffff;
  box-shadow: 0px 15px 30px rgba(20, 20, 42, 0.2);
  border-radius: 12px;
  position: absolute;
  top: 188px;
  padding: 24px;
  .css-1nc39zm-MuiSlider-root {
    width: 372px;
  }
  .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input {
    padding: 0px;
  }
  .css-1d3z3hw-MuiOutlinedInput-notchedOutline {
    border: 0px;
  }
  .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input {
    font-family: 'Quicksand';
    font-style: normal;
    font-weight: 500;
    font-size: 28px;
    line-height: 45px;
    color: #14142a;
  }
`
const CenterBox = styled(Box)`
  display: flex;
  align-items: center;
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
  ::before {
    content: '';
    display: block;
    position: absolute;
    left: 38.5px;
    top: 127px;
    border-width: 11.5px 7.5px;
    border-style: dashed solid dashed dashed;
    border-color: #eff0f6 transparent transparent transparent;
  }
`
export default function OverviewModal({ open, type, handle }: { open: boolean; type: number; handle: Function }) {
  const [check, setCheck] = useState<number>(type)
  useEffect(() => {
    setCheck(type)
  }, [type])
  return (
    <Modal open={open} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
      <Box sx={style}>
        <TopBox>
          <SpaceBetweenBox alignItems="flex-start">
            <Box m="32px 0 0 36px">
              <Typography mt="16px" variant="body1" component="h1" color="#A0A3BD">
                My Debt
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
            <Box width="85px" m="32px 24px 0px 0px">
              <Box
                sx={{ display: 'flex', justifyContent: 'flex-end', cursor: 'pointer' }}
                mr="8px"
                onClick={() => {
                  handle(false)
                }}
              >
                <img src={greyShutOff} alt="" />
              </Box>
              <Box
                sx={{
                  padding: ' 4px 12px',
                  width: '85px',
                  height: '30px',
                  marginTop: '34px',
                  background: 'linear-gradient(180deg, #1CC1A4 0%, #1CB5AB 100%)',
                  boxShadow: '0px 4px 8px rgba(28, 183, 171, 0.1)',
                  borderRadius: ' 20px',
                  cursor: 'pointer',
                }}
              >
                <Typography variant="body1" component="span" fontWeight="700" color="#FFFFFF">
                  HEALTHY
                </Typography>
              </Box>
            </Box>
          </SpaceBetweenBox>
          <SpaceBetweenBox mt="24px">
            <Box ml="114px">
              <Typography
                variant="subtitle1"
                fontWeight="700"
                component="h1"
                sx={{ cursor: 'pointer' }}
                color={check === 1 ? '#FFFFFF' : '#A0A3BD'}
                onClick={() => {
                  setCheck(1)
                }}
              >
                Borrow
              </Typography>
              <Box
                className={check === 1 ? 'BorrowOrRepay' : ''}
                sx={{ width: '64px', height: '5px', borderRadius: '21px', marginTop: '13px' }}
              ></Box>
            </Box>
            <Box mr="118px">
              <Typography
                variant="subtitle1"
                fontWeight="700"
                component="h1"
                sx={{ cursor: 'pointer' }}
                color={check === 2 ? '#FFFFFF' : '#A0A3BD'}
                onClick={() => {
                  setCheck(2)
                }}
              >
                Repay
              </Typography>
              <Box
                className={check === 2 ? 'BorrowOrRepay' : ''}
                sx={{ width: '64px', height: '5px', borderRadius: '21px', marginTop: '13px' }}
              ></Box>
            </Box>
          </SpaceBetweenBox>
        </TopBox>
        <BottomBox>
          <BorrowAmountBox>
            <SpaceBetweenBox>
              <Box width={'200px'}>
                <Typography variant="body1" component="p" color="#14142A">
                  Borrow Amount
                </Typography>
                <CenterBox>
                  <img src={myCollateral} alt="" />
                  <TextField autoFocus={true} sx={{ marginLeft: '7px' }} placeholder="0.00" />
                </CenterBox>
              </Box>
              {check === 1 ? (
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
                    <Box
                      sx={{
                        padding: '2px 8px',
                        border: '1px solid #14142A',
                        borderRadius: '4px',
                        marginTop: '16px',
                        width: '42px',
                        cursor: 'pointer',
                      }}
                    >
                      <Typography variant="body2" component="p" color="#14142A">
                        MAX
                      </Typography>
                    </Box>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Typography mt="4px" variant="body1" component="p" color="#14142A">
                      18.0928 ETH
                    </Typography>
                  </Box>
                </Box>
              )}
            </SpaceBetweenBox>
          </BorrowAmountBox>
          <Box mb="15px" mt="17px" width="372px">
            <CustomizedSlider></CustomizedSlider>
          </Box>
          <SpaceBetweenBox>
            <Box>
              <Typography variant="body1" component="span" color="#A0A3BD">
                Risk level
              </Typography>
              <Typography ml="8px" variant="body1" component="span" fontWeight="700" color="#4BC8B1">
                HEALTHY
              </Typography>
            </Box>
            <Box>
              <Typography variant="body1" component="span" color="#A0A3BD">
                186% {'>'}
              </Typography>
              <Typography ml="6px" variant="body1" component="span" fontWeight="700" color="#14142A">
                186%
              </Typography>
            </Box>
          </SpaceBetweenBox>
          <Box sx={{ width: '371px', border: '1px solid #EFF0F6', marginTop: '16.5px' }}></Box>
          <SpaceBetweenBox mt="16.5px">
            <Box>
              <Typography variant="body1" component="p" color="#A0A3BD">
                Debt (ETH)
              </Typography>
              <Typography mt="16px" variant="body1" component="p" color="#A0A3BD">
                Borrow Limit Used
              </Typography>
            </Box>
            <Box>
              <Box>
                <Typography variant="body1" component="span" color="#A0A3BD">
                  3.0918 {'>'}
                </Typography>
                <Typography ml="6px" variant="body1" component="span" fontWeight="700" color="#14142A">
                  3.0918
                </Typography>
              </Box>
              <Box mt="16px">
                <Typography variant="body1" component="span" color="#A0A3BD">
                  20% {'>'}
                </Typography>
                <Typography ml="6px" variant="body1" component="span" fontWeight="700" color="#14142A">
                  20%
                </Typography>
              </Box>
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
                <Typography component="p" variant="subtitle2" lineHeight="16px" color="#6E7191">
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
                    padding: '4.88px',
                  }}
                >
                  <img height="8.25px" width="8.25px" src={rightIcon} alt="" />
                </FlexBox>
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
            Borrow
          </Button>
        </BottomBox>
      </Box>
    </Modal>
  )
}
