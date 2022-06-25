import axios from 'axios'
import { chainAlchemyList } from 'constants/chains'

const apiKey = process.env.REACT_APP_ALCHEMY_KEY

export const getNFTs = async (owner: string, chainId: number) => {
  try {
    const baseURL = `${chainAlchemyList[chainId]}${apiKey}`
    let response = await axios({ method: 'get', url: `${baseURL}/getNFTs/?owner=${owner}` })
    response = response.data
    return response
  } catch (error: any) {
    console.error(`Error fetching nfts for address ${owner} on network with id ${chainId}`)
    console.error(error)
    return null
  }
}
