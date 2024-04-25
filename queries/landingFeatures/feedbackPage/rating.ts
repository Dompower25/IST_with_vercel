import { gql } from '@apollo/client'

export const GET_RATING_ITEMS = gql`
  query getRatings {
    rating {
      tags
      src
      advantage
    }
  }
`
