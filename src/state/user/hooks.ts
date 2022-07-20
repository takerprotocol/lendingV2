import { OwnedNftsResponse } from '@alch/alchemy-sdk'
import BigNumber from 'bignumber.js'
import { useCallback } from 'react'
import { useAppDispatch, useAppSelector } from 'state/hooks'
import { AppState } from '../index'
import { setAddress } from './reducer'

export function useUpdateAddress(address: string): () => void {
  const dispatch = useAppDispatch()
  return useCallback(() => dispatch(setAddress(address)), [dispatch, address])
}

export function useAccountNfts(): OwnedNftsResponse | any {
  return useAppSelector((state: AppState) => state.user.ownedNfts)
}

export function useAddress(): string {
  return useAppSelector((state: AppState) => state.user.address)
}

export function useWalletBalance(): string {
  return useAppSelector((state: AppState) => state.user.balance)
}

export function useNftDebt(): string {
  return useAppSelector((state: AppState) => state.user.nftDebt)
}

export function useNftLiquidity(): string {
  return useAppSelector((state: AppState) => state.user.nftLiquidity)
}

export function useNftCollateral(): string {
  return useAppSelector((state: AppState) => state.user.nftCollateral)
}

export function useUserNftConfig(): string {
  return useAppSelector((state: AppState) => state.user.userNftConfig)
}
export function useBorrowRate(): string {
  return useAppSelector((state: AppState) => state.user.borrowRate)
}
export function useDepositRate(): string {
  return useAppSelector((state: AppState) => state.user.depositRate)
}
export function useRiskLevel(): string {
  return useAppSelector((state: AppState) => state.user.riskLevel)
}
export function useDebtIndex(): string {
  return useAppSelector((state: AppState) => state.user.debtIndex)
}
export function useEthCollateral(): string {
  return useAppSelector((state: AppState) => state.user.ethCollateral)
}
export function useEthDebt(): string {
  return useAppSelector((state: AppState) => state.user.ethDebt)
}
export function useUsedCollateral(): boolean {
  return useAppSelector((state: AppState) => state.user.usedCollateral)
}

export function useErc20Ltv(): string {
  return useAppSelector((state: AppState) => state.user.erc20Ltv)
}
export function useErc721Ltv(): string {
  return useAppSelector((state: AppState) => state.user.erc721Ltv)
}
export function useDecimal(): string {
  return useAppSelector((state: AppState) => state.user.decimal)
}
export function useBorrowLimit(): string {
  return new BigNumber(useErc20Ltv())
    .times(useEthCollateral())
    .plus(new BigNumber(useErc721Ltv()).times(useNftCollateral()))
    .toString()
}
