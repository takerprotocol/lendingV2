import { Box, styled, Typography } from '@mui/material'
import { CenterBox } from 'styleds'
const HeaderCenterBox = styled(Box)`
  padding-top: 7.5rem;
  padding-bottom: 5.375rem;
`
const FoundTypography = styled(Typography)`
  font-family: 'Quicksand';
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 160%;
  text-align: center;
  text-transform: uppercase;
  color: #ffffff;
`
const LiquidateTypography = styled(Typography)`
  font-family: 'Quicksand';
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 160%;
  text-align: center;
  color: #ffffff;
`
export default function MobileHeader() {
  return (
    <HeaderCenterBox>
      <FoundTypography>found some treasure !</FoundTypography>
      <LiquidateTypography mt="1.5rem">Liquidate with a floor price to </LiquidateTypography>
      <LiquidateTypography mb="1.5rem">get some NFTs you like </LiquidateTypography>
      <CenterBox>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 22L12 2" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
          <path
            d="M20 13.0008L12 22L4 13"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </CenterBox>
    </HeaderCenterBox>
  )
}
