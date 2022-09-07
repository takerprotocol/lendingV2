import WETHGatewayAbi from 'abis/WETHGateway.json'
import { getGatewayAddresses } from 'config'
import { useContract } from './useContract'
import { useActiveWeb3React } from './web3'

export function useGateway() {
  const { chainId } = useActiveWeb3React()
  return useContract(getGatewayAddresses(chainId), WETHGatewayAbi)
}
