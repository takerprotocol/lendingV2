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
  readonly balance: number
}

export interface TokenDecimals {
  symbol: string
  decimals: number
  balance: number
}

const initialState: ApplicationState = {
  openModal: null,
  address: localStorage.getItem('address') || '',
  balance: 0,
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
    setWalletBalance(state, action) {
      state.balance = action.payload
    },
  },
})

export const { setOpenModal, setAddress, setWalletBalance } = applicationSlice.actions
export default applicationSlice.reducer
