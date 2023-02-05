import { gql } from '@apollo/client/core'

const GET_ACCOUNTS = gql`
  query Accounts($pagination: PaginationInput) {
    accounts(pagination: $pagination) {
      id
      bank
      name
    }
  }
`

const GET_BANKS = gql`
  query Banks($pagination: PaginationInput) {
    banks(pagination: $pagination) {
      name
    }
  }
`

export { GET_ACCOUNTS, GET_BANKS }
