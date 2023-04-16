import request from 'services/request'

export function getCollectionInfo(address: string, chainId?: number | null) {
  const api = chainId === 4 ? 'rinkeby' : chainId === 5 ? 'goerli' : chainId === 42 ? 'kovan' : 'mainnet'
  return request.get(`https://api-${api}.looksrare.org/api/v1/collections?address=${address}`)
}

export function getCollectionStats(address: string, chainId?: number | null) {
  const api = chainId === 4 ? 'rinkeby' : chainId === 5 ? 'goerli' : chainId === 42 ? 'kovan' : 'mainnet'
  return request.get(`https://api-${api}.looksrare.org/api/v1/collections/stats?address=${address}`)
}
export function getImageUrl(address: string, tokenId: string) {
  return request.get(`http://18.166.27.175/ImageUrl/${address}/${tokenId}`)
}
export function getMultipleAddress(address: Array<string>, tokenId: any) {
  return request.get(`http://18.166.27.175/multipleAddress/[${address}]/[${tokenId}]`)
}
export function getMultipleTokenId(address: string, tokenId: any) {
  return request.get(`http://18.166.27.175/multipleTokenId/${address}/[${tokenId}]`)
}
export function getContractInsert(address: string) {
  return request.post(`http://18.166.27.175/contractInsert/${address}`)
}
