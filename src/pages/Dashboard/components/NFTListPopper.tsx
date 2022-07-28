import * as React from 'react'
import { Box, styled, Fade, Popper, Typography } from '@mui/material'
import TheMonkeez from 'assets/images/svg/dashboard/TheMonkeez.svg'
import { FlexBox } from 'styleds/index'
import { useState } from 'react'
const PopperBox = styled(Box)`
  align-items: flex-end;
  width: 200px;
  max-height: 236px;
  padding: 16px 16px 0 16px;
  background: #ffffff;
  border: 1px solid #eff0f6;
  box-shadow: 0px 10px 20px rgba(20, 20, 42, 0.05);
  border-radius: 12px;
  overflow: auto;
`
const BeforeBox = styled(Box)`
  position: relative;
  bottom: 15px;
  ::before {
    content: '';
    display: block;
    position: absolute;
    left: 90px;
    bottom: -25px;
    border-width: 15px 10px;
    border-style: dashed solid dashed dashed;
    border-color: #ffffff transparent transparent transparent;
  }
`
interface NFTListPopperProps {
  open: boolean
  anchorEl: any
  placement: any
}
export default function NFTListPopper({ open, anchorEl, placement }: NFTListPopperProps) {
  const [openMouseOve, setOpenMouseOve] = useState<boolean>(false)
  return (
    <Popper
      open={open || openMouseOve}
      onMouseLeave={() => {
        setOpenMouseOve(false)
      }}
      onMouseOver={() => {
        setOpenMouseOve(true)
      }}
      anchorEl={anchorEl}
      placement={placement}
      transition
    >
      {({ TransitionProps }) => (
        <Fade {...TransitionProps}>
          <BeforeBox>
            <PopperBox>
              <FlexBox mb="16px">
                <img src={TheMonkeez} alt="" />
                <Typography ml="8px" variant="body2" component="h1" color="#4E4B66">
                  The Monkeez
                </Typography>
              </FlexBox>
              <FlexBox mb="16px">
                <img src={TheMonkeez} alt="" />
                <Typography ml="8px" variant="body2" component="h1" color="#4E4B66">
                  The Monkeez
                </Typography>
              </FlexBox>
            </PopperBox>
          </BeforeBox>
        </Fade>
      )}
    </Popper>
  )
}
