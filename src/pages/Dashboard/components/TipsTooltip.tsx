import { Box, styled, Tooltip } from '@mui/material'
import TopLiquidity from 'assets/images/svg/dashboard/Tips-liquidity.svg'
import greyPrompt from 'assets/images/svg/common/greyPrompt.svg'

import * as React from 'react'

const ImgBox = styled(Box)`
  margin-right: 4px;
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
      <ImgBox sx={{ width: `${size}` }}>
        <img width={size} height={size} src={grey === 'grey' ? greyPrompt : TopLiquidity} alt="" />
      </ImgBox>
    </Tooltip>
  )
}
