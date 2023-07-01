import { BrowserRouter as Router } from 'react-router-dom'
import { ThemeProvider } from '@mui/material/styles'
import theme from 'theme'
import { Provider } from 'react-redux'
import store from 'state'
import Web3ReactManager from 'components/Web3ReactManager'
import { createWeb3ReactRoot, Web3ReactProvider } from '@web3-react/core'
import { NetworkContextName } from './constants/misc'
import getLibrary from 'utils/getLibrary'
import CustomizeRoutes from 'routers'
import { Header } from 'components/Header'
import TransactionUpdater from './state/transactions/updater'
import { BlockNumberProvider } from 'hooks/transactions/useBlockNumber'
import { ToastContainer } from 'react-toastify'
import ToastSuccessIcon from 'assets/images/png/common/toast-success.png'
import ToastErrorIcon from 'assets/images/png/common/toast-error.png'
import CloseIcon from 'assets/images/svg/common/close.svg'
const Web3ProviderNetwork = createWeb3ReactRoot(NetworkContextName)
if (!!window.ethereum) {
  window.ethereum.autoRefreshOnNetworkChange = false
}

export default function App() {
  function Updaters() {
    return (
      <>
        <TransactionUpdater />
      </>
    )
  }
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <Web3ReactProvider getLibrary={getLibrary}>
          <Web3ProviderNetwork getLibrary={getLibrary}>
            <Web3ReactManager>
              <BlockNumberProvider>
                <ToastContainer
                  position="top-right"
                  closeOnClick={true}
                  icon={
                    <>
                      <img className="error" src={ToastErrorIcon} alt=""></img>
                      <img className="success" src={ToastSuccessIcon} alt=""></img>
                    </>
                  }
                  closeButton={({ closeToast }: { closeToast: any }) => (
                    <img className="toast-close" src={CloseIcon} alt="" onClick={closeToast}></img>
                  )}
                  hideProgressBar={true}
                  autoClose={2500}
                />
                <Router>
                  <Updaters />
                  <Header />
                  <CustomizeRoutes></CustomizeRoutes>
                </Router>
              </BlockNumberProvider>
            </Web3ReactManager>
          </Web3ProviderNetwork>
        </Web3ReactProvider>
      </Provider>
    </ThemeProvider>
  )
}
