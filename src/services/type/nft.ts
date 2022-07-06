export interface NftTokenModel {
  tokenId: string
  tokenType: string
  contract: { address: string }
  media: [
    {
      raw: string
      gateway: string
    }
  ]
  title: string
  description: string
  timeLastUpdated: string
  rawMetadata: {
    name: string
    description: string
    image: string
  }
  tokenUri: {
    raw: string
    gateway: string
  }
  balance: number
}
