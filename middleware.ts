import { NextRequest, NextResponse } from 'next/server'
const locales_var = process.env.NEXT_PUBLIC_UNUSUAL_LOCALES

const PUBLIC_FILE = /\.(.*)$/

export const config = {
  matcher: '/:path*',
}

function parseLocalesFromHeaders(data: string): Array<string> {
  const finalArr = new Array<string>()

  const regex = new RegExp('(q*\\s?\\=\\s?\\d*\\.?\\d*|[^a-z]+)', 'g')
  const regexData = data.replace(regex, ';')
  const rawArray = regexData.split(';')

  if (rawArray?.length > 0) {
    rawArray.map((elem) => {
      if (elem !== '') finalArr.push(elem)
    })
  }

  return finalArr
}

export async function middleware(req: NextRequest) {
  const locales = locales_var.split(',')
  let defLanguage = 'en-US'

  if (req?.headers.has('accept-language')) {
    const headerLanguages: string = req?.headers.get('accept-language')

    const headerLanguagesArr: Array<string> =
      parseLocalesFromHeaders(headerLanguages)

    if (headerLanguages?.length > 0) {
      locales.map((locale_elem) => {
        headerLanguagesArr.map((header_elem) => {
          if (locale_elem.toLowerCase().includes(header_elem))
            defLanguage = locale_elem
        })
      })
    }
  }

  if (
    req.nextUrl.pathname.startsWith('/_next') ||
    req.nextUrl.pathname.includes('/api/') ||
    PUBLIC_FILE.test(req.nextUrl.pathname)
  ) {
    return
  }

  // LOCALE HANDLING
  if (req.nextUrl.locale === 'default') {
    if (!req.cookies.get('NEXT_LOCALE')) {
      req.cookies.set('NEXT_LOCALE', defLanguage)
    }

    let outLocale = req.cookies.get('NEXT_LOCALE').value

    return NextResponse.redirect(
      new URL(
        `/${outLocale}${req.nextUrl.pathname}${req.nextUrl.search}`,
        req.url,
      ),
    )
  }
}

// import { NextRequest, NextResponse } from 'next/server'
// import { getLocaleFromPathname } from './Hooks/useTranslation/common'
// import translationConfig from '@root/ist-translation-config'

// const PUBLIC_FILE = /\.(.*)$/
// export const config = {
//   matcher: '/:path*',
// }

// function parseLocalesFromHeaders(data: string): Array<string> {
//   const finalArr = new Array<string>()

//   const regex = new RegExp('(q*\\s?\\=\\s?\\d*\\.?\\d*|[^a-z]+)', 'g')
//   const regexData = data.replace(regex, ';')
//   const rawArray = regexData.split(';')

//   if (rawArray?.length > 0) {
//     rawArray.forEach((elem) => {
//       if (elem !== '') finalArr.push(elem.trim())
//     })
//   }

//   return finalArr
// }

// function mapToAllowedLocales(input: string[], allowed: string[]): string[] {
//   return allowed.filter((el) => {
//     const matchingLocale = input.find((locale) =>
//       el?.toLowerCase().includes(locale?.toLowerCase()),
//     )
//     return matchingLocale !== undefined
//   })
// }

// function getNonDefaultLocale(
//   defaultLocale: string,
//   localesArr: string[],
// ): string | undefined {
//   return localesArr.find((el) => el !== defaultLocale)
// }

// const pushLocaleToPath = (outLocale: string, req: NextRequest) => {
//   return NextResponse.redirect(
//     new URL(
//       `/${outLocale}${req.nextUrl.pathname}${req.nextUrl.search}`,
//       req.url,
//     ),
//   )
// }

// export async function middleware(req: NextRequest) {
//   if (
//     req.nextUrl.pathname.startsWith('/_next') ||
//     req.nextUrl.pathname.includes('/api/') ||
//     PUBLIC_FILE.test(req.nextUrl.pathname)
//   ) {
//     return
//   }

//   // LOCALE HANDLING
//   const _translationConfig = translationConfig
//   if (!_translationConfig) {
//     console.log('LOCALE CONFIG ERROR')
//     return
//   }

//   let headersLocalesList = [_translationConfig.defaultLocale]
//   let mappedCurrent = mapToAllowedLocales(
//     [getLocaleFromPathname(req.nextUrl.pathname, _translationConfig, true)],
//     _translationConfig.allowedLocales,
//   )

//   const currentLocale = mappedCurrent.length > 0 ? mappedCurrent[0] : undefined

//   if (req?.headers.has('accept-language')) {
//     const headerLanguages: string = req?.headers.get('accept-language')
//     const headerLanguagesArr: Array<string> =
//       parseLocalesFromHeaders(headerLanguages)

//     headersLocalesList = mapToAllowedLocales(
//       headerLanguagesArr,
//       _translationConfig.allowedLocales,
//     )
//   }

//   if (!currentLocale && headersLocalesList) {
//     return pushLocaleToPath(
//       getNonDefaultLocale(
//         _translationConfig.defaultLocale,
//         headersLocalesList,
//       ) ?? _translationConfig.defaultLocale,
//       req,
//     )
//   }
// }
