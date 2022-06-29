// eslint-disable-next-line no-restricted-imports
import { ethers } from 'ethers'
import { Web3Provider } from '@ethersproject/providers'
import lendingPoolAbi from '../abis/ILendingPool.json'

export class LendingPool {
  private contract?: ethers.Contract

  async getContract(chainId: number, provider: Web3Provider): Promise<ethers.Contract> {
    if (this.contract && (await this.contract.signer.getChainId()) === chainId) {
      return this.contract
    }

    const signer = await provider.getSigner(chainId)

    const lendingPoolAddress = process.env.LENDING_POOL_ADDRESS

    if (!lendingPoolAddress) {
      throw new Error('LendingPool address not provided. Please set the LENDING_POOL_ADDRESS env')
    }

    this.contract = new ethers.Contract(lendingPoolAddress, lendingPoolAbi as ethers.ContractInterface).connect(signer)

    return this.contract
  }
}
