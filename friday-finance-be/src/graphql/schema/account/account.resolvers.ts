import { Context } from '../../context'

import { Account } from '@prisma/client'

const accounts = async (
  _parent: any,
  args: any,
  context: Context
): Promise<Account[]> => await context.prisma.account.findMany()

export default {
  accounts
}
