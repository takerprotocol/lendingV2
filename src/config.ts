// const gasLimit = 23000000
const gasLimit = 5000000
// RINKEBY
export const getProxyAddressesProvider = (chainId?: number) => {
  if (chainId === 42) {
    return '0xdc5b54ec293f3e8ede2854076e467a8525e5014d'
  }
  if (chainId === 5) {
    return '0xd0D2eF85D43C509d7032CfD740f1be3338516dBc'
  }
  return '0xd0D2eF85D43C509d7032CfD740f1be3338516dBc'
}
export const getGatewayAddresses = (chainId?: number) => {
  if (chainId === 42) {
    return '0x027a729ac4bf61a74fc2d18b117641b2e39b326f'
  }
  if (chainId === 5) {
    return '0x3fF11A6270133B8B462A082702aAf072b2B6e3F4'
  }
  return '0x3fF11A6270133B8B462A082702aAf072b2B6e3F4'
}
export const getERC20Address = (chainId?: number) => {
  if (chainId === 42) {
    return '0x63c6464824df2cf16e5deb2621855303e6177539'
  }
  if (chainId === 5) {
    return '0x6855Ce53c62695d7EF681232c7D6739ce8a11c28'
  }
  return '0x6855Ce53c62695d7EF681232c7D6739ce8a11c28'
}
export const getWETH = (chainId?: number) => {
  if (chainId === 42) {
    return '0xee144f0bfc2b8665a17b14702a65c74cb0d0e95f'
  }
  if (chainId === 5) {
    return '0x4dF05bA0b19980C86B9b94569B12C3549473E746'
  }
  return '0x4dF05bA0b19980C86B9b94569B12C3549473E746'
}

export const getERC721Address = (chainId?: number) => {
  if (chainId === 42) {
    return '0x2809c94dd3948abb869af008d84935028fd560ed'
  }
  if (chainId === 5) {
    return '0x27d88F730029C276e4b934D153C89f28B693C845'
  }
  return '0x27d88F730029C276e4b934D153C89f28B693C845'
}

export const getTToken = (chainId?: number) => {
  if (chainId === 42) {
    return '0xa92FAF88c7051BAcCddDc28260c95D0ecC1f2f34'
  }
  if (chainId === 5) {
    return '0x3Af30a16BC740b2c212d635c802E43eDe5555E2F'
  }
  return '0x3Af30a16BC740b2c212d635c802E43eDe5555E2F'
}

// KOVAN
const LTV_MASK = '0x000000000000000000000000000000000000000000000000000000000000FFFF'
const DECIMALS_MASK = '0X000000000000000000000000000000000000000000000000000000FF00000000'
const FACTOR_MASK = '0x0000000000000000000000000000000000000000000000000ffff00000000000'
const COLLATERAL_MASK = '0xAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'
const CHAIN_IDs = [42, 4, 5]
export { gasLimit, LTV_MASK, DECIMALS_MASK, FACTOR_MASK, COLLATERAL_MASK, CHAIN_IDs }
