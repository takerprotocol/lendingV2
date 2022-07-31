import gql from 'graphql-tag'

export const LendingPool = (id: string) => {
  const queryString = `
    query lendingPool {
      lendingPool(id: "${id}") {
        id
        nfts {
          id
          tNFT
          ercType
          liqThreshold
          ltv
        }
      }
    }
  `
  return gql(queryString)
}

export const NftCollection = (id: string) => {
  const queryString = `
    query nftCollection {
      nftCollection(id: "${id}") {
        id
        tNFT
        ercType
        liqThreshold
        ltv
        users {
          id
          user {
            id
          }
          collection
          tokenIds
          amounts
        }
      }
    }
  `
  return gql(queryString)
}

export const TNft = (id: string) => {
  const queryString = `
    query tNft {
      tNft(id: "${id}") {
        id
        name
        symbol
        ercType
      }
    }
  `
  return gql(queryString)
}

export const UserNftCollection = (id: string) => {
  const queryString = `
    query userNftCollection {
      userNftCollection(id: "${id}") {
        id
        tokenIds
        amounts
      }
    }
  `
  return gql(queryString)
}
