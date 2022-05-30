import { Contract } from '@ethersproject/contracts'
import { useMemo } from 'react'
import { getContract } from 'utils'

import ERC20_ABI from 'abis/erc20.json'
import IGO_ABI from 'abis/igo.json'
import MULTICALL2_ABI from 'abis/multicall2.json'

import { Erc20 } from '../abis/types'
import { useActiveWeb3React } from './web3'

// returns null on errors
export function useContract<T extends Contract = Contract>(
  addressOrAddressMap: string | { [chainId: number]: string } | undefined,
  ABI: any,
  withSignerIfPossible = true
): T | null {
  const { library, account, chainId } = useActiveWeb3React()

  return useMemo(() => {
    if (!addressOrAddressMap || !ABI || !library || !chainId) return null
    let address: string | undefined
    if (typeof addressOrAddressMap === 'string') address = addressOrAddressMap
    else address = addressOrAddressMap[chainId]
    if (!address) return null
    try {
      return getContract(address, ABI, library, withSignerIfPossible && account ? account : undefined)
    } catch (error) {
      console.error('Failed to get contract', error)
      return null
    }
  }, [addressOrAddressMap, ABI, library, chainId, withSignerIfPossible, account]) as T
}

export function useTokenContract(tokenAddress?: string, withSignerIfPossible?: boolean) {
  return useContract<Erc20>(tokenAddress, ERC20_ABI, withSignerIfPossible)
}

export function useIGOContract(tokenAddress?: string, withSignerIfPossible?: boolean) {
  return useContract(tokenAddress, IGO_ABI, withSignerIfPossible)
}

export function useMulticall2Contract(tokenAddress?: string, withSignerIfPossible?: boolean) {
  return useContract(tokenAddress, MULTICALL2_ABI, withSignerIfPossible)
}
