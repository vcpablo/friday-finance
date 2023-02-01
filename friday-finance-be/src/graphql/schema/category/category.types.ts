import { gql } from 'apollo-server-express'

export const Category = gql`
  scalar Date

  input CategoryInput {
    name: String!
    color: String
  }

  type Category {
    id: String!
    name: String!
    color: String
    createdAt: Date
    updatedAt: Date
  }

  type Query {
    categories(pagination: PaginationInput): [Category!]!
  }

  type Mutation {
    createCategory(category: CategoryInput): Category!
  }
`

export type CategoryInput = {
  category: {
    name: string
    color?: string
  }
}
