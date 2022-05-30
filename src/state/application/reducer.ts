import { createSlice } from '@reduxjs/toolkit'

export type PopupContent = {
  txn: {
    hash: string
  }
}

export enum ApplicationModal {
  WALLET,
  STAKE_CONFIRMATION,
  CONFIRM_ORDER,
  CONFIRM,
  TIPS_ALERT,
  WALLET_NEW_CRYPTO,
  WITHDRAWAL_APPLICATION,
  WALLET_RECHARGE,
  NFT_FRAGMENT_COMPOUND,
}

export interface ApplicationState {
  readonly openModal: ApplicationModal | null
}

export interface TokenDecimals {
  symbol: string
  decimals: number
}

const initialState: ApplicationState = {
  openModal: null,
}

const applicationSlice = createSlice({
  name: 'application',
  initialState,
  reducers: {
    setOpenModal(state, action) {
      state.openModal = action.payload
    },
  },
})

export const { setOpenModal } = applicationSlice.actions
export default applicationSlice.reducer
