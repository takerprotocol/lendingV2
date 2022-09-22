import { Box, styled, Typography } from '@mui/material'
import mobileWallet from 'assets/images/svg/common/mobileWallet-Left.svg'
import mobileMetaMask from 'assets/images/svg/common/mobileMetaMask-icon.svg'
import mobileActive from 'assets/images/svg/common/mobileActive-icon.svg'
import mobileWalletConnect from 'assets/images/svg/common/mobileWalletConnect-icon.svg'
import { FlexBox, SpaceBetweenBox } from 'styleds'
const WalletBox = styled(Box)`
  background: #ffffff;
  border-radius: 0.75rem;
  padding: 1.5rem 1rem;
`
const ActiveBox = styled(Box)`
  .none {
    display: none;
  }
  :active {
    background: #f7f7fc;
    border-radius: 8px;
    .active {
      font-weight: 700;
      color: #7646ff;
    }
    .none {
      display: block;
    }
  }
  padding: 0.75rem 1.25rem;
`
interface MobileWalletProps {
  setLoginWallet: Function
}
export default function MobileWallet({ setLoginWallet }: MobileWalletProps) {
  return (
    <WalletBox>
      <FlexBox mb="2.25rem">
        <img src={mobileWallet} alt="" onClick={() => setLoginWallet(true)} />
        <Typography variant="subtitle1" ml="4.25rem" lineHeight="1.125rem" fontWeight="700" color="#262338">
          Select a wallet
        </Typography>
      </FlexBox>
      <ActiveBox mb="0.5rem">
        <SpaceBetweenBox>
          <FlexBox>
            <img src={mobileMetaMask} alt="" />
            <Typography
              ml="1.125rem"
              className="active"
              variant="subtitle1"
              lineHeight="1.125rem"
              fontWeight="400"
              color="#262338"
            >
              MetaMask
            </Typography>
          </FlexBox>
          <FlexBox className="none">
            <img src={mobileActive} alt="" />
          </FlexBox>
        </SpaceBetweenBox>
      </ActiveBox>
      <ActiveBox>
        <SpaceBetweenBox>
          <FlexBox>
            <img src={mobileWalletConnect} alt="" />
            <Typography
              ml="1.125rem"
              className="active"
              variant="subtitle1"
              lineHeight="1.125rem"
              fontWeight="400"
              color="#262338"
            >
              Wallet Connect
            </Typography>
          </FlexBox>
          <FlexBox className="none">
            <img src={mobileActive} alt="" />
          </FlexBox>
        </SpaceBetweenBox>
      </ActiveBox>
    </WalletBox>
  )
}
