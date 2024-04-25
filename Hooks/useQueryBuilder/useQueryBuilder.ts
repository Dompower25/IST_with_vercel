import queryString from 'query-string'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'

/**
 * Warning: Please only pass types (type) instead of interfaces for T.
 * @template {Record<string, string | number | string[] | number[]>} T - The data type to be used as the argument.
 * @param {queryString.StringifyOptions} [parseOptions] - Query string parsing options.
 */

type TQueryBuilder = Record<string, string | number | string[] | number[]>

export const useQueryBuilder = <T extends TQueryBuilder>(
  parseOptions?: queryString.StringifyOptions,
) => {
  const router = useRouter()

  const updateUrl = (newUrl: string) => {
    if (typeof window === 'undefined') return
    window.history.pushState({}, document.title, newUrl)
  }

  const [_parseOptions] = useState<queryString.StringifyOptions>(
    parseOptions
      ? parseOptions
      : {
          arrayFormat: 'bracket-separator',
          arrayFormatSeparator: '|',
          skipNull: true,
        },
  )

  const getQuery = useCallback(
    (data: T): string => {
      return queryString.stringify({ ...data }, { ..._parseOptions })
    },
    [_parseOptions],
  )

  const pushToQuery = useCallback(
    (data: T, additionalPath?: string): void => {
      const newQuery = getQuery(data)
      updateUrl(
        additionalPath ? `${additionalPath}/?${newQuery}` : `?${newQuery}`,
      )
    },
    [getQuery],
  )

  const parseQuery = useCallback((): T => {
    const parsedUrl = queryString.parseUrl(router?.asPath, {
      ..._parseOptions,
    })

    if (parsedUrl?.query) return parsedUrl.query as unknown as T

    return
  }, [_parseOptions, router])

  return { parseQuery, getQuery, pushToQuery, router }
}
