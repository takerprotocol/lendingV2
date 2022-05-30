import { AbstractConnector } from '@web3-react/abstract-connector'

import INJECTED_ICON_URL from 'assets/images/svg/arrow-right.svg'
import WALLETCONNECT_ICON_URL from 'assets/images/svg/walletConnectIcon.svg'
import METAMASK_ICON_URL from 'assets/images/png/metamask.png'
import TORUS_ICON_URL from 'assets/images/png/torus.png'
import BSC_ICON_URL from 'assets/images/png/bsc.jpg'
import { injected, WalletConnect, Torus } from '../connectors'

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
}

export const SUPPORTED_WALLETS: { [key: string]: WalletInfo } = {
  INJECTED: {
    connector: injected,
    name: 'Injected',
    iconURL: INJECTED_ICON_URL,
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
    name: 'WalletConnect',
    iconURL: WALLETCONNECT_ICON_URL,
    description: 'Easy-to-use browser extension.',
    href: null,
    color: '#E8831D',
  },
  TORUS: {
    connector: Torus,
    name: 'Torus',
    iconURL: TORUS_ICON_URL,
    description: 'Easy-to-use browser extension.',
    href: null,
    color: '#E8831D',
  },
}
