import gql from 'graphql-tag'

export const COLLECTION_NFTLIST = (originalContractAddress: string) => {
  const queryString = `
    query nfts {
      leaseTickets( where:{
        originCollection:  "${originalContractAddress}"
      }) {
        id
        originCollection
        tokenId
        pricePerDay
        tradeToken
        lastExpires
        status
        end
        createdAt
      }
    }
`
  return gql(queryString)
}

export const FIRST_COLLECTION = (originalContractAddress: string) => {
  const queryString = `
    query nfts {
      leaseTickets(first: 1, where:{
        originCollection:  "${originalContractAddress}"
      }) {
        id
        originCollection
        tokenId
        pricePerDay
        tradeToken
        lastExpires
        status
        end
        createdAt
      }
    }
`
  return gql(queryString)
}

export const COLLECTION_DATA = (originalContractAddress: string) => {
  const queryString = `
  query colectionData {
    mirrorCollection(id: "${originalContractAddress}") {
      originalItems
      mirrorItems
      floorPrice
      totalRentAmount
      verifyDate
    }
  }
  `

  return gql(queryString)
}

export const NFT_INFO = (id: string) => {
  const queryString = `
    query nftData {
      leaseTicket(id: "${id}") {
        owner
        originCollection
        mirrorCollection {
          id
        }
        pricePerDay
        tokenId
        quantity 
        lastExpires
        end
      }
    }
`
  return gql(queryString)
}
// where:{ticket: "${id}"}
export const NFT_RENTAL_HISTORY = (id: string) => {
  const queryString = `
    query nftRentalHistory {
      accountBalances( where:{ticket: "${id}"}) {
        renter
        totalPay
        mirror {
          start
          end
        }
      }
    }
`
  return gql(queryString)
}
// where:{holder:"${account}"}

export const MY_NFT = (account: string) => {
  const queryString = `
  query myRenting {
    
      account(id: "${account}") {
      ERC721tokens {
        contract {
          id
        }
        identifier
      }
      ERC1155balances{
        contract {
          id
        }
        token {
          identifier
        }
        valueExact
      }
    }
  
  }

`
  return gql(queryString)
}

export const ALL_MIRRO_COLLECTION = () => {
  const queryString = `
  query allCollection{
    mirrorCollections{
      id,
      project{
      id
     }
     originCollection
    }
  }
`
  return gql(queryString)
}

export const MY_RENTING = (account: string) => {
  const queryString = `
    query myRenting {
      accountBalances( where:{holder:"${account}"}) {
        id
        renter
        totalPay
        quantity
        mirror {
          start
          end
        }
        ticket {
          originCollection
          tokenId
          id
        }
      }
    }
`
  return gql(queryString)
}

export const MY_LEASING = (account: string) => {
  const queryString = `
  query myLeasing {
    leaseTickets(where:{owner: "${account}"}) {
      id
      owner
      originCollection
      totalRevenue
      tokenId
      quantity
      start
      end
      lastExpires
      status
      createdAt
     
    }
  }
  `
  return gql(queryString)
}
export const MY_ORDER_RENT = (account: string) => {
  const queryString = `
    query myOrderRent {
      accountBalances( where:{renter:  "${account}"}) {
        id
        renter
        totalPay
        mirror {
          start
          end
        }
      }
    }
`
  return gql(queryString)
}
export const MY_ORDER_LEASING = (account: string) => {
  const queryString = `
    query myOrderLeasing {
      leaseTickets(where:{owner: "${account}"}) {
        id
        owner
        totalRevenue
        start
        end
      }
    }
`
  return gql(queryString)
}
