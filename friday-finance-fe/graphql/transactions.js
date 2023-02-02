import { gql } from '@apollo/client/core'

const GET_TRANSACTIONS = gql`
  query Transactions(
    $pagination: PaginationInput
    $sort: JSON
    $query: String
    $filter: JSON
  ) {
    transactions(
      pagination: $pagination
      sort: $sort
      query: $query
      filter: $filter
    ) {
      data {
        id
        reference
        categoryId
        category {
          id
          name
          color
        }
        account {
          id
          name
          bank
        }
        amount
        currency
        date
      }
      total
    }
  }
`
export { GET_TRANSACTIONS }
