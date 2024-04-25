import React, { FC, useCallback, useEffect, useMemo, useState } from 'react'
import ISTProductItem from '../../UI/ISTProductItem/ISTProductItem'
import { useAppSelector } from '../../../Hooks/reduxSettings'
import styles from './catalogWrapper.module.scss'
import { ICatalogWrapper } from './ICatalogWrapper'
import { RU_LOCALE } from '../../../locales/locales'
import { useCartActions } from '../../../Hooks/useCartActions/useCartActions'
import { useImageOptimization } from '../../../Hooks/useImageOptimization/useImageOptimization'
import {
  GET_FILTERED_PRODUCTS_LIST,
  IProductFiltersVariables,
  IProducts_Q,
} from '../../../queries/products/productActions'
import { useLazyQuery } from '@apollo/client'
import { usePagination } from '../../../Hooks/usePagination'
import { TCatalogFiltersList } from '@root/components/catalog/Filters/catalogFilters'
import { ICatalog } from '@root/components/catalog/abstract/ISTCatalog'
import RequestFailure from '@root/components/catalog/requestFailure'

export const CatalogWrapper: FC<ICatalogWrapper> = ({
  emptySearchingResultTranslation,

  loadingSetter,
  additionalForwarding,

  containerScrollRef,
  initialPagination,
  mobileStyles,

  filtersList,
  catalog,

  onFilter,
  onException,
  isEmptyResult,
}) => {
  const regionHandler = useAppSelector((selector) => selector.region)

  // LOADING STATE HANDLING
  const [endOfList, setEndOfList] = useState<boolean>(false)

  // PRODUCTS DATA FETCHING
  const fetchVariables: ICatalog<TCatalogFiltersList> = useMemo(() => {
    return onFilter
      ? ({
          filters: onFilter(catalog, filtersList),
          search: catalog.search,
        } as ICatalog<TCatalogFiltersList>)
      : catalog
  }, [catalog, filtersList, onFilter])

  const [loadGreeting, { data: productsData, fetchMore }] = useLazyQuery<
    IProducts_Q,
    IProductFiltersVariables
  >(GET_FILTERED_PRODUCTS_LIST, {
    variables: {
      ...fetchVariables.filters,
      search: fetchVariables.search,
      limit: initialPagination ? initialPagination.limit : 20,
      offset: 0,
    },
    fetchPolicy: 'network-only',
  })

  const fetchData = useCallback(
    (offset: number, limit: number) => {
      return fetchMore({
        variables: {
          ...fetchVariables,
          limit,
          offset,
        },
      })
    },
    [fetchMore, fetchVariables],
  )

  // PAGINATION HANDLING
  const paginateCatalog = useCallback(
    (offset: number, limit: number) => {
      if (!productsData || !productsData.Products) return
      const res = [...productsData?.Products]
      if (res && (res.length === limit || res.length === offset)) {
        fetchData(offset, limit).then((res) => {
          if (res?.data?.Products && !(res.data.Products.length > 0))
            setEndOfList(true)
        })
      } else setEndOfList(true)
    },

    [productsData, fetchData],
  )

  const { resetOffset, loading: _paginationLoading } = usePagination(
    paginateCatalog,
    {
      targetRef: containerScrollRef,
      pagination: initialPagination ? initialPagination.limit : 20,
    },
    [productsData],
  )

  // INITIAL FETCHING
  useEffect(() => {
    resetOffset()
    loadGreeting().then((res) => {
      if (!res?.data?.Products) return
      const dataLength = res.data.Products.length
      const emptyResult = !(dataLength > 0)
      if (emptyResult) setEndOfList(true)
      isEmptyResult ? isEmptyResult(emptyResult) : null
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchVariables])

  /* IMAGE OPTIMIZATION */
  let cloudinary_acc = process.env.NEXT_PUBLIC_CLOUDINARY_ACC
  const PROD_IMAGES_ROOT = process.env.NEXT_PUBLIC_PROD_IMAGES_ROOT
  const PROD_NAME_INCLUDED_PART =
    process.env.NEXT_PUBLIC_PROD_NAME_INCLUDED_PART

  const { sourcedLoader } = useImageOptimization(
    cloudinary_acc,
    PROD_NAME_INCLUDED_PART,
    PROD_IMAGES_ROOT,
  )

  // CART HANDLING
  const { cData, cAdder, cRemover, cFetch } = useCartActions()
  useEffect(() => {
    if (productsData) cFetch()
  }, [cFetch, productsData])

  // LOADING HANDLER
  useEffect(() => {
    if (!productsData || !cData) loadingSetter(true)
    else loadingSetter(false)
  }, [cData, loadingSetter, productsData])

  useEffect(() => {
    loadingSetter(endOfList ? false : _paginationLoading)
  }, [_paginationLoading, endOfList, loadingSetter])

  // useEffect(() => {
  //   console.log("pag_load: ", _paginationLoading, "EnD OF LIST: ", endOfList);
  // }, [_paginationLoading, endOfList]);

  return (
    <>
      <div
        className={`${styles.wrapper} ${mobileStyles
          .split(String.fromCharCode(32))
          .map((el) => styles[el])
          .join(String.fromCharCode(32))}`}
      >
        {productsData && cData && productsData.Products?.length > 0 ? (
          productsData.Products?.map((el, i) => {
            return (
              <div
                style={{
                  maxWidth: '200px',
                }}
                key={`productItemCatalog_${i}_key`}
              >
                <ISTProductItem
                  currencySymbol={
                    regionHandler.currency[regionHandler.currentCurrencyId]
                      ?.currencySymbol
                  }
                  forwardingPath={`/${additionalForwarding}/${el?.slug}`}
                  style={{
                    fill: true,
                  }}
                  imageOptimization={{
                    loader: sourcedLoader,
                    sizes: '350px',
                  }}
                  itemType={{
                    productType: 'catalog',
                    parameters: {
                      inline: false,
                      cartStatus: !!cData.find(
                        (_el) => _el.productId === el.id,
                      ),
                      cartAdder: cAdder,
                      cartRemover: cRemover,
                    },

                    data: {
                      id: el?.id,
                      title:
                        regionHandler.region === RU_LOCALE
                          ? el?.product_name_ru
                          : el?.product_name,
                      image: el?.image_url,
                      vendCode: el?.vend_code.toString(),
                      price: (
                        Number(el.price) *
                        regionHandler.currency[regionHandler.currentCurrencyId]
                          ?.currencyMultiplier
                      ).toString(),
                    },
                  }}
                />
              </div>
            )
          })
        ) : productsData && !(productsData?.Products?.length > 0) ? (
          <div className={styles.emptyResContainer}>
            <div
              style={{
                paddingTop: '100px',
              }}
            >
              <RequestFailure translation={emptySearchingResultTranslation} />
            </div>
          </div>
        ) : null}
      </div>
    </>
  )
}
