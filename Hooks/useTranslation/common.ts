interface TranslationConfig {
  allowedLocales: string[]
  defaultLocale: string
}

export interface ILocaleConfigModule {
  allowedLocales: string[]
  defaultLocale: string
}

export function loadTranslationConfig(
  configModule: any,
): TranslationConfig | null {
  try {
    const config = configModule.default || configModule
    return config as TranslationConfig
  } catch (error) {
    return null
  }
}

export function getLocaleFromPathname(
  pathname: string,
  config: TranslationConfig,
  allowUndefined: boolean = false,
): string | undefined {
  if (!config) throw 'Translation config not found.'

  const pathSegments = pathname.split('/').filter(Boolean)
  const locale = pathSegments[0]

  if (config.allowedLocales.includes(locale)) return locale
  else allowUndefined !== true ? config.defaultLocale : undefined
}
