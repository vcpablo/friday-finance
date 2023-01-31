import { gql } from "apollo-server-express";

export const Transaction = gql`
  scalar Date

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
    transactions: [Transaction!]!
  }
`;

