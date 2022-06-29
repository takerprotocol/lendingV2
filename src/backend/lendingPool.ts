// eslint-disable-next-line no-restricted-imports
import { Signer, Contract, ContractInterface } from 'ethers'
import { Web3Provider } from '@ethersproject/providers'
import lendingPoolAbi from '../abis/ILendingPool.json'

interface Deps {
  provider: Web3Provider
  chainId: number
  lendingPool: string
}

export class LendingPool {
  private contract?: Contract
  private chainId?: number
  private lendingPool: string
  static signer: Signer

  constructor({ lendingPool }: Deps) {
    this.lendingPool = lendingPool
    this.getContract = this.getContract.bind(this)
  }

  static async build({ provider, chainId, lendingPool }: Deps) {
    this.signer = await provider.getSigner(chainId)
    return new LendingPool({ provider, chainId, lendingPool })
  }

  async getContract(): Promise<Contract> {
    if (this.contract && (await this.contract.signer.getChainId()) === this.chainId) {
      return this.contract
    }

    if (!this.lendingPool) {
      throw new Error('LendingPool address not provided. Please set the LENDING_POOL_ADDRESS env')
    }

    this.contract = new Contract(this.lendingPool, lendingPoolAbi as ContractInterface).connect(LendingPool.signer)

    return this.contract
  }
}
