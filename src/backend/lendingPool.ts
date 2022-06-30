// eslint-disable-next-line no-restricted-imports
import { Signer, Contract, ContractInterface } from 'ethers'
import lendingPoolAbi from '../abis/ILendingPool.json'

interface Deps {
  signer: Signer
  chainId: number
  lendingPool: string
}

export class LendingPool {
  private contract?: Contract
  private chainId?: number
  private lendingPool: string
  private signer: Signer

  constructor({ lendingPool, chainId, signer }: Deps) {
    this.lendingPool = lendingPool
    this.chainId = chainId
    this.signer = signer
    this.getContract = this.getContract.bind(this)
  }

  async getContract(): Promise<Contract> {
    if (this.contract && (await this.contract.signer.getChainId()) === this.chainId) {
      return this.contract
    }

    if (!this.lendingPool) {
      throw new Error('LendingPool address not provided. Please set the LENDING_POOL_ADDRESS env')
    }

    this.contract = new Contract(this.lendingPool, lendingPoolAbi as ContractInterface).connect(this.signer)

    return this.contract
  }
}
