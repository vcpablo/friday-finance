import { Account } from '@prisma/client'
import { Context } from '../../context'
import { BaseInput } from '../../types'
import {
  PAGINATION_DEFAULT_SKIP,
  PAGINATION_DEFAULT_TAKE
} from '../../../constants'

const accounts = (
  _parent: any,
  input: BaseInput,
  context: Context
): Promise<Account[]> => {
  const { skip = PAGINATION_DEFAULT_SKIP, take = PAGINATION_DEFAULT_TAKE } =
    input.pagination || {}

  return context.prisma.account.findMany({
    skip,
    take
  })
}

export default {
  Query: {
    accounts
  },
  Mutation: {}
}
