import { Transaction } from '@prisma/client'

export type BaseInput = {
  pagination?: PaginationInput
  sort?: SortInput[]
  query?: string
  filter?: FilterInput
}

export type PaginationInput = {
  skip?: number
  take?: number
}

export type SortInput = {
  [key: string]: 'asc' | 'desc'
}

export type FilterInput = {
  [key: string]: string | number | Date
}

export type PaginatedOutput = {
  data: Transaction[]
  total: number
}
