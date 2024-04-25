import { useRouter } from 'next/router'
import {
  ILocaleConfigModule,
  getLocaleFromPathname,
  loadTranslationConfig,
} from './common'

interface ILocaleHook {
  locale: string
}

let translationConfig: ILocaleConfigModule

try {
  translationConfig = require('@root/ist-translation-config')
} catch (e) {
  if (e.code === 'MODULE_NOT_FOUND') {
    throw new Error('Module not found: ' + e.message)
  } else {
    throw new Error('Error during module import: ' + e.message)
  }
}

export const useLocale = (): ILocaleHook => {
  const router = useRouter()
  const path = router.asPath
  const _translationConfig = loadTranslationConfig(translationConfig)
  const locale = getLocaleFromPathname(path, _translationConfig)

  return {
    locale,
  }
}
