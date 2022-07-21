import { Box, styled, Fade, Popper, Typography } from '@mui/material'
import { useState } from 'react'
import blueChip from 'assets/images/svg/common/blueChip.svg'
import growth from 'assets/images/svg/common/growth.svg'
import { useAppDispatch } from 'state/hooks'
import { setDashboardType } from 'state/user/reducer'

const PopperBox = styled(Box)`
  z-index: 4;
  width: 201px;
  padding: 12px;
  position: relative;
  top: 24px;
  border: 1px solid #eff0f6;
  background: #ffffff;
  box-shadow: 0px 10px 20px rgba(218, 218, 238, 0.3);
  border-radius: 12px;
`
const ButtonBox = styled(Box)`
  padding: 4px;
  width: 177px;
  display: flex;
  align-items: center;
  height: 44px;
  border-radius: 6px;
  :hover {
    background: #f7f7fc;
  }
`
const StyledPopper = styled(Popper)`
  z-index: 10;
`
export default function HeaderPopper({ open, anchorEl, placement }: { open: boolean; anchorEl: any; placement: any }) {
  const [open1, setOpen] = useState<boolean>(false)
  const dispatch = useAppDispatch()
  return (
    <StyledPopper
      open={open1 || open}
      onMouseLeave={() => {
        setOpen(false)
      }}
      onMouseOver={() => {
        setOpen(true)
      }}
      className="account-popper"
      anchorEl={anchorEl}
      placement={placement}
      transition
    >
      {({ TransitionProps }) => (
        <Fade {...TransitionProps}>
          <PopperBox>
            <ButtonBox
              onClick={() => {
                dispatch(setDashboardType(1))
              }}
            >
              <img src={blueChip} alt="" />
              <Typography component="span" ml="12px" variant="subtitle2">
                Blue Chip NFTs
              </Typography>
            </ButtonBox>
            <ButtonBox
              mt="12px"
              onClick={() => {
                dispatch(setDashboardType(2))
              }}
            >
              <img src={growth} alt="" />
              <Typography component="span" ml="12px" variant="subtitle2">
                Growth NFTs
              </Typography>
            </ButtonBox>
          </PopperBox>
        </Fade>
      )}
    </StyledPopper>
  )
}
