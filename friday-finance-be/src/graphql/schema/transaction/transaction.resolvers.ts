import { Transaction } from '@prisma/client'
import { Context } from '../../context'
import { BaseInput } from '../../types'
import {
  PAGINATION_DEFAULT_SKIP,
  PAGINATION_DEFAULT_TAKE
} from '../../../constants'
import { appendWhere } from './transaction.filters'

const transactions = async (
  _parent: any,
  input: BaseInput,
  context: Context
): Promise<Transaction[]> => {
  const { sort = [], query = '', pagination = {}, filter = {} } = input

  const { skip = PAGINATION_DEFAULT_SKIP, take = PAGINATION_DEFAULT_TAKE } =
    pagination

  const output = await context.prisma.transaction.findMany({
    skip,
    take,
    include: {
      account: true,
      category: true
    },
    orderBy: sort,
    ...appendWhere(query, filter)
  })

  return output
}

export default {
  transactions
}
