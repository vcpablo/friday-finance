import { gql } from 'apollo-server-express'

export default gql`
  type Query {
    dummyQuery: String
  }
  type Mutation {
    dummyMutation: String
  }

  input PaginationInput {
    skip: Int
    take: Int
  }
`
