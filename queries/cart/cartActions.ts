import GET_CART_COLLECTION_BY_ID_Q from './GET_CART_BY_ID_Q.graphql'
import UPDATE_CART_COLLECTION_BY_ID_Q from './UPDATE_CART_Q.graphql'
import CREATE_CART_COLLECTION_Q from './CREATE_CART_Q.graphql'

/**
 *
 */
type cart_model = {
  product_id: string | number
  quantity: number
}

export interface ICartCollection {
  id: string | number
  cart_model: cart_model[]
}

type updated_cartCollection_data = ICartCollection

export interface ICartCollection_updated {
  update_cartCollection_item: updated_cartCollection_data
}

export interface ICartCollection_created {
  create_cartCollection_item: updated_cartCollection_data
}

export interface ICartItem extends cart_model {}

type t_status = 'Published' | 'Draft' | 'Archived'

export interface ICartCollectionVariables {
  id: string | number
  data: { status: t_status; cart_model: cart_model[] }
}

export const GET_CART_COLLECTION_BY_ID = GET_CART_COLLECTION_BY_ID_Q
export const UPDATE_CART_BY_ID = UPDATE_CART_COLLECTION_BY_ID_Q
export const CREATE_CART_COLLECTION = CREATE_CART_COLLECTION_Q
