import { Contract, Provider } from 'ethcall'
import { Web3Provider } from '@ethersproject/providers'
import { getDefaultProvider } from 'utils'
// InfuraProvider,
// const infuraKey = process.env.REACT_APP_INFURA_KEY
// const provider = new InfuraProvider('mainnet', infuraKey)
export interface Call {
  address: string // Address of the contract
  name: string // Function name on the contract (exemple: balanceOf)
  symbol?: string // Function name on the contract (exemple: balanceOf)
  params?: string[] // Function params
}

const multiCall = async (abi: any[], calls: Call[], library?: Web3Provider) => {
  const ethCallProvider = new Provider()
  const provider = getDefaultProvider()
  // @ts-ignore
  if (provider) {
    await ethCallProvider.init(library ? library : provider)
  }
  try {
    // @ts-ignore
    return await ethCallProvider.all(calls.map((el) => new Contract(el.address, abi)[el.name](...el.params)))
  } catch (e) {
    console.log('合约执行出错', e.message)
    return null
  }
}
export default multiCall
