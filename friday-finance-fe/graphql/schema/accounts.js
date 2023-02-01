import { gql } from '@apollo/client/core'

export const GET_ACCOUNTS = gql`
  query Accounts($pagination: PaginationInput) {
    accounts(pagination: $pagination) {
      id
      bank
      name
    }
  }
`
