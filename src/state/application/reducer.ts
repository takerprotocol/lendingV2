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
}

export interface TokenDecimals {
  symbol: string
  decimals: number
  balance: string
}

const initialState: ApplicationState = {
  openModal: null,
  address: localStorage.getItem('address') || '',
  balance: '0',
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
  },
})

export const { setOpenModal, setAddress, setAccountBalance } = applicationSlice.actions
export default applicationSlice.reducer
