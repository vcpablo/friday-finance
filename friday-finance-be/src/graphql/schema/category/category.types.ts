import { gql } from "apollo-server-express";

export const Category = gql`
  scalar Date

  type Category {
    id: String!
    name: String!
    color: String
    createdAt: Date
    updatedAt: Date
  }

  type Query {
    categories: [Category!]!
  }
`;

