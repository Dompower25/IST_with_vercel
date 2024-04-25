import { CSSProperties, Dispatch, SetStateAction } from 'react'
import { ICatalogItem } from './Abstract/ICatalogTypes'
import { ICartItem } from './Abstract/ICartTypes'
import { IImageOptimizationOptions } from '../common'

export type pit_catalog = 'catalog'
export type pit_cart = 'cart'

type productItemType = ICartItem | ICatalogItem

interface ISTProductItemStyles extends Pick<CSSProperties, 'margin' | 'width'> {
  fill?: boolean
}

export interface IProductItem {
  itemType: productItemType
  currencySymbol: string

  style?: ISTProductItemStyles
  forwardingPath?: string
  imageOptimization?: IImageOptimizationOptions
}
