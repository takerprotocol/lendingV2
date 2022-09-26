import { Box, styled, Tooltip } from '@mui/material'
import TopLiquidity from 'assets/images/svg/dashboard/Tips-liquidity.svg'
import greyPrompt from 'assets/images/svg/common/greyPrompt.svg'

const ImgBox = styled(Box)`
  display: flex;
  align-items: center;
`
interface TipsTooltipProps {
  value: string
  grey?: string
  size: string
}
export default function TipsTooltip({ value, grey, size }: TipsTooltipProps) {
  return (
    <Tooltip title={value} arrow placement="top">
      <ImgBox sx={{ width: `${size}`, height: `${size}` }}>
        <img width={size} height={size} src={grey === 'grey' ? greyPrompt : TopLiquidity} alt="" />
      </ImgBox>
    </Tooltip>
  )
}
