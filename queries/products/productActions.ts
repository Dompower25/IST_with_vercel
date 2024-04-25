import get_by_slug from './GET_PRODUCT_BY_SLUG.graphql'
import get_by_id from './GET_PRODUCT_BY_ID.graphql'
import get_additional from './GET_ADDITIONAL_BY_ID.gql'
import get_full_list from './GET_FULL_PRODUCT_LIST.graphql'
import get_filtered from './GET_FILTERED_PRODUCTS_LIST.graphql'
import { IQueryPaginationVariable } from '../common'
import { TCatalogFiltersList } from '@root/components/catalog/Filters/catalogFilters'

export interface IProducts_Q {
  Products: Array<IProductItem>
}

export interface IProductAdditional_Q {
  Products: Array<IAdditionalProductData>
}

export interface IProductFiltersVariables
  extends IQueryPaginationVariable,
    IFiltersVars {}

interface IFiltersVars extends TCatalogFiltersList {
  search: string
}

interface IProductItem {
  id: string | number
  image_url: string
  product_name: string
  product_name_ru: string
  slug: string
  vend_code: string | number
  price: string | number

  weight: string | number
  text_description: string

  form_factor_image: string
  sizes: string

  analogue_text: string
  included_text: string
  replacement_text: string
  available_status: string | boolean | number
}

// ADDITIONAL PRODUCTS INFO
type TManufacturerCategory = {
  manufacturer_category_id: {
    manufacturer_name: string
    manufacturer_name_ru: string
  }
}

type TTypeCategory = {
  Type_category_id: {
    type_name: string
    type_name_ru: string
  }
}

type TUnitCategory = {
  Unit_category_id: {
    unit_name: string
    unit_name_ru: string
  }
}

interface IAdditionalProductData {
  product_manufacturer: TManufacturerCategory[]
  product_type: TTypeCategory[]
  product_unit: TUnitCategory[]
}

export const GET_PRODUCT_BY_ID = get_by_id
export const GET_FULL_PRODUCTS_LIST = get_full_list
export const GET_FILTERED_PRODUCTS_LIST = get_filtered
export const GET_PRODUCT_BY_SLUG = get_by_slug
export const GET_ADDITIONAL_BY_ID = get_additional
