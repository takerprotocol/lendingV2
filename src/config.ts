// const gasLimit = 23000000
const gasLimit = 5000000
// RINKEBY
export const getProxyAddressesProvider = (chainId?: number) => {
  if (chainId === 42) {
    return '0xdc5b54ec293f3e8ede2854076e467a8525e5014d'
  }
  if (chainId === 5) {
    return '0x5BecdaF3f5f433a5F361cA62DD6FdC0511940952'
  }
  return '0x7ab625097720f2EDe858E9e2C1a76b4C97330A6E'
}
export const getGatewayAddresses = (chainId?: number) => {
  if (chainId === 42) {
    return '0x027a729ac4bf61a74fc2d18b117641b2e39b326f'
  }
  if (chainId === 5) {
    return '0x1Db1011e880664A43009661d8A647A37c6789234'
  }
  return '0xf7dd823b1538eb76fedb40b765f60845461852b9'
}
export const getERC20Address = (chainId?: number) => {
  if (chainId === 42) {
    return '0x63c6464824df2cf16e5deb2621855303e6177539'
  }
  if (chainId === 5) {
    return '0x6855Ce53c62695d7EF681232c7D6739ce8a11c28'
  }
  return '0xC7FE0Ff4084b9c85618F8598fa95990Fe68e29F3'
}
export const getWETH = (chainId?: number) => {
  if (chainId === 42) {
    return '0xee144f0bfc2b8665a17b14702a65c74cb0d0e95f'
  }
  if (chainId === 5) {
    return '0x3Ec409985520Ddf917b0e1b210faf8B26C372804'
  }
  return '0xc778417e063141139fce010982780140aa0cd5ab'
}

export const getERC721Address = (chainId?: number) => {
  if (chainId === 42) {
    return '0x2809c94dd3948abb869af008d84935028fd560ed'
  }
  if (chainId === 5) {
    return '0xD2c167c59905F909cD1dEE13223e84e43a340d85'
  }
  return '0x5CeB7116100fBAF2AEA73Bf964eD435f7D816c37'
}

export const getTToken = (chainId?: number) => {
  if (chainId === 42) {
    return '0xa92FAF88c7051BAcCddDc28260c95D0ecC1f2f34'
  }
  if (chainId === 5) {
    return '0xb45e358Ce8D3e181fEb7733B76c06cFd068Cac69'
  }
  return '0xa92FAF88c7051BAcCddDc28260c95D0ecC1f2f34'
}

// KOVAN
const LTV_MASK = '0x000000000000000000000000000000000000000000000000000000000000FFFF'
const DECIMALS_MASK = '0X000000000000000000000000000000000000000000000000000000FF00000000'
const FACTOR_MASK = '0x0000000000000000000000000000000000000000000000000ffff00000000000'
const COLLATERAL_MASK = '0xAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'
const CHAIN_IDs = [42, 4, 5]
export { gasLimit, LTV_MASK, DECIMALS_MASK, FACTOR_MASK, COLLATERAL_MASK, CHAIN_IDs }
