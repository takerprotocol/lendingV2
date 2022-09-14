import gql from 'graphql-tag'

export const LendingPool = (id: string) => {
  const queryString = `
    query lendingPool {
      lendingPool(id: "${id.toLocaleLowerCase()}") {
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

export const AllUser = () => {
  const queryString = `
    query users ($skip: Int, $limit: Int) {
      users(skip: 0, limit: 2, orderBy: totalDebt, orderDirection: desc) {
        id
        nftCollateral
        reserveSupply
        totalDebt
        avgLtv
        liqThreshold
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
