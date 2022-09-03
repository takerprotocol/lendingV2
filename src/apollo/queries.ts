import gql from 'graphql-tag'

export const LendingPool = (id: string) => {
  const queryString = `
    query lendingPool {
      lendingPool(id: "${id}") {
        id
        reserves {
          id
          tToken
          debtToken
          interestRateCalculator
          liqThreshold
          ltv
        }
        nfts {
          id
          tNFT
          ercType
          liqThreshold
          name
          symbol
          floorPrice
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
        name
        symbol
        floorPrice
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
        tokens {
          id
          amount
        }
      }
    }
  `
  return gql(queryString)
}

export const Reserve = (id: string) => {
  const queryString = `
    query reserve {
      reserve(id: "${id}") {
        id
      }
    }
  `
  return gql(queryString)
}

export const FIRST_COLLECTION = () => {
  const queryString = `
    query allNftToken {
      userNftCollection {
        tokens
      }
    }
`
  return gql(queryString)
}

export const AllUser = () => {
  const queryString = `
    query users {
      users {
        id
        reserves {
          id
          reserve {
            tToken
            debtToken
            interestRateCalculator
            liqThreshold
            ltv
            name
            symbol
          }
          depositedAmount
          borrowedAmount
        }
        collections {
          id
          collection {
            id
            tNFT
            ercType
            liqThreshold
            ltv
            name
            symbol
            floorPrice
          }
          tokens {
            id
            amount
          }
        }
      }
    }
`
  return gql(queryString)
}

export const User = (id: string) => {
  const queryString = `
    query user {
      user(id: "${id.toLocaleLowerCase()}") {
        id
        reserves {
          id
          reserve {
            tToken
            debtToken
            interestRateCalculator
            liqThreshold
            ltv
            name
            symbol
          }
          depositedAmount
          borrowedAmount
        }
        collections {
          id
          collection {
            id
            tNFT
            ercType
            liqThreshold
            ltv
            name
            symbol
            floorPrice
          }
          tokens {
            id
            amount
          }
        }
      }
    }
`
  return gql(queryString)
}

export const UserReserve = (id: string) => {
  const queryString = `
    query userReserve {
      userReserve(id: "${id.toLocaleLowerCase()}") {
        id
        depositedAmount
        borrowedAmount
        usedAsCollateral
      }
    }
`
  return gql(queryString)
}
