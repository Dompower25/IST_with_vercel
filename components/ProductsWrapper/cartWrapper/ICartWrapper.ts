import { CSSProperties, Dispatch } from 'react'
import { ICartCollection } from '../../../queries/cart/cartActions'
import { ICartSelector } from '../../UI/ISTProductItem/Abstract/ICartTypes'
import { IProductItem } from '../../UI/ISTProductItem/common'
import { mobileTrigger_size } from '../../UI/common'

export interface IEmptyCartMessage {
  header: string
  hint: string
}

export interface ICartWrapper {
  cartSelector: Omit<ICartSelector, 'data'>
  loadingSetter: Dispatch<boolean>
  cartEmptyMessage: IEmptyCartMessage

  mobileTriggerSize?: mobileTrigger_size
  itemStyles?: Pick<IProductItem, 'style'>
  wrapperStyles?: CSSProperties

  amountData?: {
    amountPriceSetter: Dispatch<number>
    amountQuantitySetter: Dispatch<number>
  }
}
