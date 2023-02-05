import { Transaction } from '@prisma/client'
import { Context } from '../../context'
import { BaseInput, PaginatedOutput } from '../../types'
import {
  PAGINATION_DEFAULT_SKIP,
  PAGINATION_DEFAULT_TAKE
} from '../../../constants'
import { appendWhere } from './transaction.filters'
import { TransactionInput, TransactionByIdInput } from './transaction.types'
import { GraphQLError } from 'graphql'
import { ReasonPhrases, StatusCodes } from 'http-status-codes'

const transactions = async (
  _parent: any,
  input: BaseInput,
  context: Context
): Promise<PaginatedOutput[]> => {
  const { sort = [], query = '', pagination = {}, filter = {} } = input

  const { skip = PAGINATION_DEFAULT_SKIP, take = PAGINATION_DEFAULT_TAKE } =
    pagination

  const where = appendWhere(query, filter)

  const data = await context.prisma.transaction.findMany({
    skip,
    take,
    include: {
      account: true,
      category: true
    },
    orderBy: sort,
    ...where
  })

  const total = where ? data.length : await context.prisma.transaction.count()

  return [
    {
      data,
      total
    }
  ]
}

const updateTransaction = (
  _parent: any,
  input: TransactionInput,
  context: Context
): Promise<Transaction> => {
  const {
    transaction: { id, categoryId }
  } = input

  return context.prisma.transaction.update({
    include: {
      account: true,
      category: true
    },
    where: {
      id
    },
    data: { categoryId }
  })
}

const transactionById = async (
  _parent: any,
  input: TransactionByIdInput,
  context: Context
): Promise<Transaction> => {
  const { id } = input

  const transaction = await context.prisma.transaction.findUnique({
    include: {
      account: true,
      category: true
    },
    where: {
      id
    }
  })

  if (!transaction) {
    throw new GraphQLError(ReasonPhrases.NOT_FOUND, {
      extensions: {
        code: StatusCodes.NOT_FOUND
      }
    })
  }

  return transaction
}

export default {
  Query: {
    transactions,
    transactionById
  },
  Mutation: {
    updateTransaction
  }
}
