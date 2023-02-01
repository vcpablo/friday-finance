import { gql } from 'apollo-server-express'

export const Transaction = gql`
  scalar Date
  scalar JSON

  input TransactionInput {
    id: String!
    categoryId: String!
  }

  type Transaction {
    id: String!
    accountId: String!
    account: Account!
    categoryId: String
    category: Category
    reference: String
    amount: Float
    currency: String
    date: Date
    createdAt: Date
    updatedAt: Date
  }

  type Query {
    transactions(
      pagination: PaginationInput
      sort: JSON
      query: String
      filter: JSON
    ): [Transaction!]!
  }

  type Mutation {
    updateTransaction(transaction: TransactionInput): Transaction!
  }
`

export type TransactionInput = {
  transaction: {
    id: string
    categoryId: string
  }
}
