import { Prisma } from '@prisma/client'
import { FilterInput } from '../../types'

const appendStartDateFilter = (filter: FilterInput) =>
  filter.startDate
    ? [
        {
          date: {
            gte: new Date(filter.startDate)
          }
        }
      ]
    : []

const appendEndDateFilter = (filter: FilterInput) =>
  filter.endDate
    ? [
        {
          date: {
            lte: new Date(filter.endDate)
          }
        }
      ]
    : []

const appendAmountFilter = (query: string) => {
  const numericQuery = Number(query)

  return query && !isNaN(numericQuery)
    ? [
        {
          amount: {
            equals: numericQuery
          }
        }
      ]
    : []
}

const appendQuery = (query: string) =>
  query
    ? [
        {
          reference: {
            contains: query,
            mode: Prisma.QueryMode.insensitive
          }
        },
        {
          account: {
            OR: [
              {
                name: {
                  contains: query,
                  mode: Prisma.QueryMode.insensitive
                }
              },
              {
                bank: {
                  contains: query,
                  mode: Prisma.QueryMode.insensitive
                }
              }
            ]
          }
        },
        {
          category: {
            name: {
              contains: query,
              mode: Prisma.QueryMode.insensitive
            }
          }
        }
      ]
    : []

const appendWhere = (query: string, filter: FilterInput) => {
  const OR = [
    ...appendStartDateFilter(filter),
    ...appendEndDateFilter(filter),
    ...appendAmountFilter(query),
    ...appendQuery(query)
  ]

  return OR.length > 0
    ? {
        where: {
          OR
        }
      }
    : null
}

export { appendWhere }
