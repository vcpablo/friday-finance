import { PrismaClient } from '@prisma/client';
import { ApolloServer } from 'apollo-server'

const prisma = new PrismaClient();

const typeDefs = `
  type Account {
    id: String!
    name: String!
    bank: String
  }

  type Category {
    id: String!
    name: String!
    color: String
  }

  type Transaction {
    id: String!
    accountId: String
    account: Account
    categoryId: String
    category: Category
    Reference: String
    amount: Number
    currency: String
    date: Date
  }

  type Query {
    allAccounts: [Account!]!
    allCategories: [Category!]!
  }
`;

const resolvers = {
  Query: {
    allAccounts: () => {
        return prisma.account.findMany();
    },
    allCategories: () => {
        return prisma.category.findMany();
    }
  }
};

const server = new ApolloServer({ resolvers, typeDefs });
server.listen({ port: 4000 });