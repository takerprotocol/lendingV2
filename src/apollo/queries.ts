import gql from 'graphql-tag'

export const TEST = (id: string) => {
  console.log(id)
  const queryString = `
  query pools {
    pool(id: "${id}") {
      id
    }
  }
`
  return gql(queryString)
}
