import { Context } from '../../context'

import { Transaction } from "@prisma/client";

const transactions = async (_parent: any, args: any, context: Context, _info: any): Promise<Transaction[]> => await context.prisma.transaction.findMany()

export default {
  transactions
}