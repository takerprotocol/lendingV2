import { Box, styled, Tooltip } from '@mui/material'
import TopLiquidity from 'assets/images/svg/dashboard/Tips-liquidity.svg'
import mobilePrompt2 from 'assets/images/svg/dashboard/mobilePrompt-2.svg'
import mobilePrompt from 'assets/images/svg/dashboard/mobilePrompt.svg'
import greyPrompt from 'assets/images/svg/common/greyPrompt.svg'
import ClickAwayListener from '@mui/material/ClickAwayListener'
import { useMobileType } from 'state/user/hooks'
import { useState } from 'react'

const ImgBox = styled(Box)`
  display: flex;
  align-items: center;
`
const MTooltip = styled(Tooltip)``
interface TipsTooltipProps {
  value: string
  grey?: string
  size?: string
}
export default function TipsTooltip({ value, grey, size }: TipsTooltipProps) {
  const mobile = useMobileType()
  const [open, setOpen] = useState(false)
  const handleTooltipClose = () => {
    setOpen(false)
  }
  const handleTooltipOpen = () => {
    setOpen(true)
  }
  return (
    <>
      {mobile ? (
        <Tooltip title={value} arrow placement="top">
          <ImgBox sx={{ width: `${size}`, height: `${size}` }}>
            <img width={size} height={size} src={grey === 'grey' ? greyPrompt : TopLiquidity} alt="" />
          </ImgBox>
        </Tooltip>
      ) : (
        <ClickAwayListener onClickAway={handleTooltipClose}>
          <MTooltip
            PopperProps={{
              disablePortal: true,
            }}
            arrow
            placement="top"
            onClose={handleTooltipClose}
            open={open}
            disableFocusListener
            disableHoverListener
            disableTouchListener
            title={value}
          >
            <img onClick={handleTooltipOpen} src={grey === 'grey' ? mobilePrompt : mobilePrompt2} alt="" />
          </MTooltip>
        </ClickAwayListener>
      )}
    </>
  )
}
// MuiTooltip-popper MuiTooltip-popperInteractive MuiTooltip-popperArrow css-pnpvgc-MuiPopper-root-MuiTooltip-popper MuiPopperUnstyled-root
// MuiTooltip-tooltip MuiTooltip-tooltipArrow MuiTooltip-touch MuiTooltip-tooltipPlacementTop css-1scp802-MuiTooltip-tooltip
