import { Web3Provider } from '@ethersproject/providers'
import { MaxUint256 } from '@ethersproject/constants'

import ERC20_ABI from 'abis/erc20.json'
import { AccountType } from './type'

import { getContract } from 'utils'

export async function fetchAllowance(
  provider: Web3Provider,
  tokenAddress: string,
  owner: AccountType,
  spender: string
) {
  const contract = getContract(tokenAddress, ERC20_ABI, provider)
  return contract.allowance(owner, spender)
}
export async function approveMax(
  provider: Web3Provider,
  contractAddress: string,
  owner: AccountType,
  account: AccountType
) {
  if (account && owner) {
    const contract = getContract(owner, ERC20_ABI, provider, account)
    return contract.approve(contractAddress, MaxUint256.toString())
  }
}
