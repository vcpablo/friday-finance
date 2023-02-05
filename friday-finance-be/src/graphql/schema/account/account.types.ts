import { gql } from 'apollo-server-express'

export const Account = gql`
  scalar Date

  type Account {
    id: String!
    name: String!
    bank: String
    createdAt: Date
    updatedAt: Date
  }

  type Bank {
    name: String!
  }

  type Query {
    accounts(pagination: PaginationInput): [Account!]!
    banks(pagination: PaginationInput): [Bank!]!
  }
`
