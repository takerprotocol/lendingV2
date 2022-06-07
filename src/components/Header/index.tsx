import { Box, Button, styled, Typography } from '@mui/material'
import LogoIcon from 'assets/images/svg/logo.svg'
import AddressIcon from 'assets/images/svg/wallet/address.svg'
import WalletModal from 'components/WalletModal'
import { Link } from 'react-router-dom'
import { useAddress, useToggleModal } from 'state/application/hooks'
import { ApplicationModal } from 'state/application/reducer'
import { FlexBox } from 'styleds'
import { desensitization } from 'utils'

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
  z-index: 10;
`

const AddressBox = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 14px 15px;
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  color: #6e7191;
  background: rgba(160, 163, 189, 0.1);
  border-radius: 4px;
  img {
    margin-right: 12px;
  }
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
  const toggleModal = useToggleModal(ApplicationModal.WALLET)
  const address = useAddress()
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
        {!address ? (
          <WalletButton
            variant="contained"
            color="inherit"
            onClick={() => {
              toggleModal()
            }}
          >
            <Typography>Connect Wallet</Typography>
          </WalletButton>
        ) : (
          <AddressBox>
            <img alt="" src={AddressIcon}></img>
            {desensitization(address)}
          </AddressBox>
        )}
      </FlexBox>
      <WalletModal></WalletModal>
    </HeaderBox>
  )
}
