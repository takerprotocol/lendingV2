import request from 'services/request'

export function getCollectionInfo(address: string) {
  return request.get(`https://api-rinkeby.looksrare.org/api/v1/collections?address=${address}`)
}

export function getCollectionStats(address: string) {
  return request.get(`https://api-rinkeby.looksrare.org/api/v1/collections/stats?address=${address}`)
}
