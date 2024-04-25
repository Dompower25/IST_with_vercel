import MFG_CATEGORY_Q from './MFG_CATEGORY_Q.gql'

export type ICategoryMFG_Q = {
  manufacturer_category: Array<category_query_t>
}

type category_query_t = {
  manufacturer_name: string
  slug: string
}

export const GET_MFG_CATEGORY_LIST = MFG_CATEGORY_Q
