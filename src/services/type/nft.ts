import { Nft } from '@alch/alchemy-sdk'

export interface NftTokenModel {
  [x: string]: any
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
  type: string
  tokens: LiquidationNftModel[]
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

export interface LiquidationNftModel extends Nft {
  symbol: string
}
