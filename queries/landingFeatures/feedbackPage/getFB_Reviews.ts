import { gql } from '@apollo/client'
import { category } from './common'
import { ILangCodeQuery, IQueryPaginationVariable } from '../../common'

type rating = {
  src: string
}

type message = {
  id: string | number
  message: string
  name: string
  category: category
  rating: rating
}

export interface reviewItem {
  id: string | number
  message: string
  name: string
  category: string
  rating_src: string
}

export interface IFeedBackReviews {
  message: Array<message>
}

export interface IFeedBackReviewsVars
  extends IQueryPaginationVariable,
    ILangCodeQuery {}

export function getFB_Reviews(data: IFeedBackReviews): Array<reviewItem> {
  const outData: Array<reviewItem> = []

  data.message.map((el, i) => {
    const nItem: reviewItem = {
      category: el.category.category[0]?.category_name,
      name: el.name,
      message: el.message,
      rating_src: el.rating.src,
      id: el.id,
    }
    outData.push(nItem)
  })

  return outData
}

export const GET_FEEDBACK_REVIEWS = gql`
  query getFB_Reviews($code: String, $limit: Int, $offset: Int) {
    message(limit: $limit, offset: $offset) {
      id
      message
      rating {
        src
        tags
      }
      name
      category {
        category(filter: { languages_code: { _eq: $code } }) {
          category_name
          languages_code
        }
      }
    }
  }
`
// NEW QUERY WITH STATUS
// query getFB_Reviews($code: String, $limit: Int, $offset: Int) {
//   message(limit: $limit, offset: $offset, filter: { status: { _eq: true } }) {
//     id
//     status
//     message
//     rating {
//       src
//       tags
//     }
//     name
//     category {
//       category(filter: { languages_code: { _eq: $code } }) {
//         category_name
//         languages_code
//       }
//     }
//   }
// }
