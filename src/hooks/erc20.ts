import { useState, useMemo } from 'react'
import { useWeb3React } from '@web3-react/core'
import { formatUnits } from '@ethersproject/units'
import ERC20_ABI from 'abis/erc20.json'
import usePrevious from 'hooks/usePrevious'
import { fetchAllowance } from 'constants/erc20'

import { getContract } from 'utils'

export function useTokenBalance(token: string) {
  const [balance, setBalance] = useState<string>()
  const { library, account } = useWeb3React()
  const _contarct = getContract(token, ERC20_ABI, library)
  const previousBalance = usePrevious(balance)
  // const decimal = useTokenDecimal(token)
  useMemo(() => {
    async function getBalance() {
      const result = await _contarct.balanceOf(account)
      if (!previousBalance) {
        const val = formatUnits(result)
        setBalance(val)
      }
    }
    getBalance()
  }, [_contarct, account, previousBalance])
  return balance
}

export function useTokenDecimal(token: string) {
  const [decimals, setDcimals] = useState<number>()
  const { library } = useWeb3React()
  const _contarct = getContract(token, ERC20_ABI, library)
  const previousDecimal = usePrevious(decimals)
  useMemo(() => {
    async function getDecimal() {
      const result = await _contarct.decimals()
      if (!previousDecimal) {
        setDcimals(result)
      }
    }
    getDecimal()
  }, [_contarct, previousDecimal])
  return decimals
}

export function useAllowance(owner: string, poolAddr: string) {
  const [allowance, setAllowance] = useState<string>()
  const { library, account } = useWeb3React()
  const previousAllowance = usePrevious(allowance)
  useMemo(() => {
    async function getData() {
      const result = await fetchAllowance(library, owner, account, poolAddr)
      if (!previousAllowance) {
        const val = formatUnits(result)
        setAllowance(val)
      }
    }
    if (account !== undefined) {
      getData()
    }
  }, [previousAllowance, account, library, owner, poolAddr])
  return allowance
}
