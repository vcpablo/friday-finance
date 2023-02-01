import { gql } from 'apollo-server-express'

export default gql`
  input PaginationInput {
    skip: Int
    take: Int
  }
`
