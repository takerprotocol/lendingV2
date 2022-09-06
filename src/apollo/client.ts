import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import { SupportedChainId } from 'constants/chains'
export const clientEth = new ApolloClient({
  link: new HttpLink({
    uri: 'https://api.studio.thegraph.com/query/29077/lending-subgraph-2/0.0.94',
  }),
  cache: new InMemoryCache(),
})
export const clientPolygon = new ApolloClient({
  link: new HttpLink({
    uri: 'https://api.thegraph.com/subgraphs/name/takerprotocol/taker-renting-chapel',
  }),
  cache: new InMemoryCache(),
})
export const clientBsc = new ApolloClient({
  link: new HttpLink({
    uri: 'https://api.thegraph.com/subgraphs/name/takerprotocol/taker-renting-mumbai',
  }),
  cache: new InMemoryCache(),
})

export const clientETH1155 = new ApolloClient({
  link: new HttpLink({
    uri: 'https://api.thegraph.com/subgraphs/name/leon-do/rinkeby-erc721-erc1155',
  }),
  cache: new InMemoryCache(),
})

export const clientPolygon1155 = new ApolloClient({
  link: new HttpLink({
    uri: 'https://thegraph.com/hosted-service/subgraph/leon-do/mumbai-erc721-erc1155',
  }),
  cache: new InMemoryCache(),
})

export const clientBsc1155 = new ApolloClient({
  link: new HttpLink({
    uri: 'https://thegraph.com/hosted-service/subgraph/ryry79261/chapel-erc721-erc1155',
  }),
  cache: new InMemoryCache(),
})

export const getClient = () => {
  return {
    [SupportedChainId.MAINNET]: clientEth,
    [SupportedChainId.BSC_MAINNET]: clientBsc,
    [SupportedChainId.POLYGON_MAINNET]: clientPolygon,
  }
}

export const getClient1155 = () => {
  return {
    [SupportedChainId.MAINNET]: clientETH1155,
    [SupportedChainId.BSC_MAINNET]: clientBsc1155,
    [SupportedChainId.POLYGON_MAINNET]: clientPolygon1155,
  }
}
