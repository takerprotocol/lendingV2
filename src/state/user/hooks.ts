import BigNumber from 'bignumber.js'
import { useCallback, useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from 'state/hooks'
import { erc20ReserveData, userState, UserValues } from 'state/types'
import { decimalFormat, div, minus, plus, times } from 'utils'
import { AppState } from '../index'
import { setAddress } from './reducer'

export function useUpdateAddress(address: string): () => void {
  const dispatch = useAppDispatch()
  return useCallback(() => dispatch(setAddress(address)), [dispatch, address])
}

export function useAccountNfts() {
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
  const value = decimalFormat(times(useUserState().heathFactor, 100), Number(useDecimal()), false)
  if (new BigNumber(value).gt(200)) {
    return '200'
  } else {
    return value
  }
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
  const [borrowLimit, setBorrowLimit] = useState('0')
  const userState = useUserState()
  const userValue = useUserValue()
  useEffect(() => {
    setBorrowLimit(
      decimalFormat(times(userState.loanToValue, plus(userValue.totalCollateral.toString(), value || 0)), 0, false)
    )
  }, [userState.loanToValue, userValue.totalCollateral, value])
  return borrowLimit
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
  const [debtBorrowLimitUsed, setDebtBorrowLimitUsed] = useState('0')
  const borrowLimit = useBorrowLimit()
  const ethDebt = useEthDebt()
  useEffect(() => {
    setDebtBorrowLimitUsed(
      decimalFormat(div(minus(borrowLimit, new BigNumber(ethDebt).plus(value || 0).toNumber()), borrowLimit), 0, false)
    )
  }, [borrowLimit, ethDebt, value])
  return debtBorrowLimitUsed
}

export function useCollateralBorrowLimitUsed(value?: string | number): string {
  const [borrowLimitUsed, setBorrowLimitUsed] = useState('0')
  const ethDebt = useEthDebt()
  const borrowLimit = useBorrowLimit(value || 0)
  useEffect(() => {
    setBorrowLimitUsed(decimalFormat(div(ethDebt, borrowLimit).toString(), 0, false))
  }, [borrowLimit, ethDebt, value])
  return borrowLimitUsed
}
export function useDebtRiskLevel(value?: string | number): string {
  const [debtRiskLevel, setDebtRiskLevel] = useState('200')
  const userValue = useUserValue()
  const userState = useUserState()
  const ethDebt = useEthDebt()
  useEffect(() => {
    const riskLevel = decimalFormat(
      times(div(times(userValue.totalCollateral, userState.liquidationThreshold), plus(ethDebt, value || 0)), 100),
      0,
      false
    )
    if (new BigNumber(riskLevel).gt(200)) {
      setDebtRiskLevel('200')
    } else {
      setDebtRiskLevel(new BigNumber(riskLevel).decimalPlaces(2, 1).toString())
    }
  }, [ethDebt, userState.liquidationThreshold, userValue.totalCollateral, value])
  return debtRiskLevel
}
export function useCollateralRiskLevel(value?: string | number): string {
  const [collateralRiskLevel, setCollateralRiskLevel] = useState('200')
  const userValue = useUserValue()
  const userState = useUserState()
  const ethDebt = useEthDebt()
  useEffect(() => {
    if (new BigNumber(ethDebt).lte(0)) {
      setCollateralRiskLevel('200')
    } else {
      const riskLevel = times(plus(userValue.totalCollateral, value || 0), div(userState.liquidationThreshold, ethDebt))
      if (new BigNumber(riskLevel).lt(200)) {
        setCollateralRiskLevel(decimalFormat(times(riskLevel, 100), 0, false))
      }
    }
  }, [ethDebt, userState.liquidationThreshold, userValue.totalCollateral, value])
  return collateralRiskLevel
}
export function useCollateralsType(): string {
  return useAppSelector((state: AppState) => state.user.collateralsType)
}
export function useMobileMenuType(): boolean {
  return useAppSelector((state: AppState) => state.user.mobileMenuType)
}
export function useMobileType(): boolean {
  return useAppSelector((state: AppState) => state.user.mobileType)
}
