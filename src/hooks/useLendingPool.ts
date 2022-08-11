import lendingPoolAbi from 'abis/ILendingPool.json'
import ILendingPoolAddressesProviderAbi from 'abis/ILendingPoolAddressesProvider.json'
import { CHAIN_ID } from 'config'
import { useContract } from 'hooks/useContract'
import { useEffect, useState } from 'react'
import { useAddress } from 'state/user/hooks'
import { useActiveWeb3React } from './web3'
import { PROXY_ADDRESSES_PROVIDER } from 'config'

export function useLendingPool() {
  const [address, setAddress] = useState('')
  const { chainId } = useActiveWeb3React()
  const account = useAddress()
  const contract = useContract(PROXY_ADDRESSES_PROVIDER, ILendingPoolAddressesProviderAbi)
  const lendingPoolContract = useContract(address, lendingPoolAbi)
  useEffect(() => {
    if (contract && !address && account && chainId === CHAIN_ID) {
      contract.getLendingPool().then((res: string) => {
        console.log(res)
        if (res) {
          setAddress(res)
        }
      })
    }
  }, [contract, address, account, chainId])
  return lendingPoolContract
}
