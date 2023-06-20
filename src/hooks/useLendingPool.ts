import lendingPoolAbi from 'abis/ILendingPool.json'
import ILendingPoolAddressesProviderAbi from 'abis/ILendingPoolAddressesProvider.json'
import AddressesProviderRegistryAbi from 'abis/TakerAddressesProviderRegistry.json'
import { useContract } from 'hooks/useContract'
import { useEffect, useState } from 'react'
import { useAddress, useDashboardType } from 'state/user/hooks'
import { useActiveWeb3React } from './web3'
import { getProxyAddressesRegistry } from 'config'
// eslint-disable-next-line no-restricted-imports
import { ethers } from 'ethers'
// import { getProxyAddressesProvider, getProxyAddressesRegistry } from 'config'

export function useLendingPool(poolType?: string) {
  const [address, setAddress] = useState('')
  const [addressProvider, setAddressProvider] = useState('')
  const dashboardType = useDashboardType()
  const { chainId } = useActiveWeb3React()
  const account = useAddress()
  const contract = useContract(getProxyAddressesRegistry(chainId), AddressesProviderRegistryAbi)
  const providerContract = useContract(addressProvider, ILendingPoolAddressesProviderAbi)
  useEffect(() => {
    if (contract) {
      contract
        .getAddressProvider(ethers.utils.formatBytes32String(poolType ? poolType : dashboardType === 1 ? 'bluechip' : 'growth'))
        .then((res: any) => {
          setAddressProvider(res)
        })
    }
  }, [contract, dashboardType])
  const lendingPoolContract = useContract(address, lendingPoolAbi)
  useEffect(() => {
    if (providerContract) {
      if (chainId === 5) {
        providerContract.getLendingPool().then((res: string) => {
          if (res) {
            setAddress(res)
          }
        })
      }
    }
  }, [providerContract, address, account, chainId, providerContract?.address])
  return lendingPoolContract
}
