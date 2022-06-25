export enum SupportedChainId {
  MAINNET = 1,
  ROPSTEN = 3,
  RINKEBY = 4,
  GOERLI = 5,
  KOVAN = 42,

  ARBITRUM_ONE = 42161,
  ARBITRUM_RINKEBY = 421611,
  OPTIMISM = 10,
  OPTIMISTIC_KOVAN = 69,
  BSC_MAINNET = 56,
  BSC_TESTNET = 97,
  POLYGON_MAINNET = 137,
  POLYGON_TESTNET = 137,
}

export const ALL_SUPPORTED_CHAIN_IDS: SupportedChainId[] = [
  SupportedChainId.MAINNET,
  SupportedChainId.ROPSTEN,
  SupportedChainId.RINKEBY,
  SupportedChainId.GOERLI,
  SupportedChainId.KOVAN,

  SupportedChainId.ARBITRUM_ONE,
  SupportedChainId.ARBITRUM_RINKEBY,
  SupportedChainId.OPTIMISM,
  SupportedChainId.OPTIMISTIC_KOVAN,
  // bsc
  SupportedChainId.BSC_MAINNET,
  SupportedChainId.BSC_TESTNET,
  // Polygon
  SupportedChainId.POLYGON_MAINNET,
  SupportedChainId.POLYGON_TESTNET,
]
export const chainIdList: any = {
  Ethereum: 4,
  BSC: 97,
  Polygon: 137,
}

export const chainScanUrlList: any = {
  [chainIdList.Ethereum]: 'https://rinkeby.etherscan.io/',
  [chainIdList.BSC]: 'https://testnet.bscscan.com/',
  [chainIdList.Polygon]: 'https://mumbai.polygonscan.com/',
}
export const chainNodeList: any = {
  [chainIdList.Ethereum]: 'https://rinkeby.infura.io/v3/',
  [chainIdList.BSC]: 'https://data-seed-prebsc-2-s1.binance.org:8545/',
  [chainIdList.Polygon]: 'https://polygon-rpc.com',
}
export const chainAlchemyList: any = {
  [chainIdList.Ethereum]: 'https://eth-rinkeby.alchemyapi.io/v2/',
  [chainIdList.Polygon]: 'https://polygon-mumbai.g.alchemyapi.io/v2/',
}
export const chainNameList: any = {
  [chainIdList.Ethereum]: 'Ethereum Testnet',
  [chainIdList.BSC]: 'Binance Smart Chain Testnet',
  [chainIdList.Polygon]: 'Mubai Testnet',
}

export const networkTokens: any = {
  [chainIdList.Ethereum]: 'ETH',
  [chainIdList.BSC]: 'BNB',
  [chainIdList.Polygon]: 'MATIC',
}

export const networkName: any = {
  [chainIdList.Ethereum]: 'Ethereum',
  [chainIdList.BSC]: 'BSC',
  [chainIdList.Polygon]: 'Polygon',
}
