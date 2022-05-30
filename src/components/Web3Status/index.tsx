import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core'
import { styled } from '@mui/material/styles'
import { Button, Box } from '@mui/material'
import { Activity } from 'react-feather'
import { useWalletModalToggle } from 'state/application/hooks'
import WalletModal from '../WalletModal'
import { NetworkContextName } from 'constants/misc'
import theme, { colors } from 'theme'

const Web3StatusError = styled(Button)``
const Web3StatusConnect = styled(Button)``

const NetworkIcon = styled(Activity)`
  margin-left: 0.25rem;
  margin-right: 0.5rem;
  width: 16px;
  height: 16px;
`
const Avatar = styled(Box)`
  width: 42px;
  height: 42px;
  background-color: ${colors.barBackground};
  font-size: 1.35rem;
  color: ${theme.palette.common.white};
  display: inline-block;
  text-align: center;
  line-height: 42px;
  border-radius: 21px;
  cursor: pointer;
`
function Web3StatusInner() {
  const { account, error } = useWeb3React()
  const toggleWalletModal = useWalletModalToggle()
  if (account) {
    return <Avatar>S</Avatar>
  } else if (error) {
    return (
      <Web3StatusError color="error" onClick={toggleWalletModal}>
        <NetworkIcon />
        <p>{error instanceof UnsupportedChainIdError ? <b>Wrong Network</b> : <b>Error</b>}</p>
      </Web3StatusError>
    )
  } else {
    return (
      <Web3StatusConnect variant="contained" size="medium" id="connect-wallet" onClick={toggleWalletModal}>
        Connect Wallet
      </Web3StatusConnect>
    )
  }
}

export default function Web3Status() {
  const { active } = useWeb3React()
  const contextNetwork = useWeb3React(NetworkContextName)
  return (
    <>
      <Web3StatusInner />
      {(contextNetwork.active || active) && <WalletModal />}
      {}
    </>
  )
}
