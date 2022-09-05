// const gasLimit = 23000000
const gasLimit = 5000000
// RINKEBY
// const PROXY_ADDRESSES_PROVIDER = '0x7ab625097720f2EDe858E9e2C1a76b4C97330A6E'
// const GATEWAY_ADDRESSES = '0xf7dd823b1538eb76fedb40b765f60845461852b9'
// const ERC20_ADDRESS = '0xC7FE0Ff4084b9c85618F8598fa95990Fe68e29F3'
// const WETH = '0xc778417e063141139fce010982780140aa0cd5ab'
// const ERC721_ADDRESS = '0x5CeB7116100fBAF2AEA73Bf964eD435f7D816c37'
// const CHAIN_ID = 4

// KOVAN
const PROXY_ADDRESSES_PROVIDER = '0xdc5b54ec293f3e8ede2854076e467a8525e5014d'
const GATEWAY_ADDRESSES = '0x027a729ac4bf61a74fc2d18b117641b2e39b326f'
const ERC20_ADDRESS = '0x63c6464824df2cf16e5deb2621855303e6177539'
const WETH = '0xee144f0bfc2b8665a17b14702a65c74cb0d0e95f'
const ERC721_ADDRESS = '0x2809c94dd3948abb869af008d84935028fd560ed'
const CHAIN_ID = 42

const LTV_MASK = '0x000000000000000000000000000000000000000000000000000000000000FFFF'
const DECIMALS_MASK = '0X000000000000000000000000000000000000000000000000000000FF00000000'
const FACTOR_MASK = '0x0000000000000000000000000000000000000000000000000ffff00000000000'
const COLLATERAL_MASK = '0xAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'
export {
  gasLimit,
  WETH,
  GATEWAY_ADDRESSES,
  ERC20_ADDRESS,
  ERC721_ADDRESS,
  LTV_MASK,
  DECIMALS_MASK,
  CHAIN_ID,
  FACTOR_MASK,
  PROXY_ADDRESSES_PROVIDER,
  COLLATERAL_MASK,
}
