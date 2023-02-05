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

const GET_TRANSACTION_BY_ID = gql`
  query TransactionById($id: String) {
    transactionById(id: $id) {
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
  }
`

const UPDATE_TRANSACTION = gql`
  mutation UpdateTransaction($transaction: TransactionInput) {
    updateTransaction(transaction: $transaction) {
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
  }
`

export { GET_TRANSACTIONS, GET_TRANSACTION_BY_ID, UPDATE_TRANSACTION }
