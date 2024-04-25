import { INamesOfFiltersTranslation } from '@root/components/catalog/translations/catalogFilters'

export interface IProductPage_translation {
  myCart: string
  addToCart: string
  inCart: string
  price: string
  currencyStyle: string
  order: string
  vendCode: string
  description: string
}

export interface IProductPage_availability_translation {
  isAvailable: string
  isNotAvailable: string
  checkByPhone: string
}

export interface IProductPage_specific_categories
  extends Pick<INamesOfFiltersTranslation, 'namesOfFiltersList'> {}
