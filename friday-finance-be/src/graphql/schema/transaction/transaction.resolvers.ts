import { Transaction } from '@prisma/client'
import { Context } from '../../context'
import { BaseInput, PaginatedOutput } from '../../types'
import {
  PAGINATION_DEFAULT_SKIP,
  PAGINATION_DEFAULT_TAKE
} from '../../../constants'
import { appendWhere } from './transaction.filters'
import { TransactionInput } from './transaction.types'

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

export default {
  Query: {
    transactions
  },
  Mutation: {
    updateTransaction
  }
}
