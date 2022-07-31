import { OwnedNftsResponse } from '@alch/alchemy-sdk'
import { useCallback } from 'react'
import { useAppDispatch, useAppSelector } from 'state/hooks'
import { erc20ReserveData, userState, UserValues } from 'state/types'
import { decimalFormat, div, plus, times } from 'utils'
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
export function useHeath(): string {
  return decimalFormat(useUserState().heathFactor, Number(useDecimal()), false)
}
export function useEthCollateral(): string {
  return useAppSelector((state: AppState) => state.user.ethCollateral)
}
export function useEthLiquidity(): string {
  return useAppSelector((state: AppState) => state.user.ethLiquidity)
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
export function useDecimal(): number {
  return useAppSelector((state: AppState) => state.user.decimal)
}
export function useBorrowLimit(value?: string | number): string {
  return times(useUserState().loanToValue, plus(useUserValue().totalCollateral, value || 0))
}
export function useDashboardType(): number {
  return useAppSelector((state: AppState) => state.user.dashboardType)
}
export function useUserValue(): UserValues {
  return useAppSelector((state: AppState) => state.user.userValues)
}
export function useErc20ReserveData(): erc20ReserveData {
  return useAppSelector((state: AppState) => state.user.erc20ReserveData)
}
export function useUserState(): userState {
  return useAppSelector((state: AppState) => state.user.userState)
}
export function useDebtBorrowLimitUsed(value?: string | number): string {
  return div(plus(useEthDebt(), value || 0), useBorrowLimit())
}
export function useCollateralBorrowLimitUsed(value?: string | number): string {
  return div(useEthDebt(), useBorrowLimit(value || 0))
}
export function useDebtRiskLevel(value?: string | number): string {
  return div(times(useUserValue().totalCollateral, useUserState().liquidationThreshold), plus(useEthDebt(), value || 0))
}
export function useCollateralRiskLevel(value?: string | number): string {
  return times(plus(useUserValue().totalCollateral, value || 0), div(useUserState().liquidationThreshold, useEthDebt()))
}
