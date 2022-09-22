import { Box, Button, styled, Typography } from '@mui/material'
import { SpaceBetweenBox, FlexBox } from 'styleds'

const MobileFooterBox = styled(Box)`
  position: fixed;
  bottom: 0rem;
  width: 100%;
  left: 0rem;
  background: #262338;
  padding: 1rem 1rem 2.25rem 1rem;
  border-top-left-radius: 0.75rem;
  border-top-right-radius: 0.75rem;
  box-shadow: 0rem 0.625rem 1.25rem rgba(38, 35, 56, 0.1);
`
const LiquidateButton = styled(Button)`
  background: linear-gradient(82.51deg, #884bff 0%, #6865ff 42.39%, #4785ff 74.2%, #2fc1ff 100%) !important;
  border-radius: 6px !important;
`
export default function MobileFooter() {
  return (
    <MobileFooterBox>
      <SpaceBetweenBox>
        <Box>
          <Typography mb="0.5rem" color="#EFF0F6" lineHeight="0.75rem" variant="body2">
            Total price
          </Typography>
          <FlexBox>
            <svg width="17" height="22" viewBox="0 0 17 22" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M4 11.7121L8.5 4.5L13 11.7121L8.5 18.5L4 11.7121Z"
                stroke="#D9DBE9"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
              <path d="M4 11.5L8.5 14L13 11.5" stroke="#D9DBE9" strokeLinejoin="round" />
            </svg>

            <Typography ml="0.125rem" color="#FFFFFF" fontWeight="700" lineHeight="1.375rem" variant="subtitle1">
              48.6176
            </Typography>
            <Typography ml="0.5rem" color="#A87EFF" lineHeight="0.75rem" variant="body2">
              Details
              <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 4.875L8 11.5" stroke="#A87EFF" strokeLinecap="round" />
                <path d="M11 7.49973L8 4.5L5 7.5" stroke="#A87EFF" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Typography>
          </FlexBox>
        </Box>
        <Box>
          <LiquidateButton variant="contained" color="primary">
            LIQUIDATE
          </LiquidateButton>
        </Box>
      </SpaceBetweenBox>
    </MobileFooterBox>
  )
}
