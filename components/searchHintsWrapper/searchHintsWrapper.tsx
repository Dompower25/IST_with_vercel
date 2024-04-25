import { useLazyQuery } from '@apollo/client'
import { Dispatch, FC, useCallback, useEffect } from 'react'
import {
  GENERAL_CATEGORY_QUERY,
  IGeneralCategoryQuery,
} from '../../queries/categories/generalCategoryQuery'

import { getFiltersItemsAsArray_filtersHelper } from '../../helpers/Catalog/filters'
import ISTCategoryHints from '../UI/ISTCategoryHints/ISTCategoryHints'
import { ITranslation } from '../../Hooks/useTranslation/ITranslation'
import { TCatalogFiltersList } from '../catalog/Filters/catalogFilters'
import { INamesOfFiltersTranslation } from '../catalog/translations/catalogFilters'

export type TOnCategorySelect = (
  categoryType: keyof TCatalogFiltersList,
  categoryName: string,
) => void

type THintsModalTranslation = Pick<
  INamesOfFiltersTranslation,
  'namesOfFiltersList'
>
interface ISearchHintsWrapper {
  searchRequest: string
  modalState: boolean
  loadingSetter: Dispatch<boolean>
  hintsTranslation: ITranslation<THintsModalTranslation>
  isEmptyResult?: (empty: boolean) => void
  onCategorySelect?: TOnCategorySelect
}

type StringArrayObject = Record<string, unknown[]>

const hintsIsEmpty = (obj: StringArrayObject): boolean => {
  for (const key in obj) {
    if (obj.hasOwnProperty(key) && obj[key].length > 0) {
      return false
    }
  }
  return true
}

export const SearchHintsWrapper: FC<ISearchHintsWrapper> = ({
  searchRequest,
  modalState,
  loadingSetter,
  hintsTranslation,
  isEmptyResult,
  onCategorySelect,
}) => {
  const onSelectFncWrapper = (index, st, name, type) => {
    if (!onCategorySelect) return
    onCategorySelect(type, name)
  }

  // FETCHING DATA && LOADING
  const [initialFetch, { data: filtersList, loading: filtersIsLoading }] =
    useLazyQuery<IGeneralCategoryQuery>(GENERAL_CATEGORY_QUERY, {
      variables: {
        search: !searchRequest || !searchRequest.search ? '' : searchRequest,
      },
      fetchPolicy: 'cache-and-network',
    })

  useEffect(() => {
    if (!modalState) return
    1
    initialFetch().then((res) => {
      if (!res || !res.data || res.error)
        console.warn('HINTS FETCHING ERR: ', res?.error)
      else isEmptyResult ? isEmptyResult(hintsIsEmpty({ ...res.data })) : null
    })
  }, [initialFetch, isEmptyResult, modalState])

  useEffect(() => {
    loadingSetter(modalState && filtersIsLoading)
  }, [filtersIsLoading, loadingSetter, modalState])

  return filtersList && !filtersIsLoading ? (
    <ISTCategoryHints
      hintsLimit={3}
      hintsList={[
        getFiltersItemsAsArray_filtersHelper(
          filtersList,
          'manufacturer_category',
          'manufacturer_name',
        ).map((el) => {
          return { fieldName: el }
        }),
        getFiltersItemsAsArray_filtersHelper(
          filtersList,
          'Unit_category',
          'unit_name',
        ).map((el) => {
          return { fieldName: el }
        }),
        getFiltersItemsAsArray_filtersHelper(
          filtersList,
          'Type_category',
          'type_name',
        ).map((el) => {
          return { fieldName: el }
        }),
      ]}
      hintsCategoryCollection={[
        {
          collectionName:
            hintsTranslation.translation.namesOfFiltersList.manufacturer,
          listedHintsId: 0,
          switcherOptions: {
            onSwitch: onSelectFncWrapper,
            filterDesignation: 'mfg' as keyof TCatalogFiltersList,
          },
        },
        {
          collectionName: hintsTranslation.translation.namesOfFiltersList.unit,
          listedHintsId: 1,
          switcherOptions: {
            onSwitch: onSelectFncWrapper,
            filterDesignation: 'unit' as keyof TCatalogFiltersList,
          },
        },
        {
          collectionName: hintsTranslation.translation.namesOfFiltersList.type,
          listedHintsId: 2,
          switcherOptions: {
            onSwitch: onSelectFncWrapper,
            filterDesignation: 'type' as keyof TCatalogFiltersList,
          },
        },
      ]}
    />
  ) : null
}
