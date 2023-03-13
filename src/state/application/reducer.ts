import { OwnedNftsResponse } from '@alch/alchemy-sdk'
import { createSlice } from '@reduxjs/toolkit'

export type PopupContent = {
  txn: {
    hash: string
  }
}

export enum ApplicationModal {
  WALLET,
}

export interface ApplicationState {
  readonly openModal: ApplicationModal | null
  poolValues: string[]
  collections: any[]
  depositedCollection: any[]
  loading: boolean
  showChangeNetWork: boolean
}

export interface TokenDecimals {
  symbol: string
  decimals: number
  balance: string
  ownedNfts: OwnedNftsResponse | any
}

const initialState: ApplicationState = {
  openModal: null,
  poolValues: ['0', '0', '0'],
  collections: [],
  depositedCollection: [],
  loading: true,
  showChangeNetWork: false,
}

const applicationSlice = createSlice({
  name: 'application',
  initialState,
  reducers: {
    setOpenModal(state, action) {
      state.openModal = action.payload
    },
    setPoolValues(state, action) {
      state.poolValues = action.payload
    },
    setCollections(state, action) {
      state.collections = action.payload
    },
    setDepositedCollection(state, action) {
      state.depositedCollection = action.payload
    },
    setLoading(state, action) {
      state.loading = action.payload
    },
    setShowChangeNetWork(state, action) {
      state.showChangeNetWork = action.payload
    },
  },
})

export const { setOpenModal, setPoolValues, setCollections, setDepositedCollection, setLoading, setShowChangeNetWork } =
  applicationSlice.actions
export default applicationSlice.reducer
