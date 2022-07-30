export interface Price {
  name: string
  price: number
}

export interface UserValues {
  borrowLiquidity: string
  NFTLiquidity: string
  totalDebt: string
  totalCollateral: string
}
export interface erc20ReserveData {
  borrowRate: string
  configuration: string
  debtIndex: string
  debtTokenAddress: string
  depositRate: string
  interestRateCalculatorAddress: string
  tTokenAddress: string
  treasury: string
  lastUpdateTimestamp: string
  liquidityIndex: string
}
export interface userState {
  loanToValue: string
  liquidationThreshold: string
  heathFactor: string
}
