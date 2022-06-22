import { Button, styled, Modal, Box, Typography } from '@mui/material'
import whiteShutOff from 'assets/images/svg/common/whiteShutOff.svg'
import shutOff from 'assets/images/svg/common/shutOff.svg'
import whiteRight from 'assets/images/svg/common/whiteRight.svg'
import Right from 'assets/images/svg/common/right.svg'
import React, { useState } from 'react'
import { CenterBox, SpaceBetweenBox } from 'styleds/index'
const style = {
  position: 'relative',
  width: '420px',
}
const TopBox = styled(Box)`
  height: 156px;
  padding: 32px;
  box-shadow: 0px 10px 20px rgba(20, 20, 42, 0.3);
  border-radius: 12px 12px 0px 0px;
`
const BottomBox = styled(Box)`
  margin-top: -13px;
  padding: 24px;
  background: #ffffff;
  box-shadow: 0px 15px 30px rgba(20, 20, 42, 0.2);
  border-radius: 12px;
`
export default function MySupplySwitchModal({ open1, handle1 }: { open1: boolean; handle1: Function }) {
  const [check] = useState<number>(2)
  return (
    <Modal open={open1} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
      <Box sx={style}>
        <TopBox
          sx={{
            background: `${
              check === 1 ? '#eff0f6' : 'linear-gradient(81.09deg, #688ff2 0.64%, #7a81f9 50.49%, #9272eb 100.5%)'
            }`,
          }}
        >
          <CenterBox
            sx={{ justifyContent: 'flex-end', cursor: 'pointer' }}
            onClick={() => {
              handle1(false)
            }}
          >
            <img src={check === 1 ? shutOff : whiteShutOff} alt="" />
          </CenterBox>
          <Box>
            <CenterBox>
              <Typography variant="body1" component="h1" color={check === 1 ? '#A0A3BD' : 'rgba(255, 255, 255, 0.7)'}>
                Borrow Limit
              </Typography>
            </CenterBox>
            <CenterBox>
              <Typography
                mr="12px"
                variant="h4"
                component="h1"
                color={check === 1 ? '#A0A3BD' : 'rgba(239, 240, 246, 0.6)'}
                fontWeight="600"
              >
                0.00
              </Typography>
              <CenterBox
                sx={{
                  width: '18px',
                  marginRight: '12px',
                  height: '18px',
                  background: `${check === 1 ? '#D9DBE9' : 'rgba(255, 255, 255, 0.2)'}`,
                  borderRadius: '100%',
                }}
              >
                <img src={check === 1 ? Right : whiteRight} alt="" />
              </CenterBox>
              <Typography
                mr="6px"
                variant="h4"
                component="h1"
                fontWeight="600"
                color={check === 1 ? '#4E4B66' : 'rgba(239, 240, 246)'}
              >
                18.0918
              </Typography>
              <Box paddingTop="8px">
                <Typography
                  variant="subtitle1"
                  component="h1"
                  fontWeight="700"
                  color={check === 1 ? '#4E4B66' : 'rgba(239, 240, 246)'}
                >
                  ETH
                </Typography>
              </Box>
            </CenterBox>
          </Box>
        </TopBox>
        <BottomBox>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h5" component="h1">
              {check === 1 ? 'Sure to unable ?' : 'Enable Collateral Mode'}
            </Typography>
            <Typography mt="4px" variant="subtitle2" component="span" color="#6E7191" fontWeight="500">
              {check === 1
                ? 'If you unable the collateral mode will reduce the borrow limit and '
                : 'Use your Supply ETH as collateral to get a higher Borrow limit amount'}
            </Typography>
            <Typography
              display={check === 1 ? '' : 'none'}
              variant="subtitle2"
              component="span"
              color="#E1536C"
              fontWeight="500"
            >
              increase your account risk level
            </Typography>
          </Box>
          <Box
            sx={{
              padding: '12px 16px',
              marginTop: '36px',
              marginBottom: '48px',
              height: '122px',
              width: '372px',
              background: '#F7F7FC',
              borderRadius: '6px',
            }}
          >
            <SpaceBetweenBox>
              <Box>
                <Typography variant="body1" component="h1" color="#A0A3BD">
                  Collateral value (ETH)
                </Typography>
              </Box>
              <Box>
                <Typography variant="body1" fontWeight="600" component="span" color="#A0A3BD">
                  12.3465 {'>'}
                </Typography>
                <Typography ml="6px" variant="body1" fontWeight="700" component="span">
                  22.6836
                </Typography>
              </Box>
            </SpaceBetweenBox>
            <SpaceBetweenBox marginY="16px">
              <Box>
                <Typography variant="body1" component="h1" color="#A0A3BD">
                  Borrow Limit Used
                </Typography>
              </Box>
              <Box>
                <Typography variant="body1" fontWeight="600" component="span" color="#A0A3BD">
                  20% {'>'}
                </Typography>
                <Typography ml="6px" variant="body1" fontWeight="700" component="span">
                  14%
                </Typography>
              </Box>
            </SpaceBetweenBox>
            <SpaceBetweenBox>
              <Box>
                <Typography variant="body1" component="span" color="#A0A3BD">
                  Risk level
                </Typography>
                <Typography
                  ml="8px"
                  variant="body1"
                  fontWeight="700"
                  component="span"
                  color={check === 1 ? '#EF884F' : '#4BC8B1'}
                >
                  {check === 1 ? 'RISKY' : 'HEALTHY'}
                </Typography>
              </Box>
              <Box>
                <Typography variant="body1" fontWeight="600" component="span" color="#A0A3BD">
                  12.3465 {'>'}
                </Typography>
                <Typography ml="6px" variant="body1" fontWeight="700" component="span">
                  22.6836
                </Typography>
              </Box>
            </SpaceBetweenBox>
          </Box>
          {check === 1 ? (
            <SpaceBetweenBox mt="12px">
              <Button sx={{ width: '174px', height: '48px' }} color="secondary" variant="contained">
                Unable
              </Button>
              <Button sx={{ width: '174px', height: '48px' }} variant="contained">
                Think about it
              </Button>
            </SpaceBetweenBox>
          ) : (
            <Button sx={{ width: '372px', height: '54px' }} variant="contained">
              Enable
            </Button>
          )}
        </BottomBox>
      </Box>
    </Modal>
  )
}
