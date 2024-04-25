import { useAppDispatch } from '@root/Hooks/reduxSettings'
import useDelayedEffect from '@root/Hooks/useDelayedEffect'
import { useQueryBuilder } from '@root/Hooks/useQueryBuilder/useQueryBuilder'
import {
  TQueriedFilters,
  queryIsEmpty,
} from '@root/components/catalog/Filters/fromQuery/IQueriedFilters'
import HeaderCatalog from '@root/components/catalog/HeaderCatalog/HeaderCatalog'
import { loadingModalCatalogHints } from '@root/store/boilerplates/loadingModalBP'
import { setSearch } from '@root/store/slices/catalogSlices/catalogSlice'
import { loadingModalSetState } from '@root/store/slices/modalSlice/modalSlice'
import { ReactNode, FC, useState, useEffect, useCallback } from 'react'
import logo from '@root/public/brand/svg/mainLogo.svg'

export interface ICatalogLayout {
  children: ReactNode
}

export const CatalogLayout: FC<ICatalogLayout> = ({ children }) => {
  const dispatch = useAppDispatch()
  const { parseQuery } = useQueryBuilder<TQueriedFilters>()
  const [searchString, setSearchString] = useState<string>('')
  const setSearchDelay = 500

  useEffect(() => {
    const query = !queryIsEmpty(parseQuery()) ? parseQuery() : undefined
    if (query) setSearchString(query.search)
  }, [parseQuery])

  const setSearchState: (val: string) => void = useCallback(
    (val: string) => {
      setSearchString(val)
      if (searchString && searchString !== val)
        dispatch(
          loadingModalSetState({
            name: loadingModalCatalogHints,
            state: true,
          }),
        )
    },
    [dispatch, searchString],
  )

  useDelayedEffect(() => dispatch(setSearch(searchString)), setSearchDelay, [
    searchString,
  ])

  return (
    <>
      {/* HEADER */}
      <HeaderCatalog
        mobileTriggerSize={'LG_992'}
        searchingElement={{
          focus: false,
          searchField: true,
          searchValue: searchString,
          searchSetter: setSearchState,
        }}
        logo={{
          forwardingPath: '/',
          logoSrc: logo,
        }}
      />
      {children}
    </>
  )
}
