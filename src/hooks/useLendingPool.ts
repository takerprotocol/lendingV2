import lendingPoolAbi from 'abis/ILendingPool.json'
import ILendingPoolAddressesProviderAbi from 'abis/ILendingPoolAddressesProvider.json'
import { useContract } from 'hooks/useContract'
import { useEffect, useState } from 'react'
import { useAddress } from 'state/user/hooks'

export function useLendingPool() {
  const [address, setAddress] = useState('')
  const account = useAddress()
  const contract = useContract(process.env.REACT_APP_PROXY_ADDRESSES_PROVIDER, ILendingPoolAddressesProviderAbi)
  const lendingPoolContract = useContract(address, lendingPoolAbi)
  useEffect(() => {
    if (contract && !address && account) {
      contract.getLendingPool().then((res: string) => {
        if (res) {
          setAddress(res)
        }
      })
    }
  }, [contract, address, account])
  return lendingPoolContract
}
