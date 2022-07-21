import BigNumber from 'bignumber.js'

export interface Price {
  name: string
  price: number
}

export interface UserValues {
  borrowLiquidity: BigNumber
  NFTLiquidity: BigNumber
  totalDebt: BigNumber
  totalCollateral: BigNumber
}
