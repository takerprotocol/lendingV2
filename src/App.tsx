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

const Web3ProviderNetwork = createWeb3ReactRoot(NetworkContextName)
if (!!window.ethereum) {
  window.ethereum.autoRefreshOnNetworkChange = false
}

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <Web3ReactProvider getLibrary={getLibrary}>
          <Web3ProviderNetwork getLibrary={getLibrary}>
            <Web3ReactManager>
              <Router>
                <Header />
                <CustomizeRoutes></CustomizeRoutes>
              </Router>
            </Web3ReactManager>
          </Web3ProviderNetwork>
        </Web3ReactProvider>
      </Provider>
    </ThemeProvider>
  )
}
