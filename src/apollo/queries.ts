import gql from 'graphql-tag'

export const TEST = (id: string) => {
  const queryString = `
  query pools {
    pool(id: "${id}") {
      id
    }
  }
`
  return gql(queryString)
}

export const TEST1 = (id: string) => {
  const queryString = `
  query registry {
    Registry {
      id
    }
  }
`
  return gql(queryString)
}
