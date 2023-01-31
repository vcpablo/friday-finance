import { Context } from '../../context'

import { Account } from "@prisma/client";

const accounts = async (_parent: any, args: any, context: Context, _info: any): Promise<Account[]> => await context.prisma.account.findMany()

export default {
  accounts
}