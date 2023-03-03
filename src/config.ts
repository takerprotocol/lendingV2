// const gasLimit = 23000000
const gasLimit = 5000000
// RINKEBY
export const getProxyAddressesProvider = (chainId?: number) => {
  if (chainId === 42) {
    return '0xdc5b54ec293f3e8ede2854076e467a8525e5014d'
  }
  if (chainId === 5) {
    return '0x5cb4887a2694A34fc941ecc1971828F5989b49bE'
  }
  return '0x5cb4887a2694A34fc941ecc1971828F5989b49bE'
}
export const getGatewayAddresses = (chainId?: number) => {
  if (chainId === 42) {
    return '0x027a729ac4bf61a74fc2d18b117641b2e39b326f'
  }
  if (chainId === 5) {
    return '0x898b4faA08FDd29726793CBd06a3da553d8Bb638'
  }
  return '0x898b4faA08FDd29726793CBd06a3da553d8Bb638'
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
    return '0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6'
  }
  return '0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6'
}

export const getERC721Address = (chainId?: number) => {
  if (chainId === 42) {
    return '0x2809c94dd3948abb869af008d84935028fd560ed'
  }
  if (chainId === 5) {
    return '0x0f1165Cbd432fdd05944E3C53e1A21b8Bc1e2697'
  }
  return '0x0f1165Cbd432fdd05944E3C53e1A21b8Bc1e2697'
}

export const getTToken = (chainId?: number) => {
  if (chainId === 42) {
    return '0xa92FAF88c7051BAcCddDc28260c95D0ecC1f2f34'
  }
  if (chainId === 5) {
    return '0xb45e358Ce8D3e181fEb7733B76c06cFd068Cac69'
  }
  return '0xb45e358Ce8D3e181fEb7733B76c06cFd068Cac69'
}

export const getDToken = (chainId?: number) => {
  if (chainId === 42) {
    return '0xa92FAF88c7051BAcCddDc28260c95D0ecC1f2f34'
  }
  if (chainId === 5) {
    return '0xb45e358Ce8D3e181fEb7733B76c06cFd068Cac69'
  }
  return '0xb45e358Ce8D3e181fEb7733B76c06cFd068Cac69'
}

// KOVAN
const LTV_MASK = '0x000000000000000000000000000000000000000000000000000000000000FFFF'
const DECIMALS_MASK = '0X000000000000000000000000000000000000000000000000000000FF00000000'
const FACTOR_MASK = '0x0000000000000000000000000000000000000000000000000ffff00000000000'
const COLLATERAL_MASK = '0xAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'
const CHAIN_IDs = [42, 4, 5]
export { gasLimit, LTV_MASK, DECIMALS_MASK, FACTOR_MASK, COLLATERAL_MASK, CHAIN_IDs }
