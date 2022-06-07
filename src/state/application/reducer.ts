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
}

export interface TokenDecimals {
  symbol: string
  decimals: number
}

const initialState: ApplicationState = {
  openModal: null,
  address: localStorage.getItem('address') || '',
}

const applicationSlice = createSlice({
  name: 'application',
  initialState,
  reducers: {
    setOpenModal(state, action) {
      state.openModal = action.payload
    },
    setAddress(state, action) {
      state.address = action.payload
    },
  },
})

export const { setOpenModal, setAddress } = applicationSlice.actions
export default applicationSlice.reducer
