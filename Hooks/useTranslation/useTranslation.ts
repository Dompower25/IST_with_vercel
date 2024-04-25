import { useRouter } from 'next/router'
import { ITranslation } from './ITranslation'

export const useTransition = <TRANSLATION_BASE_TYPE>(
  translations: ITranslation<TRANSLATION_BASE_TYPE>[],
): ITranslation<TRANSLATION_BASE_TYPE> => {
  const { locale } = useRouter()

  const emptyTranslation = {
    translation: {} as TRANSLATION_BASE_TYPE,
    locale,
  } as ITranslation
  const translation = translations?.find((el) => el.locale === locale)
  return locale && translation ? translation : emptyTranslation
}
