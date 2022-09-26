import request from 'services/request'

export function getCollectionInfo(address: string, chainId?: number | null) {
  const api = chainId === 4 ? 'rinkeby' : chainId === 5 ? 'goerli' : chainId === 42 ? 'kovan' : 'mainnet'
  return request.get(`https://api-${api}.looksrare.org/api/v1/collections?address=${address}`)
}

export function getCollectionStats(address: string, chainId?: number | null) {
  const api = chainId === 4 ? 'rinkeby' : chainId === 5 ? 'goerli' : chainId === 42 ? 'kovan' : 'mainnet'
  return request.get(`https://api-${api}.looksrare.org/api/v1/collections/stats?address=${address}`)
}
