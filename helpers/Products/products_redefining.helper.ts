import { ICartItem_properties_data } from '../../components/UI/ISTProductItem/Abstract/ICartTypes'
import { IProductData } from '../../components/UI/common'
import { IProductPage_specific_categories } from '../../components/productPage/translations/IProductPageTranslations'
import { ICartItem } from '../../queries/cart/cartActions'
import {
  IProductAdditional_Q,
  IProducts_Q,
} from '../../queries/products/productActions'

export const redefining_to_CartModel_redefiningHelper = (
  data: ICartItem_properties_data[],
): ICartItem[] => {
  return data.map((el) => {
    return {
      product_id: el.productId,
      quantity: el.quantity,
    } as ICartItem
  })
}

export const redefining_to_ICartItemPropertiesData_redefiningHelper = (
  data: ICartItem[],
): ICartItem_properties_data[] => {
  return data.map((el) => {
    return {
      productId: el.product_id,
      quantity: el.quantity,
    } as ICartItem_properties_data
  })
}

export const redefining_to_IProductPageSpecificCategories_redefiningHelper = (
  qData: IProductAdditional_Q,
): IProductPage_specific_categories | undefined => {
  type TRedefTypeCheck = {
    mfg: unknown | undefined
    unit: unknown | undefined
    type: unknown | undefined
  }

  const qDataUnpack = qData?.Products[0]
  if (!qDataUnpack) return undefined

  function hasEmpty(categ: TRedefTypeCheck): boolean {
    for (let key in categ) {
      if (typeof categ[key] === 'undefined') return true
    }
    return false
  }

  let unpackedCategories: TRedefTypeCheck = {
    mfg: qDataUnpack.product_manufacturer[0],
    unit: qDataUnpack.product_unit[0],
    type: qDataUnpack.product_type[0],
  }

  return !hasEmpty(unpackedCategories)
    ? {
        namesOfFiltersList: {
          manufacturer:
            qDataUnpack.product_manufacturer[0].manufacturer_category_id
              .manufacturer_name,
          unit: qDataUnpack.product_unit[0].Unit_category_id.unit_name,
          type: qDataUnpack.product_type[0].Type_category_id.type_name,
          available: undefined,
        },
      }
    : undefined
}
