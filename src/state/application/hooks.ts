import { OwnedNftsResponse } from '@alch/alchemy-sdk'
import { useCallback } from 'react'
import { useAppDispatch, useAppSelector } from 'state/hooks'
import { AppState } from '../index'
import { ApplicationModal, setAddress, setOpenModal } from './reducer'

export function useModalOpen(modal: ApplicationModal): boolean {
  const openModal = useAppSelector((state: AppState) => state.application.openModal)
  return openModal === modal
}

export function useToggleModal(modal: ApplicationModal): () => void {
  const open = useModalOpen(modal)
  const dispatch = useAppDispatch()
  return useCallback(() => dispatch(setOpenModal(open ? null : modal)), [dispatch, modal, open])
}

export function useWalletModalToggle(): () => void {
  return useToggleModal(ApplicationModal.WALLET)
}

export function useAccountNfts(): OwnedNftsResponse | any {
  return useAppSelector((state: AppState) => state.application.ownedNfts)
}

export function useAddress(): string {
  return useAppSelector((state: AppState) => state.application.address)
}

export function useWalletBalance(): string {
  return useAppSelector((state: AppState) => state.application.balance)
}

export function useUpdateAddress(address: string): () => void {
  const dispatch = useAppDispatch()
  return useCallback(() => dispatch(setAddress(address)), [dispatch, address])
}
