import { OwnedNftsResponse } from '@alch/alchemy-sdk'
import { createSlice } from '@reduxjs/toolkit'
import BigNumber from 'bignumber.js'
import { UserValues } from 'state/types'

export type PopupContent = {
  txn: {
    hash: string
  }
}

export enum ApplicationModal {
  WALLET,
}

export interface ApplicationState {
  readonly address: string
  readonly balance: string
  readonly nftDebt: string
  readonly nftLiquidity: string
  readonly nftCollateral: string
  readonly userNftConfig: string
  readonly ownedNfts: OwnedNftsResponse | any

  readonly borrowRate: string
  readonly configuration: string
  readonly debtIndex: string
  readonly debtTokenAddress: string
  readonly depositRate: string
  readonly interestRateCalculatorAddress: string
  readonly tTokenAddress: string
  readonly treasury: string
  readonly lastUpdateTimestamp: number
  readonly liquidityIndex: string

  readonly riskLevel: string
  readonly ethLiquidity: string
  readonly ethDebt: string
  readonly ethCollateral: string
  readonly usedCollateral: boolean
  readonly erc20Ltv: string
  readonly erc721Ltv: string
  readonly decimal: string
  readonly dashboardType: number
  readonly userValues: UserValues
}
export interface TokenDecimals {
  symbol: string
  decimals: number
  balance: string
  ownedNfts: OwnedNftsResponse | any
}

const initialState: ApplicationState = {
  address: localStorage.getItem('address') || '',
  balance: '0',
  nftDebt: '0',
  nftLiquidity: '0',
  userNftConfig: '0',
  nftCollateral: '0',
  ownedNfts: [],

  borrowRate: '0',
  configuration: '0',
  debtIndex: '0',
  debtTokenAddress: '0',
  depositRate: '0',
  interestRateCalculatorAddress: '0',
  tTokenAddress: '0',
  treasury: '0',
  lastUpdateTimestamp: 0,
  liquidityIndex: '0',

  riskLevel: '0',
  ethLiquidity: '0',
  ethDebt: '0',
  ethCollateral: '0',
  usedCollateral: false,
  erc20Ltv: '0',
  erc721Ltv: '0',
  decimal: '18',

  dashboardType: 1,
  userValues: {
    borrowLiquidity: new BigNumber(0),
    NFTLiquidity: new BigNumber(0),
    totalDebt: new BigNumber(0),
    totalCollateral: new BigNumber(0),
  },
}

const applicationSlice = createSlice({
  name: 'application',
  initialState,
  reducers: {
    setAddress(state, action) {
      localStorage.removeItem('address')
      state.address = action.payload
    },
    setAccountBalance(state, action) {
      state.balance = action.payload
    },
    setAccountNfts(state, action) {
      state.ownedNfts = action.payload
    },
    setUserNftValues(state, action) {
      if (action.payload) {
        state.nftLiquidity = action.payload[0]
        state.nftDebt = action.payload[1]
        state.nftCollateral = action.payload[2]
      }
    },
    setReserveData(state, action) {
      if (action.payload) {
        state.borrowRate = action.payload[0]
        state.configuration = action.payload[1]
        state.debtIndex = action.payload[2]
        state.debtTokenAddress = action.payload[3]
        state.depositRate = action.payload[4]
        state.interestRateCalculatorAddress = action.payload[5]
        state.tTokenAddress = action.payload[6]
        state.treasury = action.payload[7]
        state.lastUpdateTimestamp = action.payload[8]
        state.liquidityIndex = action.payload[9]
      }
    },
    setRiskLevel(state, action) {
      if (action.payload) {
        state.riskLevel = action.payload
      }
    },
    setUserNftConfig(state, action) {
      if (action.payload) {
        state.userNftConfig = action.payload
      }
    },
    setUserEthAsset(state, action) {
      if (action.payload) {
        state.ethLiquidity = action.payload[0]
        state.ethDebt = action.payload[1]
        state.ethCollateral = action.payload[2]
      }
    },
    setUsedCollateral(state, action) {
      state.usedCollateral = action.payload
    },
    setErc20Ltv(state, action) {
      state.erc20Ltv = action.payload
    },
    setErc721Ltv(state, action) {
      state.erc721Ltv = action.payload
    },
    setDecimal(state, action) {
      state.decimal = action.payload
    },
    setDashboardType(state, action) {
      state.dashboardType = action.payload
    },
    setUserValues(state, action) {
      state.userValues.borrowLiquidity = action.payload[0]
      state.userValues.NFTLiquidity = action.payload[1]
      state.userValues.totalDebt = action.payload[2]
      state.userValues.totalCollateral = action.payload[3]
    },
  },
})

export const {
  setAddress,
  setAccountBalance,
  setAccountNfts,
  setUserNftValues,
  setUserNftConfig,
  setReserveData,
  setRiskLevel,
  setUserEthAsset,
  setUsedCollateral,
  setErc20Ltv,
  setErc721Ltv,
  setDecimal,
  setDashboardType,
  setUserValues,
} = applicationSlice.actions
export default applicationSlice.reducer
