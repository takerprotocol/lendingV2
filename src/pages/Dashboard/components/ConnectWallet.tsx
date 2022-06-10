import styled from '@emotion/styled'
import { Box, Button, Typography } from '@mui/material'
import wallet from 'assets/images/svg/dashboard/wallet.svg'
import { useWalletModalToggle } from 'state/application/hooks'
const ConnectWalletBox = styled(Box)`
  width: 1159px;
  background: #ffffff;
  box-shadow: 0px 10px 20px rgba(218, 218, 238, 0.3);
  border-radius: 12px;
  padding: 49px 0px;
  margin-top: 48px;
`
const WalletFlexBox = styled(Box)`
  justify-content: center;
  flex-direction: column;
  display: flex;
  align-items: center;
`
const WalletBgBox = styled(Box)`
  display: flex;
  width: 62px;
  height: 62px;
  align-items: center;
  justify-content: center;
  background: linear-gradient(
      61.18deg,
      rgba(102, 166, 232, 0) 0%,
      rgba(135, 143, 248, 0.098) 51.07%,
      rgba(105, 165, 233, 0.2) 97.23%
    ),
    #262338;
  box-shadow: 0px 4px 8px rgba(75, 75, 122, 0.1), inset 0px 2px 2px rgba(75, 86, 132, 0.5);
  border-radius: 6px;
`
export default function ConnectWallet({ type }: { type: number }) {
  const toggleModal = useWalletModalToggle()

  return (
    <ConnectWalletBox>
      <WalletFlexBox>
        <WalletBgBox>
          <img src={wallet} alt="" />
        </WalletBgBox>
        <Typography mt="14px" variant="h4" component="h1" color="#14142A">
          Please connect your wallet
        </Typography>
        <Typography mt="8px" variant="body1" component="h1" color="#A0A3BD">
          To see your deposited / borrowed assets, you
        </Typography>
        <Typography variant="body1" component="h1" color="#A0A3BD">
          need to connect your wallet.
        </Typography>
        {type === 1 ? (
          <Button
            variant="contained"
            sx={{ width: '172px', borderRadius: '31px', mt: '24px' }}
            onClick={() => {
              toggleModal()
            }}
          >
            Connect Wallet
          </Button>
        ) : (
          <Button
            variant="contained"
            color="success"
            sx={{ width: '172px', borderRadius: '31px', mt: '24px' }}
            onClick={() => {
              toggleModal()
            }}
          >
            Connect Wallet
          </Button>
        )}
      </WalletFlexBox>
    </ConnectWalletBox>
  )
}
