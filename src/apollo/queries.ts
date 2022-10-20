import gql from 'graphql-tag'

export const LendingPool = (id: string) => {
  const queryString = `
    query lendingPool {
      lendingPools(id: "${id.toLocaleLowerCase()}") {
        id
        reserves {
          id
          tToken
          debtToken
          interestRateCalculator
          liqThreshold
          ltv
          users {
            id
          }
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
          users {
            id
          }
        }
      }
    }
  `
  return gql(queryString)
}

export const NftCollection = (id: string) => {
  const queryString = `
    query nftCollection {
      nftCollection(id: "${id.toLocaleLowerCase()}") {
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
          tokens {
            id
          }
        }
      }
    }
  `
  return gql(queryString)
}

export const TNft = (id: string) => {
  const queryString = `
    query tNft {
      tNft(id: "${id.toLocaleLowerCase()}") {
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
      userNftCollection(id: "${id.toLocaleLowerCase()}") {
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
      reserve(id: "${id.toLocaleLowerCase()}") {
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

export const AllUser = (
  healthFactor: string,
  searchValue: string,
  conditionSort: Array<string>,
  allUserWhere: Array<string>
) => {
  // users(skip: 0, limit: 2, where: {collections: {collection: {id: "0x01"}}},${searchValue}orderBy: ${
  const queryString = `
    query users ($skip: Int, $limit: Int) {
    users(skip: 0, limit: 10, where: {${healthFactor}${[...allUserWhere]}},${searchValue}orderBy: ${
    conditionSort[0]
  }, orderDirection: ${conditionSort[1]}) {
        id
        nftCollateral
        reserveSupply
        totalDebt
        avgLtv
        liqThreshold
        healthFactor
        totalCollateral
        reserves {
          id
          reserve {
            id
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
          collection(id: "0x9b73acc52a3c6ba40c2296362f5d89bf8731a76f") {
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

export const ALL_USER = () => {
  const queryString = `
    query users ($id: String, $offset: Int, $limit: Int) {
      users(offset: $offset, limit: $limit) {
        id
        nftCollateral
        reserveSupply
        totalDebt
        avgLtv
        liqThreshold
        healthFactor
        totalCollateral
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
        nftCollateral
        reserveSupply
        totalDebt
        avgLtv
        liqThreshold
        healthFactor
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
