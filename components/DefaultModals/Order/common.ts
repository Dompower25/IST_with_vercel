import { Dispatch, ReactNode } from 'react'
import { IImageOptimizationOptions, cartItemGetter_fnc } from '../../UI/common'
import { IRegionSlice } from '../../../store/slices/regionSlice/IRegionSlice'
import { IRegionsListType } from '../../../store/slices/common/regionsListType'
import { ICartSelector_type } from '../../UI/ISTProductItem/Abstract/ICartTypes'

interface IOrderingModalOptions {
  modalState: boolean
  modalStateSetter: Dispatch<boolean>
}
export interface IOrderingModal {
  loadingSetter: Dispatch<boolean>
  selectedProducts: number
  totalSum: number
  modalState: IOrderingModalOptions
}

export interface IOrderedCartWrapper {
  selectedItems: ICartSelector_type[]
  cartItemGetter: cartItemGetter_fnc
  region: IRegionSlice<IRegionsListType>
  imageOptimization?: IImageOptimizationOptions
}

export interface IOrderingInformation {
  children: ReactNode
  translation: IOrderingInformation_translation
}

export interface IOrderRequest {
  translation: IOrderRequest_translation
}

export interface IOrderingDialog {
  totalSelect: number
  totalSum: number
  translation: IOrderingDialog_translation
  openOrderingInfo: (...props) => any
  openRequestPage: (...props) => any
  placeOrder: (...props) => any
  openingModal: number
}

export type ICartSelected = {
  cartSelected: string[]
}

export interface IOrderingInformation_translation {
  order: string
  detailsOrder: string
  products: string
  sum: string
  continueOrder: string
}

export interface IOrderRequest_translation {
  order: string
  detailsOrder: string
  contactPhoneText: string
  placeholderPhone: string
  descriptionText: string
  descriptionTextInformation: string
  IPNText: string
  IPN: string
  organizationNameText: string
  organizationName: string
  fullNameRepresentativeText: string
  fullNameRepresentative: string
  emailText: string
  email: string
  buttonOrdering: string
  buttonOrderingDetails: string
}

export interface IOrderingDialog_translation {
  products: string
  sum: string
  continueOrder: string
  buttonOrdering: string
  buttonOrderingDetails: string
}
