import { CSSProperties, Dispatch } from 'react'
import { ICartItem_properties_data } from './ISTProductItem/Abstract/ICartTypes'
import { ImageLoader } from 'next/image'

export type mobileTrigger_size =
  | 'XXL_1400'
  | 'XL_1200'
  | 'LG_992'
  | 'MD_768'
  | 'SM_576'

export type commonStyles = Pick<CSSProperties, 'borderRadius' | 'height'>

export type cstmStyles = {
  [key: string]: string
}

export type callBack_fnc<T> = {
  flag?: boolean
  sideEffect: Dispatch<T>
}

export const maxLengthText = (text: string, length: number): string => {
  return text.length >= length && length > 0
    ? `${text.slice(0, length)}...`
    : text
}

/**
 *  PRODUCTS TYPES
 */
export interface IProductData {
  vendCode: string
  id: number | string
  title: string
  price: string

  image?: string
  slug?: string
}

/**
 * PRODUCT ACTION TYPES
 */
export type cartItemGetter_fnc = (
  id: string | number,
  callBack?: callBack_fnc<IProductData>,
) => Promise<IProductData>

export type deleteProduct_fnc = (
  id: string | number,
  callBack?: callBack_fnc<ICartItem_properties_data[]>,
) => Promise<boolean>

export type cartAdder_fnc = (
  id: string | number,
  callBack?: callBack_fnc<ICartItem_properties_data[]>,
) => Promise<boolean>

export type quantityEditor_fnc = (
  id: string | number,
  newQuantity: number,
  callBack?: callBack_fnc<number>,
) => Promise<boolean>

/**
 *  Image optimization options
 */
export interface IImageOptimizationOptions {
  loader: ImageLoader
  sizes: string
  placeholderData?: string
}

/**
 *  Common data setter option for Input elements
 */
type fnc_inputDataSetter = (val: string) => void
export type IInputDataSetter = Dispatch<string> | fnc_inputDataSetter
