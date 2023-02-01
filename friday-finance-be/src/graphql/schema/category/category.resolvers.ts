import { Category } from '@prisma/client'
import { Context } from '../../context'
import { BaseInput } from '../../types'
import {
  PAGINATION_DEFAULT_SKIP,
  PAGINATION_DEFAULT_TAKE
} from '../../../constants'

const categories = (
  _parent: any,
  input: BaseInput,
  context: Context
): Promise<Category[]> => {
  const { skip = PAGINATION_DEFAULT_SKIP, take = PAGINATION_DEFAULT_TAKE } =
    input.pagination || {}

  return context.prisma.category.findMany({
    skip,
    take
  })
}

export default {
  categories
}
