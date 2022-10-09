import { Box, styled, Typography } from '@mui/material'
import { SpaceBetweenBox, FlexBox } from 'styleds'

const MobileMainBox = styled(Box)``
const LiquidateBox = styled(Box)`
  background: #ffffff;
  margin-top: -0.8125rem;
  padding: 1rem;
  border-top-left-radius: 0.75rem;
  border-top-right-radius: 0.75rem;
`
interface MobileMainProps {
  totalDebt: string
}
export default function MobileMain({ totalDebt }: MobileMainProps) {
  return (
    <MobileMainBox>
      <LiquidateBox>
        <SpaceBetweenBox>
          <Typography fontWeight="700" variant="subtitle2">
            Liquidate
          </Typography>
          <FlexBox>
            <svg width="17" height="22" viewBox="0 0 17 22" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M4 11.7121L8.5 4.5L13 11.7121L8.5 18.5L4 11.7121Z"
                stroke="#7646FF"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
              <path d="M4 11.5L8.5 14L13 11.5" stroke="#7646FF" strokeLinejoin="round" />
            </svg>
            <Typography ml="0.375rem" fontWeight="700" color="#7646FF" variant="subtitle2">
              {totalDebt}
            </Typography>
          </FlexBox>
        </SpaceBetweenBox>
        <SpaceBetweenBox>
          <Typography color="#A0A3BD" variant="body2">
            Choose your favorite NFTs
          </Typography>
          <Typography color="#A0A3BD" variant="body2">
            Total liquidation amount
          </Typography>
        </SpaceBetweenBox>
      </LiquidateBox>
    </MobileMainBox>
  )
}
