import { IFooter_translation } from '@root/components/Footer/Footer'
import {
  ICurrencySpec,
  ILanguageSpec,
} from '@root/components/region/IRegionSpecList'
import { EN_LOCALE, RU_LOCALE } from '../locales'

export const footer_en_translation: IFooter_translation = {
  contacts: 'Contacts',
  phone: 'Our Number',
  email: 'Our Email',
  address: 'Our Address',
  failureRequest: 'An error occurred while receiving data 🤨',
  regionTitle: 'Currency & language',
  currencyTitle: 'Currency',
  languageTitle: 'Language',
}

export const footer_ru_translation: IFooter_translation = {
  contacts: 'Контакты',
  phone: 'Наш телефон',
  email: 'Наш Email',
  address: 'Наш Адрес',
  failureRequest: 'Возникла ошибка при получении данных 🤨',
  regionTitle: 'Язык и валюта',
  currencyTitle: ' Валюта',
  languageTitle: 'Язык',
}

export const footer_currency_ru_translation: ICurrencySpec = {
  usd: {
    key: EN_LOCALE,
    field: 'Доллары США',
  },
  rub: {
    key: RU_LOCALE,
    field: 'Рубли',
  },
}

export const footer_currency_en_translation: ICurrencySpec = {
  usd: {
    key: EN_LOCALE,
    field: 'USD',
  },
  rub: {
    key: RU_LOCALE,
    field: 'RUB',
  },
}

export const footer_language_ru_translation: ILanguageSpec = {
  en: {
    key: EN_LOCALE,
    field: 'Английский',
  },
  ru: {
    key: RU_LOCALE,
    field: 'Русский',
  },
}

export const footer_language_en_translation: ILanguageSpec = {
  en: {
    key: EN_LOCALE,
    field: 'English',
  },
  ru: {
    key: RU_LOCALE,
    field: 'Russian',
  },
}
