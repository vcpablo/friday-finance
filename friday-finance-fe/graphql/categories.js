import { gql } from '@apollo/client/core'

const GET_CATEGORIES = gql`
  query Categories {
    categories {
      id
      name
      color
    }
  }
`

const CREATE_CATEGORY = gql`
  mutation CreateCategory($category: CategoryInput) {
    createCategory(category: $category) {
      id
      name
      color
    }
  }
`

export { GET_CATEGORIES, CREATE_CATEGORY }
