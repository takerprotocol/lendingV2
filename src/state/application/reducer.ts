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
  readonly address: string
  readonly balance: string
  readonly ownedNfts: OwnedNftsResponse | any
}

export interface TokenDecimals {
  symbol: string
  decimals: number
  balance: string
  ownedNfts: OwnedNftsResponse | any
}

const initialState: ApplicationState = {
  openModal: null,
  address: localStorage.getItem('address') || '',
  balance: '0',
  ownedNfts: [],
}

const applicationSlice = createSlice({
  name: 'application',
  initialState,
  reducers: {
    setOpenModal(state, action) {
      state.openModal = action.payload
    },
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
  },
})

export const { setOpenModal, setAddress, setAccountBalance, setAccountNfts } = applicationSlice.actions
export default applicationSlice.reducer
