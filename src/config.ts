const gasLimit = 21000
// RINKEBY
export const getProxyAddressesRegistry = (chainId?: number) => {
  if (chainId === 42) {
    return '0xfc5595bD553e8983fdf2E71af61e32876d14fc4f'
  }
  if (chainId === 5) {
    return '0x7AdE841269a4C59b6F964C8Bd951aF8DA8D13897'
  }
  return '0x7AdE841269a4C59b6F964C8Bd951aF8DA8D13897'
}
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
    return '0x200f84e649A90918CD0f3e803f6EAA9a3269aB97'
  }
  return '0x200f84e649A90918CD0f3e803f6EAA9a3269aB97'
}
export const getPunkGatewayAddresses = (chainId?: number) => {
  if (chainId === 42) {
    return '0xb6fd9429Ed9C6786ab4C0fec310812632ddc7452'
  }
  if (chainId === 5) {
    return '0xb6fd9429Ed9C6786ab4C0fec310812632ddc7452'
  }
  return '0xb6fd9429Ed9C6786ab4C0fec310812632ddc7452'
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
// const PUNKS_ADDRESS = '0xbb1594cc5c456541b02a24a9132b070b385b7035' // v1
const PUNKS_ADDRESS = '0x35264fF0a6eFD9ddb4E6A9907F54C049da70638C'
const PUNKS_CONTRACT_ADDRESS = '0xf6c7748857b6e2edba7dce548a24ed3a95a2ccd3'
const CHAIN_IDs = [5]

export const wPunksAddrUnwrap = (addr: string): string =>
  addr.toLocaleLowerCase() === WPUNKS_ADDRESS ? PUNKS_ADDRESS : addr;

export const WPUNKS_ADDRESS = '0x51c8b0eec441c91c271a415131855fb895817743';

export {
  gasLimit,
  LTV_MASK,
  DECIMALS_MASK,
  FACTOR_MASK,
  COLLATERAL_MASK,
  CHAIN_IDs,
  PUNKS_ADDRESS,
  PUNKS_CONTRACT_ADDRESS,
}
