import { Box, Button, styled, Typography } from '@mui/material'
import LogoIcon from 'assets/images/svg/logo.svg'
import { Link } from 'react-router-dom'
import { FlexBox } from 'styleds'

const HeaderBox = styled(Box)`
  display: flex;
  position: fixed;
  align-items: center;
  justify-content: space-between;
  height: 70px;
  padding: 0 30px;
  width: 100vw;
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(50px);
`

const WalletButton = styled(Button)`
  background: rgba(255, 255, 255, 0.5);
  box-shadow: 0px 5px 10px rgba(18, 55, 92, 0.04);
  border-radius: 32px;
  height: 48px !important;
  padding: 0 18.5px;
  .MuiTypography-root {
    background: linear-gradient(95.08deg, #7646ff 2.49%, #297ac9 49.84%, #00dfd2 97.19%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
`
export const Header = () => {
  return (
    <HeaderBox>
      <img alt="" src={LogoIcon} />
      <FlexBox>
        <Link to="/">
          <Typography component="span" variant="button" marginRight="49px">
            Home
          </Typography>
        </Link>
        <Link to="/dashboard">
          <Typography component="span" variant="button" marginRight="49px">
            Dashboard
          </Typography>
        </Link>
        <Link to="/liquidation">
          <Typography component="span" variant="button" marginRight="49px">
            Liquidation
          </Typography>
        </Link>
        <Link to="/faqs">
          <Typography component="span" variant="button" marginRight="49px">
            FAQs
          </Typography>
        </Link>
        <WalletButton variant="contained" color="inherit">
          <Typography>Connect Wallet</Typography>
        </WalletButton>
      </FlexBox>
    </HeaderBox>
  )
}
