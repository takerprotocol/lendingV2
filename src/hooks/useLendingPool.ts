import lendingPoolAbi from 'abis/ILendingPool.json'
import ILendingPoolAddressesProviderAbi from 'abis/ILendingPoolAddressesProvider.json'
import { useContract } from 'hooks/useContract'
import { useEffect, useState } from 'react'

export function useLendingPool() {
  const [address, setAddress] = useState('')
  const contract = useContract(process.env.REACT_APP_PROXY_ADDRESSES_PROVIDER, ILendingPoolAddressesProviderAbi)
  const lendingPoolContract = useContract('0x6898525468568BCd2B0a979690Ac690cAdC79BCd', lendingPoolAbi)
  useEffect(() => {
    if (contract && !address) {
      contract.getLendingPool().then((res: string) => {
        if (res) {
          console.log(res)
          setAddress(res)
        }
      })
    }
  }, [contract, address])
  return lendingPoolContract
}
