import { useCallback, useEffect, useState } from 'react'
import { Box, Typography } from '@mui/material'
import theme from 'theme'
import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core'
import { AbstractConnector } from '@web3-react/abstract-connector'
import { useModalOpen, useWalletModalToggle } from 'state/application/hooks'
import { ApplicationModal } from 'state/application/reducer'
import usePrevious from 'hooks/usePrevious'
import { injected } from 'connectors'
import { SUPPORTED_WALLETS } from 'constants/wallet'
import { isMobile } from 'utils/userAgent'

import MetamaskIcon from 'assets/images/png/metamask.png'

import Option from './Option'
import Modal from 'components/Modal'
import { useAppDispatch } from 'state/hooks'
import { Web3Provider } from '@ethersproject/providers'
import { formatEther } from 'ethers/lib/utils'
import { setAccountBalance, setAddress } from 'state/user/reducer'
import { useAddress } from 'state/user/hooks'

const WALLET_VIEWS = {
  OPTIONS: 'options',
  OPTIONS_SECONDARY: 'options_secondary',
  ACCOUNT: 'account',
  LEGAL: 'legal',
}

export default function WalletModal() {
  const { account, connector, activate, error } = useWeb3React()
  const walletModalOpen = useModalOpen(ApplicationModal.WALLET)
  const toggleWalletModal = useWalletModalToggle()
  const previousAccount = usePrevious(account)
  const [walletView, setWalletView] = useState(WALLET_VIEWS.ACCOUNT)
  const address = useAddress()
  const previousWalletView = usePrevious(walletView)
  const dispatch = useAppDispatch()
  useEffect(() => {
    if (account && !previousAccount && walletModalOpen) {
      toggleWalletModal()
    }
  }, [account, previousAccount, toggleWalletModal, walletModalOpen])

  useEffect(() => {
    if (account) {
      dispatch(setAddress(account))
    }
  }, [account, dispatch])

  const setBalance = useCallback(async () => {
    if (connector && address) {
      const provider = new Web3Provider(await connector.getProvider())
      const balance = await provider.getBalance(String(address))
      const ethBalance = formatEther(balance.sub(balance.mod(1e14)))
      if (balance) {
        dispatch(setAccountBalance(ethBalance))
      }
    }
  }, [connector, address, dispatch])

  useEffect(() => {
    setBalance()
  }, [setBalance])

  const tryActivation = async (connector: AbstractConnector | undefined) => {
    Object.keys(SUPPORTED_WALLETS).map((key) => {
      if (connector === SUPPORTED_WALLETS[key].connector) {
        return SUPPORTED_WALLETS[key].name
      }
      return true
    })
    // if the connector is walletconnect and the user has already tried to connect, manually reset the connector
    connector &&
      activate(connector, undefined, true)
        .then(async () => {
          const walletAddress = await connector.getAccount()
          if (walletAddress) {
            localStorage.setItem('address', walletAddress)
            dispatch(setAddress(walletAddress))
          }
          connector.addListener('Web3ReactDeactivate', () => {
            dispatch(setAddress(''))
          })
        })
        .catch((error) => {
          console.log(error, '-----------')
          if (error instanceof UnsupportedChainIdError) {
            activate(connector) // a little janky...can't use setError because the connector isn't set
          } else {
            console.log(true, '-----')
          }
        })
  }

  // get wallets user can switch too, depending on device/browser
  function getOptions() {
    const isMetamask = window.ethereum && window.ethereum.isMetaMask
    return Object.keys(SUPPORTED_WALLETS).map((key) => {
      const option = SUPPORTED_WALLETS[key]
      // check for mobile options
      if (isMobile) {
        if (!window.web3 && !window.ethereum && option.mobile) {
          return (
            <Option
              onClickEvt={() => {
                option.connector !== connector && !option.href && tryActivation(option.connector)
              }}
              key={key}
              link={option.href}
              header={option.name}
              icon={option.iconURL}
            />
          )
        }
        return null
      }

      // overwrite injected when needed
      if (option.connector === injected) {
        // don't show injected if there's no injected provider
        if (!(window.web3 || window.ethereum)) {
          if (option.name === 'MetaMask') {
            return (
              <Option key={key} header={<p>Install Metamask</p>} link={'https://metamask.io/'} icon={MetamaskIcon} />
            )
          } else {
            return null //dont want to return install twice
          }
        }
        // don't return metamask if injected provider isn't metamask
        else if (option.name === 'MetaMask' && !isMetamask) {
          return null
        }
        // likewise for generic
        else if (option.name === 'Injected' && isMetamask) {
          return null
        }
      }

      // return rest of options
      return (
        !isMobile &&
        !option.mobileOnly && (
          <Option
            onClickEvt={() => {
              option.connector === connector
                ? setWalletView(WALLET_VIEWS.ACCOUNT)
                : !option.href && tryActivation(option.connector)
            }}
            key={key}
            link={option.href}
            header={option.name}
            icon={option.iconURL}
          />
        )
      )
    })
  }
  function getModalContent() {
    if (error) {
      return (
        <Box p="40px 56px">
          <Typography color={theme.palette.error.main} flex="1" variant="h4">
            {error instanceof UnsupportedChainIdError ? <Box>Wrong Network</Box> : <Box>Error connecting</Box>}
          </Typography>
          <Box>
            {error instanceof UnsupportedChainIdError ? (
              <Typography color={theme.palette.error.main} flex="1" variant="h6">
                Please connect to the appropriate Ethereum network.
              </Typography>
            ) : (
              <Typography color={theme.palette.error.main} flex="1" variant="h6">
                Error connecting. Try refreshing the page.
              </Typography>
            )}
          </Box>
        </Box>
      )
    }
    if (walletView === WALLET_VIEWS.LEGAL) {
      return (
        <Box>
          <Box>
            <Box
              onClick={() => {
                setWalletView(
                  (previousWalletView === WALLET_VIEWS.LEGAL ? WALLET_VIEWS.ACCOUNT : previousWalletView) ??
                    WALLET_VIEWS.ACCOUNT
                )
              }}
            >
              <Box />
            </Box>
            <Box>
              <Box>
                <Box>Legal & Privacy</Box>
              </Box>
            </Box>
          </Box>
          <Box />
        </Box>
      )
    }
    return <Box>{getOptions()}</Box>
  }
  return (
    <Modal isOpen={walletModalOpen} onClose={toggleWalletModal} isTitle={!error} title="Select a wallet">
      <Box padding={'16px'}>{getModalContent()}</Box>
    </Modal>
  )
}
