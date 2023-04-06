import WETHGatewayAbi from 'abis/WETHGateway.json'
import PunkGatewayAbi from 'abis/PunkGateway.json'
import { getGatewayAddresses, getPunkGatewayAddresses } from 'config'
import { useContract } from './useContract'
import { useActiveWeb3React } from './web3'

export function useGateway() {
  const { chainId } = useActiveWeb3React()
  return useContract(getGatewayAddresses(chainId), WETHGatewayAbi)
}

export function usePunkGateway() {
  const { chainId } = useActiveWeb3React()
  return useContract(getPunkGatewayAddresses(chainId), PunkGatewayAbi)
}
