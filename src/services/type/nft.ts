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

export interface CollateralModel {
  address: string
  collateral: string
  collections: Array<CollectionsModel>
  debt: string
  riskPercentage: string
  riskLevel: string
  riskLevelTag?: string
}

export interface CollectionsModel {
  id: string
  collection: CollectionModel
  tokens: Array<TokenModel>
}

export interface CollectionModel {
  id: string
  tNFT: string
  ercType: string
  liqThreshold: string
  ltv: string
  name: string
  symbol: string
  floorPrice: string
}

export interface TokenModel {
  id: string
  amount: string
}
