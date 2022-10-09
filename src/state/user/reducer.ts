import { OwnedNft, OwnedNftsResponse } from '@alch/alchemy-sdk'
import { createSlice } from '@reduxjs/toolkit'
import { UserValues, erc20ReserveData, userState } from 'state/types'

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
  readonly ownedNfts: OwnedNft[]
  readonly ethLiquidity: string
  readonly collateralsType: string
  readonly ethDebt: string
  readonly ethCollateral: string
  readonly usedCollateral: boolean
  readonly erc20Ltv: string
  readonly erc721Ltv: string
  readonly decimal: number
  readonly dashboardType: number
  readonly userValues: UserValues
  readonly erc20ReserveData: erc20ReserveData
  readonly userState: userState
  readonly mobileMenuType: boolean
  readonly mobileType: boolean
  readonly loginWalletType: boolean
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
  ethLiquidity: '0',
  ethDebt: '0',
  ethCollateral: '0',
  usedCollateral: false,
  erc20Ltv: '0',
  erc721Ltv: '0',
  collateralsType: 'All Borrowers',
  decimal: 18,
  dashboardType: 1,
  userValues: {
    borrowLiquidity: '0',
    NFTLiquidity: '0',
    totalDebt: '0',
    totalCollateral: '0',
  },
  erc20ReserveData: {
    borrowRate: '0',
    configuration: '0',
    debtIndex: '0',
    debtTokenAddress: '0',
    depositRate: '0',
    interestRateCalculatorAddress: '0',
    tTokenAddress: '0',
    treasury: '0',
    lastUpdateTimestamp: '0',
    liquidityIndex: '0',
  },
  userState: {
    loanToValue: '0',
    liquidationThreshold: '0',
    heathFactor: '0',
  },
  mobileMenuType: true,
  mobileType: false,
  loginWalletType: true,
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
        state.erc20ReserveData = action.payload
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
    setUserState(state, action) {
      state.userState = action.payload
    },
    setUserValues(state, action) {
      if (action.payload) {
        state.userValues = action.payload
        // state.userValues.borrowLiquidity = new BigNumber(action.payload[0].toString())
        // state.userValues.NFTLiquidity = new BigNumber(action.payload[1].toString())
        // state.userValues.totalDebt = new BigNumber(action.payload[2].toString())
        // state.userValues.totalCollateral = new BigNumber(action.payload[3].toString())
      }
    },
    setCollateralsType(state, action) {
      state.collateralsType = action.payload
    },
    setMobileType(state, action) {
      state.mobileType = action.payload
    },
    setMobileMenuType(state, action) {
      state.mobileMenuType = action.payload
    },
    setLoginWalletType(state, action) {
      state.loginWalletType = action.payload
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
  setUserState,
  setUserEthAsset,
  setUsedCollateral,
  setErc20Ltv,
  setErc721Ltv,
  setDecimal,
  setDashboardType,
  setUserValues,
  setCollateralsType,
  setMobileType,
  setMobileMenuType,
  setLoginWalletType,
} = applicationSlice.actions
export default applicationSlice.reducer
