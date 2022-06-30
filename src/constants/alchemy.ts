import { Network, initializeAlchemy } from '@alch/alchemy-sdk'

const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_KEY,
  network: Network[process.env.REACT_APP_ETH_NETWORK as keyof typeof Network],
  maxRetries: 10,
}

const alchemy = initializeAlchemy(settings)

export default alchemy
