import { Context } from '../../context'

import { Category } from "@prisma/client";

const categories = async (_parent: any, args: any, context: Context, _info: any): Promise<Category[]> => await context.prisma.category.findMany()

export default {
  categories
}