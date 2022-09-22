import { AbstractConnector } from '@web3-react/abstract-connector'

import WALLETCONNECT_ICON_URL from 'assets/images/svg/common/walletConnectLogo.svg'
import METAMASK_ICON_URL from 'assets/images/svg/common/metaMaskLogo.svg'
import { injected, WalletConnect } from '../connectors'

interface WalletInfo {
  connector?: AbstractConnector
  name: string
  iconURL: string
  description: string
  href: string | null
  color: string
  primary?: true
  mobile?: true
  mobileOnly?: true
  type?: boolean
}

export const SUPPORTED_WALLETS: { [key: string]: WalletInfo } = {
  INJECTED: {
    connector: injected,
    name: 'Injected',
    iconURL: METAMASK_ICON_URL,
    description: 'Injected web3 provider.',
    href: null,
    color: '#010101',
    primary: true,
  },
  METAMASK: {
    connector: injected,
    name: 'MetaMask',
    iconURL: METAMASK_ICON_URL,
    description: 'Easy-to-use browser extension.',
    href: null,
    color: '#E8831D',
  },
  WALLETCONNECT: {
    connector: WalletConnect,
    name: 'Wallet Connect',
    iconURL: WALLETCONNECT_ICON_URL,
    description: 'Easy-to-use browser extension.',
    href: null,
    color: '#E8831D',
    type: true,
  },
}
