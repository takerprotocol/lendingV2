import BigNumber from 'bignumber.js'
import { useCallback, useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from 'state/hooks'
import { erc20ReserveData, userState, UserValues } from 'state/types'
import { decimalFormat, div, plus, times } from 'utils'
import { AppState } from '../index'
import { setAddress } from './reducer'
import numbro from 'numbro'

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
  const heathFactor = useUserState().heathFactor
  const decimal = useDecimal()
  if (heathFactor === '115792089237316195423570985008687907853269984665640564039457584007913129639935') {
    return '∞'
  } else {
    const value = decimalFormat(times(heathFactor, 100), Number(decimal), false)
    if (new BigNumber(value).gt(1000000)) {
      return '>1M'
    } else {
      return numbro(value).format({ spaceSeparated: true, average: true }).replace(' ', '')
    }
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
    setBorrowLimit(times(userState.loanToValue, plus(userValue.totalCollateral.toString(), value || 0)))
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
    setDebtBorrowLimitUsed(div(new BigNumber(ethDebt).plus(value || 0).toNumber(), borrowLimit))
  }, [borrowLimit, ethDebt, value])
  return times(debtBorrowLimitUsed, 100)
}

export function useCollateralBorrowLimitUsed(value?: string | number): string {
  const [borrowLimitUsed, setBorrowLimitUsed] = useState('0')
  const ethDebt = useEthDebt()
  const borrowLimit = useBorrowLimit(value || 0)
  useEffect(() => {
    setBorrowLimitUsed(div(ethDebt, borrowLimit).toString())
  }, [borrowLimit, ethDebt, value])
  return times(borrowLimitUsed, 100)
}
export function useDebtRiskLevel(value?: string | number): string {
  const [debtRiskLevel, setDebtRiskLevel] = useState('∞')
  const userValue = useUserValue()
  const userState = useUserState()
  const ethDebt = useEthDebt()
  useEffect(() => {
    if (plus(ethDebt, value || 0) === '0') {
      setDebtRiskLevel('∞')
    } else {
      const riskLevel = decimalFormat(
        times(div(times(userValue.totalCollateral, userState.liquidationThreshold), plus(ethDebt, value || 0)), 100),
        0,
        false
      )
      if (new BigNumber(riskLevel).gt(10000000)) {
        setDebtRiskLevel('>1M')
      } else {
        setDebtRiskLevel(numbro(riskLevel).format({ spaceSeparated: true, average: true }).replace(' ', ''))
      }
    }
  }, [ethDebt, userState.liquidationThreshold, userValue.totalCollateral, value])
  return debtRiskLevel
}
export function useCollateralRiskLevel(value?: string | number): string {
  const [collateralRiskLevel, setCollateralRiskLevel] = useState('∞')
  const userValue = useUserValue()
  const userState = useUserState()
  const ethDebt = useEthDebt()
  useEffect(() => {
    if (new BigNumber(ethDebt).lte(0)) {
      setCollateralRiskLevel('∞')
    } else {
      const riskLevel = times(plus(userValue.totalCollateral, value || 0), div(userState.liquidationThreshold, ethDebt))
      if (new BigNumber(riskLevel).lt(10000000)) {
        setCollateralRiskLevel(
          numbro(times(riskLevel, 100)).format({ spaceSeparated: true, average: true }).replace(' ', '')
        )
      } else {
        setCollateralRiskLevel('>1M')
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
export function useLoginWalletType(): boolean {
  return useAppSelector((state: AppState) => state.user.loginWalletType)
}
export function useMobileSecondHeaderName(): string {
  return useAppSelector((state: AppState) => state.user.mobileSecondHeaderName)
}
