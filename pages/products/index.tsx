import React, {
  ReactElement,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { NextPageWithLayout } from '../_app'
import styles from '../../styles/catalogPage/catalogFullProductsList.module.scss'
import { useTransition } from '../../Hooks/useTranslation/useTranslation'
import { EN_LOCALE, RU_LOCALE } from '../../locales/locales'
import {
  filters_en_translation,
  filters_ru_translation,
} from '../../locales/commonTranslations'
import {
  filterExclude_filtersHelper,
  filterSetter_filtersHelper,
  getAdditionalFilter_filtersHelper,
  getFiltersItemsAsArray_filtersHelper,
} from '../../helpers/Catalog/filters'
import { catalogClient } from '../../Apollo/catalogClient'
import {
  GENERAL_CATEGORY_QUERY,
  IGeneralCategoryQuery,
} from '../../queries/categories/generalCategoryQuery'
import {
  loadTranslationConfig,
  getLocaleFromPathname,
} from '@root/Hooks/useTranslation/common'
import { useAppSelector, useAppDispatch } from '@root/Hooks/reduxSettings'
import { useQueryBuilder } from '@root/Hooks/useQueryBuilder/useQueryBuilder'
import { CatalogWrapper } from '@root/components/ProductsWrapper/catalogWrapper/catalogWrapper'
import { onFilterSwitchCustom_t } from '@root/components/UI/hooks/ISTFiltersHook/common'
import { available_AdditionalFilters } from '@root/components/catalog/Filters/Additional/AdditionalFilters'
import { TCatalogFiltersList } from '@root/components/catalog/Filters/catalogFilters'
import { CatalogFiltersList } from '@root/components/catalog/Filters/catalogFiltersList'
import {
  TQueriedFilters,
  queryIsEmpty,
  queryFiltersToState,
} from '@root/components/catalog/Filters/fromQuery/IQueriedFilters'
import {
  ICatalog,
  ISTCatalogCreate,
  ISTCatalogUpdateFilter,
} from '@root/components/catalog/abstract/ISTCatalog'
import { IRequestFailureTranslation } from '@root/components/catalog/translations/emptyResult'
import { CatalogLayout } from '@root/layouts/catalogLayout'
import {
  emptyResult_ru_translation,
  emptyResult_en_translation,
} from '@root/locales/catalog/locales'
import { loadingModalCatalogHints } from '@root/store/boilerplates/loadingModalBP'
import { updateFilters } from '@root/store/slices/catalogSlices/catalogSlice'
import { loadingModalSetState } from '@root/store/slices/modalSlice/modalSlice'
import { useRouter } from 'next/router'
import { INamesOfFiltersTranslation } from '@root/components/catalog/translations/catalogFilters'

const ProductsIndexPage: NextPageWithLayout = (data: IGeneralCategoryQuery) => {
  const catalog = useAppSelector((catalog) => catalog.catalog)
  const dispatch = useAppDispatch()
  const router = useRouter()

  const { parseQuery } = useQueryBuilder<TQueriedFilters>()

  const scrollRef = useRef<HTMLDivElement>()
  const filtersTranslation = useTransition<INamesOfFiltersTranslation>([
    { locale: RU_LOCALE, translation: filters_ru_translation },
    { locale: EN_LOCALE, translation: filters_en_translation },
  ])

  const emptyResultTranslation = useTransition<IRequestFailureTranslation>([
    { locale: RU_LOCALE, translation: emptyResult_ru_translation },
    { locale: EN_LOCALE, translation: emptyResult_en_translation },
  ])

  const [localVariables, setLocalVariables] =
    useState<ICatalog<TCatalogFiltersList>>()

  useEffect(() => {
    if (localVariables || !catalog) return
    const query = !queryIsEmpty(parseQuery()) ? parseQuery() : undefined
    if (query)
      setLocalVariables((prev) => {
        return {
          ...prev,
          filters: queryFiltersToState(query),
        }
      })
    else setLocalVariables(catalog)
  }, [catalog, localVariables, parseQuery])

  useEffect(() => {
    setLocalVariables((prev) => {
      return {
        ...prev,
        search: catalog.search,
      }
    })
  }, [catalog.search])

  const fncLoadingSetter = useCallback(
    (state: boolean) => {
      dispatch(
        loadingModalSetState({
          name: loadingModalCatalogHints,
          state,
        }),
      )
    },
    [dispatch],
  )

  // GETTING FULL FILTERS LIST
  const getFiltersFromFetchedData = useCallback((): TCatalogFiltersList => {
    return data
      ? {
          mfg: getFiltersItemsAsArray_filtersHelper(
            data,
            'manufacturer_category',
            'manufacturer_name',
          ),
          unit: getFiltersItemsAsArray_filtersHelper(
            data,
            'Unit_category',
            'unit_name',
          ),
          type: getFiltersItemsAsArray_filtersHelper(
            data,
            'Type_category',
            'type_name',
          ),

          available: [
            available_AdditionalFilters.isAvailable,
            available_AdditionalFilters.onOrder,
          ],
        }
      : undefined
  }, [data])

  // GETTING FILTERS FOR VARIABLES
  const filteringVariablesBuilder = (
    catalog: ICatalog<TCatalogFiltersList>,
    filters: TCatalogFiltersList,
  ) => {
    return catalog?.filters
      ? ({
          mfg:
            catalog.filters.mfg && catalog.filters.mfg.length > 0
              ? filterExclude_filtersHelper(catalog.filters.mfg, filters.mfg)
              : [''],

          unit:
            catalog.filters.unit && catalog.filters.unit.length > 0
              ? filterExclude_filtersHelper(catalog.filters.unit, filters.unit)
              : [''],

          type:
            catalog.filters.type && catalog.filters.type.length > 0
              ? filterExclude_filtersHelper(catalog.filters.type, filters.type)
              : [''],

          available:
            catalog.filters.available && catalog.filters.available.length > 0
              ? filterExclude_filtersHelper(
                  catalog.filters.available,
                  filters.available,
                )
              : [''],
        } as TCatalogFiltersList)
      : null
  }

  // onSwitchFilter METHOD
  const switchFilter: onFilterSwitchCustom_t<keyof TCatalogFiltersList> =
    useCallback(
      (idx, state, name, options) => {
        if (!localVariables || !localVariables.filters || !options) return
        const newFilters = filterSetter_filtersHelper(
          localVariables.filters,
          options,
          getAdditionalFilter_filtersHelper(name, filtersTranslation),
        )

        setLocalVariables((prev) => {
          if (!prev) return

          const updatedState = ISTCatalogCreate<TCatalogFiltersList>({
            filters: {
              ...prev.filters,
            } as TCatalogFiltersList,
            search: prev.search,
          })

          ISTCatalogUpdateFilter<TCatalogFiltersList>(
            {
              key: options,
              filter: newFilters,
            },
            updatedState,
          )

          return updatedState
        })
        fncLoadingSetter(true)
      },
      [filtersTranslation, fncLoadingSetter, localVariables],
    )

  const handleChangeRoute = useCallback(
    (url: string) => {
      if (!localVariables || !localVariables.filters) return
      dispatch(updateFilters(localVariables.filters))
    },
    [dispatch, localVariables],
  )

  useEffect(() => {
    router.events.on('routeChangeStart', handleChangeRoute)
    return () => {
      router.events.off('routeChangeStart', handleChangeRoute)
    }
  }, [handleChangeRoute, router.events])

  return localVariables ? (
    <>
      <div className={`${styles.catalogContainer}`} ref={scrollRef}>
        <div className={`row ${styles.catalogContent}`}>
          <div className={'col-4 position-relative p-0 pl-2 d-none d-lg-flex'}>
            {/* =================== */}
            {/* E-SHOP FILTERS LIST */}
            {/* =================== */}

            <div className={styles.catalogFilter_Block}>
              <CatalogFiltersList
                translation={filtersTranslation}
                filtersList={getFiltersFromFetchedData()}
                filtersState={localVariables?.filters}
                onSwitch={switchFilter}
              />
            </div>
          </div>

          {/* ==================== */}
          {/* E-SHOP PRODUCTS LIST */}
          {/* ===================  */}

          <div
            className={
              'col-12 col-lg-8 p-0 pl-lg-2 d-flex flex-wrap position-relative'
            }
          >
            <CatalogWrapper
              emptySearchingResultTranslation={emptyResultTranslation}
              loadingSetter={fncLoadingSetter}
              filtersList={getFiltersFromFetchedData()}
              catalog={localVariables}
              onFilter={filteringVariablesBuilder}
              additionalForwarding={'products'}
              containerScrollRef={scrollRef}
              initialPagination={{
                limit: 20,
              }}
              mobileStyles={
                'wrapper-2 wrapper-sm-3 wrapper-md-4 align-center align-lg-start'
              }
            />
          </div>
        </div>
      </div>
    </>
  ) : null
}

{
  /* =============================== */
  /* SPECIFY THE LAYOUT FOR THE PAGE */
  /* 👇 ========================== 👇 */
}
const getLayout = (page: ReactElement) => {
  return <CatalogLayout>{page}</CatalogLayout>
}

export async function getServerSideProps(context: {
  locale: string
  params: { locale: string }
}) {
  const { locale, params } = context

  const { data } = await catalogClient.query<IGeneralCategoryQuery>({
    query: GENERAL_CATEGORY_QUERY,
    variables: {
      lang: locale || params?.locale,
    },
  })

  return {
    props: data,
  }
}

ProductsIndexPage.getLayout = getLayout
export default ProductsIndexPage
