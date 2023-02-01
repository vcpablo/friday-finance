import { makeExecutableSchema } from '@graphql-tools/schema'
import BaseTypes from './base.types'
import { Account } from './account/account.types'
import accountResolvers from './account/account.resolvers'

import { Category } from './category/category.types'
import categoryResolvers from './category/category.resolvers'

import { Transaction } from './transaction/transaction.types'
import transactionResolvers from './transaction/transaction.resolvers'

const typeDefs = [BaseTypes, Account, Category, Transaction]
const resolvers = {
  Query: {
    ...accountResolvers.Query,
    ...categoryResolvers.Query,
    ...transactionResolvers.Query
  },
  Mutation: {
    ...accountResolvers.Mutation,
    ...categoryResolvers.Mutation,
    ...transactionResolvers.Mutation
  }
}

export const schema = makeExecutableSchema({
  resolvers,
  typeDefs
})
