import lendingPoolAbi from 'abis/ILendingPool.json'
import ILendingPoolAddressesProviderAbi from 'abis/ILendingPoolAddressesProvider.json'
import { useContract } from 'hooks/useContract'
import { useEffect, useState } from 'react'
import { useAddress } from 'state/user/hooks'
import { useActiveWeb3React } from './web3'
import { getProxyAddressesProvider } from 'config'

export function useLendingPool() {
  const [address, setAddress] = useState('')
  const { chainId } = useActiveWeb3React()
  const account = useAddress()
  const contract = useContract(getProxyAddressesProvider(chainId), ILendingPoolAddressesProviderAbi)
  const lendingPoolContract = useContract(address, lendingPoolAbi)
  useEffect(() => {
    if (contract && !address) {
      contract.getLendingPool().then((res: string) => {
        if (res) {
          setAddress(res)
        }
      })
    }
  }, [contract, address, account, chainId])
  return lendingPoolContract
}
