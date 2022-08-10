import WETHGatewayAbi from 'abis/WETHGateway.json'
import { GATEWAY_ADDRESSES } from 'config'
import { useContract } from './useContract'

export function useGateway() {
  return useContract(GATEWAY_ADDRESSES, WETHGatewayAbi)
}
