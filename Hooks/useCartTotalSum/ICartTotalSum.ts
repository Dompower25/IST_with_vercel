import { cartItemGetter_fnc } from '../../components/UI/common'
import { ReactNode } from 'react'
import { ICartSelector_type } from '../../components/UI/ISTProductItem/Abstract/ICartTypes'

export type ICartTotalSum_prodsInf = {
  productId: string | number
  pricePerItem: number
}

export interface ICartTotalSum {
  cartSelector: ICartSelector_type[]
  getProductByIdQuery_func?: cartItemGetter_fnc
  acceptOrder_func?: () => any
  children?: ReactNode
}
