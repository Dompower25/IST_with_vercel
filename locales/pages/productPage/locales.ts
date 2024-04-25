import { IRequestFailureTranslation } from '../../../components/catalog/translations/emptyResult'
import {
  IProductPage_availability_translation,
  IProductPage_translation,
} from '../../../components/productPage/translations/IProductPageTranslations'

export const productPage_ru_translation = {
  myCart: 'Моя корзина',
  addToCart: 'Добавить в корзину',
  inCart: 'Открыть корзину',
  price: 'Цена',
  currencyStyle: '-',
  order: 'Оформить заказ',
  vendCode: 'Артикул',
  description: 'Описание',
} as IProductPage_translation

export const productPage_en_translation = {
  myCart: 'My cart',
  addToCart: 'Add to cart',
  inCart: 'View your cart',
  price: 'Price',
  currencyStyle: '-',
  order: 'Make order',
  vendCode: 'Vendor code',
  description: 'Description',
} as IProductPage_translation

export const productPage_availability_ru_translation = {
  isAvailable: 'Есть в наличии',
  isNotAvailable: 'Нет в наличии',
  checkByPhone: 'Уточните по телефону',
} as IProductPage_availability_translation

export const productPage_availability_en_translation = {
  isAvailable: 'Is available',
  isNotAvailable: 'Not available',
  checkByPhone: 'Check by phone',
} as IProductPage_availability_translation

export const productPage_emptyResult_ru_translation: IRequestFailureTranslation =
  {
    emptyResponseMessage:
      'Не удалось найти дополнительную информацию о товаре 🤔',
  }

export const productPage_emptyResult_en_translation: IRequestFailureTranslation =
  {
    emptyResponseMessage:
      'Could not find additional information about the product 🤔',
  }
