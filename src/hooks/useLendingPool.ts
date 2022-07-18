import lendingPoolAbi from 'abis/ILendingPool.json'
import ILendingPoolAddressesProviderAbi from 'abis/ILendingPoolAddressesProvider.json'
import { useContract } from 'hooks/useContract'
import { useEffect, useState } from 'react'

export function useLendingPool() {
  const [address, setAddress] = useState('')
  const contract = useContract(process.env.REACT_APP_PROXY_ADDRESSES_PROVIDER, ILendingPoolAddressesProviderAbi)
  const lendingPoolContract = useContract(address, lendingPoolAbi)
  useEffect(() => {
    if (contract && !address) {
      contract.getLendingPool().then((res: string) => {
        if (res) {
          setAddress(res)
        }
      })
    }
  }, [contract, address])
  return lendingPoolContract
}