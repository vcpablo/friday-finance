import { Prisma } from '@prisma/client'
import { FilterInput } from '../../types'

const appendStartingMonthFilter = (filter: FilterInput) =>
  filter.startingMonth
    ? [
        {
          date: {
            gte: new Date(filter.startingMonth)
          }
        }
      ]
    : []

const appendEndingMonthFilter = (filter: FilterInput) =>
  filter.endingMonth
    ? [
        {
          date: {
            lte: new Date(filter.endingMonth)
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

const appendAccountFilter = (filter: FilterInput) =>
  filter.account
    ? [
        {
          account: {
            name: {
              contains: String(filter.account),
              mode: Prisma.QueryMode.insensitive
            }
          }
        }
      ]
    : []

const appendBankFilter = (filter: FilterInput) =>
  filter.bank
    ? [
        {
          account: {
            bank: {
              contains: String(filter.bank),
              mode: Prisma.QueryMode.insensitive
            }
          }
        }
      ]
    : []

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
  const OR = appendQuery(query)

  const AND = [
    ...appendStartingMonthFilter(filter),
    ...appendEndingMonthFilter(filter),
    ...appendAccountFilter(filter),
    ...appendBankFilter(filter),
    ...appendAmountFilter(query)
  ]

  if (OR.length > 0) {
    return {
      where: {
        AND: [{ OR }, ...AND]
      }
    }
  }

  return AND.length > 0
    ? {
        where: {
          AND
        }
      }
    : null
}

export { appendWhere }
