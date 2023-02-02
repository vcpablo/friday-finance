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

export { GET_ACCOUNTS }
