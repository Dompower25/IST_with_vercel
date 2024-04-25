import { gql } from '@apollo/client'
import TYPE_CATEGORY_Q from './TYPE_CATEGORY_Q.graphql'

export interface Type_category {
  Type_category: Array<category_query_t>
}

type category_query_t = {
  type_name: string
  slug: string
}

export const GET_TYPE_CATEGORY_LIST = TYPE_CATEGORY_Q
