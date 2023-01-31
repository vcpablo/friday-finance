import { makeExecutableSchema } from "graphql-tools"
import { Account } from "./account/account.types"
import accountResolvers from "./account/account.resolvers"

import { Category } from "./category/category.types"
import categoryResolvers from "./category/category.resolvers"

import { Transaction } from "./transaction/transaction.types"
import transactionResolvers from "./transaction/transaction.resolvers"

const typeDefs = [ Account, Category, Transaction ]
const resolvers = {
  Query: {
    ...accountResolvers,
    ...categoryResolvers,
    ...transactionResolvers
  }
}

export const schema = makeExecutableSchema({
  resolvers,
  typeDefs,
})