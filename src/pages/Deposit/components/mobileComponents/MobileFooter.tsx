import { Box, Button, styled, Typography } from '@mui/material'
import { SpaceBetweenBox } from 'styleds'

const FooterBox = styled(Box)`
  margin-top: 1rem;
  background: #ffffff;
  border: 1px solid #eff0f6;
  padding: 0 -1rem;
  padding: 1rem 1rem 2.25rem 1.5rem;
  border-top-left-radius: 0.625rem;
  border-top-right-radius: 0.625rem;
`
const ResetButton = styled(Box)`
  display: flex;
  align-items: center;
`
interface MobileFooterProps {
  type: number
}
export default function MobileFooter({ type }: MobileFooterProps) {
  return (
    <FooterBox>
      <SpaceBetweenBox>
        <ResetButton>
          <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="30" height="30" rx="15" fill="#EFF0F6" />
            <path
              d="M11.0225 11.0225C10.0046 12.0404 9.375 13.4467 9.375 15C9.375 18.1066 11.8934 20.625 15 20.625C18.1066 20.625 20.625 18.1066 20.625 15C20.625 11.8934 18.1066 9.375 15 9.375"
              stroke="#A0A3BD"
              strokeWidth="1.36364"
              strokeLinecap="round"
            />
            <path
              d="M16.3349 11.8859L14.407 9.09577L17.354 7.41733"
              stroke="#A0A3BD"
              strokeWidth="1.36364"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <Typography ml="0.5rem" variant="body1" fontWeight="600">
            Redo
          </Typography>
        </ResetButton>
        <Button variant="contained">{type === 1 ? 'Deposit 2 NFTs' : 'Withdraw 1 NFT'}</Button>
      </SpaceBetweenBox>
    </FooterBox>
  )
}
