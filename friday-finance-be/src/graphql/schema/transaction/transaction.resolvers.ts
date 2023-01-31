import { Context } from '../../context'

import { Transaction } from '@prisma/client'

const transactions = async (
  _parent: any,
  args: any,
  context: Context
): Promise<Transaction[]> =>
  await context.prisma.transaction.findMany({ skip: 40, take: 10 })

export default {
  transactions
}
