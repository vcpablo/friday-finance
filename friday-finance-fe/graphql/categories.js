import { gql } from '@apollo/client/core'

const GET_CATEGORIES = gql`
  query Categories {
    categories {
      id
      name
      color
    }
  }
`

export { GET_CATEGORIES }
