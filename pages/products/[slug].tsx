import { ReactElement, useCallback, useEffect, useState } from 'react'
import { useTransition } from '../../Hooks/useTranslation/useTranslation'
import styles from '../../styles/ProductPage/ProductPage.module.scss'
import ISTButtonN from '../../components/UI/ISTButton/ISTButtonN'
import Image from 'next/image'
import { EN_LOCALE, RU_LOCALE } from '../../locales/locales'
import { catalogClient } from '../../Apollo/catalogClient'
import { LandingLayout } from '../../layouts/landingLayout'
import {
  GET_ADDITIONAL_BY_ID,
  GET_PRODUCT_BY_SLUG,
  IProductAdditional_Q,
  IProducts_Q,
} from '../../queries/products/productActions'
import { IProductData } from '../../components/UI/common'
import { GeometryViewer } from '../../components/productPage/geometryViewer/geometryViewer'
import { AvailabilityStatus } from '../../components/productPage/availableStatus/availabilityStatus'
import {
  productPage_availability_en_translation,
  productPage_availability_ru_translation,
  productPage_emptyResult_en_translation,
  productPage_emptyResult_ru_translation,
  productPage_en_translation,
  productPage_ru_translation,
} from '../../locales/pages/productPage/locales'
import {
  IProductPage_availability_translation,
  IProductPage_specific_categories,
  IProductPage_translation,
} from '../../components/productPage/translations/IProductPageTranslations'
import {
  filters_en_translation,
  filters_ru_translation,
} from '../../locales/commonTranslations'
import DescriptionEntry from '../../components/productPage/descriptionItem/descriptionEntry'
import { useLazyQuery } from '@apollo/client'
import { redefining_to_IProductPageSpecificCategories_redefiningHelper } from '../../helpers/Products/products_redefining.helper'
import { useCartActions } from '@root/Hooks/useCartActions/useCartActions'
import RequestFailure from '@root/components/catalog/requestFailure'
import { IRequestFailureTranslation } from '@root/components/catalog/translations/emptyResult'
import { loadingModalAdditionalProductData } from '@root/store/boilerplates/loadingModalBP'
import { loadingModalSetState } from '@root/store/slices/modalSlice/modalSlice'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import Head from 'next/head'
import {
  IProductPageMetaDescriptionTranslation,
  productPageMetaDesc_en_translation,
  productPageMetaDesc_ru_translation,
} from '@root/locales/metadata/locales'
import { metaTextSubstitution_metaHelper } from '@root/helpers/metadata/metadata'
import { useAppSelector } from '@root/Hooks/reduxSettings'
import { useImageOptimization } from '@root/Hooks/useImageOptimization/useImageOptimization'

type TProductItemType = {
  description: string
  availability: number
  weight: string
  formFactorImage: string
  sizes: string
} & IProductData

const ProductPage = (product: IProducts_Q) => {
  const dispatch = useDispatch()
  const region = useAppSelector((selector) => selector.region)

  const router = useRouter()
  const [productData, setProductData] = useState<TProductItemType>()
  const [additionalProductData, setAdditionalProductData] =
    useState<IProductPage_specific_categories>()

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
  const [cartState, setCartState] = useState<boolean>()
  const { cData, cAdder, cFetch } = useCartActions({
    cartAutoFetching: false,
  })

  // TRANSLATIONS
  const translationProductPage = useTransition<IProductPage_translation>([
    { locale: RU_LOCALE, translation: productPage_ru_translation },
    { locale: EN_LOCALE, translation: productPage_en_translation },
  ])

  const translationProductPageAvailability =
    useTransition<IProductPage_availability_translation>([
      {
        locale: RU_LOCALE,
        translation: productPage_availability_ru_translation,
      },
      {
        locale: EN_LOCALE,
        translation: productPage_availability_en_translation,
      },
    ])

  const translationSpecificCategories =
    useTransition<IProductPage_specific_categories>([
      {
        locale: RU_LOCALE,
        translation: filters_ru_translation,
      },
      {
        locale: EN_LOCALE,
        translation: filters_en_translation,
      },
    ])

  const translationEmptySpecifics = useTransition<IRequestFailureTranslation>([
    {
      locale: RU_LOCALE,
      translation: productPage_emptyResult_ru_translation,
    },
    {
      locale: EN_LOCALE,
      translation: productPage_emptyResult_en_translation,
    },
  ])

  const metaDataTranslation =
    useTransition<IProductPageMetaDescriptionTranslation>([
      { locale: RU_LOCALE, translation: productPageMetaDesc_ru_translation },
      { locale: EN_LOCALE, translation: productPageMetaDesc_en_translation },
    ])

  // GET MAIN DATA
  useEffect(() => {
    if (!product?.Products || !(product.Products.length > 0)) return
    const newItem = product.Products[0]

    const nAvailability =
      newItem.available_status && typeof newItem.available_status === 'string'
        ? parseFloat(newItem.available_status)
        : 0

    setProductData({
      id: newItem.id,
      vendCode: newItem.vend_code,
      title:
        region?.region === RU_LOCALE
          ? newItem.product_name_ru
          : newItem.product_name,
      price: newItem.price,
      image: newItem.image_url,
      slug: newItem.slug,

      // ADDITIONAL
      availability: nAvailability,
      description: newItem.text_description,
      sizes: newItem.sizes,
      weight: newItem.weight,
      formFactorImage: newItem.form_factor_image,
    } as TProductItemType)
  }, [product, region])

  // GET ADDITIONAL DATA
  const [
    initialFetch,
    {
      data: additionalData,
      loading: additionalLoading,
      error: additionalError,
    },
  ] = useLazyQuery<IProductAdditional_Q, { id: number }>(
    GET_ADDITIONAL_BY_ID,
    {},
  )

  useEffect(() => {
    if (!additionalData && productData?.id)
      initialFetch({
        variables: {
          id: parseInt(productData.id.toString()),
        },
      }).then((res) => {
        if (!res?.data) return
        setAdditionalProductData(
          redefining_to_IProductPageSpecificCategories_redefiningHelper(
            res.data,
          ),
        )
      })
  }, [additionalData, initialFetch, productData])

  useEffect(() => {
    dispatch(
      loadingModalSetState({
        name: loadingModalAdditionalProductData,
        state: additionalLoading,
      }),
    )
  }, [additionalLoading, dispatch])

  // CART ACTIONS

  useEffect(() => {
    if (productData) cFetch()
  }, [cFetch, productData])

  const isInCart = useCallback(() => {
    if (!productData || !cData) return
    setCartState(!!cData.find((_el) => _el.productId === productData.id))
  }, [cData, productData])

  useEffect(() => {
    isInCart()
  }, [isInCart])

  const formatPrice = useCallback(() => {
    const cleanedPrice = productData.price.replace(/\s/g, '').replace(',', '.')
    const parsedPrice = parseFloat(cleanedPrice)
    const locale = router.locale

    if (isNaN(parsedPrice) || !locale) return productData.price

    const currencyMultiplier =
      region.currency[region.currentCurrencyId]?.currencyMultiplier || 1

    const formattedPrice = new Intl.NumberFormat(locale, {
      maximumFractionDigits: 2,
    }).format(parsedPrice * currencyMultiplier)

    return formattedPrice
  }, [region, productData, router])

  const getCurrencySymbol = useCallback(() => {
    if (!region?.currency || typeof region?.currentCurrencyId === 'undefined')
      return
    const currentCurrency = region.currency[region.currentCurrencyId]
    return currentCurrency?.currencySymbol || ''
  }, [region])

  return productData ? (
    <>
      <Head>
        {/* metaDataTranslation */}
        <title>
          {metaDataTranslation?.translation?.titlePostfix && productData.title
            ? metaTextSubstitution_metaHelper(
                metaDataTranslation.translation.titlePostfix,
                productData.title,
              )
            : 'IST ELEVATOR PRODUCT'}
        </title>
        <meta
          name="description"
          content={
            metaDataTranslation?.translation?.description && productData.title
              ? metaTextSubstitution_metaHelper(
                  metaDataTranslation.translation.description,
                  productData.title,
                )
              : 'IST ELEVATOR PRODUCT'
          }
        />
      </Head>

      <div
        className={'row w-100 d-flex pl-0 pr-0'}
        style={{
          paddingTop: '80px',
        }}
      >
        <div className="col-12 col-lg-6 w-100 p-0">
          <div className={styles.ProductBlock}>
            <div className={styles.titleContainer}>
              {productData.title}
              <span>
                {`${translationProductPage.translation.vendCode}: `}
                {productData.vendCode}
              </span>
            </div>

            <div className={styles.Image_and_replacement}>
              <button className={styles.ProductImage}>
                <Image
                  src={productData ? productData.image : ''}
                  fill={true}
                  alt={productData ? productData.slug : ''}
                  style={{
                    objectFit: 'cover',
                    objectPosition: 'center',
                  }}
                  loader={sourcedLoader}
                  sizes={'450px'}
                />
              </button>

              {/* <div className={styles.ProductReplacement}>
              <ReplacementItem
                text={currentTranslationProductPage?.translation?.analog}
                paragraph={currentTranslationProductPage?.translation?.for}
                pu={setPU}
                headersSet={setPuHeaders}
                data={productData ? productData.product_name_ru : ""}
                puTyper={setIsPuType}
                isType={Analogue}
              />

              <ReplacementItem
                text={currentTranslationProductPage?.translation?.replacement}
                paragraph={currentTranslationProductPage?.translation?.for}
                pu={setPU}
                headersSet={setPuHeaders}
                data={productData ? productData.product_name_ru : ""}
                puTyper={setIsPuType}
                isType={Replacement}
              />

              <ReplacementItem
                text={
                  currentTranslationProductPage?.translation?.partOf + "..."
                }
                pu={setPU}
                headersSet={setPuHeaders}
                data={productData ? productData.product_name_ru : ""}
                puTyper={setIsPuType}
                isType={Included}
              />
            </div> */}
            </div>
          </div>
        </div>

        <div className="col-12 col-lg-6">
          <div className={styles.ProductDescription_wrapper}>
            {/* PRODUCT DESCRIPTION */}
            <div className={styles.ProductDescription}>
              {/* - AVAILABILITY */}
              <div className={styles.availableStatus}>
                <AvailabilityStatus
                  status={productData.availability}
                  translation={translationProductPageAvailability.translation}
                />
              </div>

              <div className={styles.ParamsWrapper}>
                <div className={styles.ParamsSpecifics}>
                  {additionalProductData && !additionalError ? (
                    <>
                      <DescriptionEntry
                        Title={
                          translationSpecificCategories?.translation
                            ?.namesOfFiltersList?.manufacturer
                        }
                        Params={
                          additionalProductData.namesOfFiltersList.manufacturer
                        }
                      />

                      <DescriptionEntry
                        Title={
                          translationSpecificCategories?.translation
                            ?.namesOfFiltersList?.unit
                        }
                        Params={additionalProductData.namesOfFiltersList.unit}
                      />

                      <DescriptionEntry
                        Title={
                          translationSpecificCategories?.translation
                            ?.namesOfFiltersList?.type
                        }
                        Params={additionalProductData.namesOfFiltersList.type}
                      />
                    </>
                  ) : (
                    <RequestFailure translation={translationEmptySpecifics} />
                  )}
                </div>

                <div className={styles.GeometryBlock}>
                  <GeometryViewer
                    geometryImage={productData.formFactorImage}
                    description={{
                      description: productData.sizes,
                      regexLineBreaker: /(?=\w:)/,
                    }}
                  />
                </div>

                <div className={styles.DetailedDescription}>
                  <p>{`${translationProductPage.translation.description}:`}</p>
                  {productData.description}
                </div>
              </div>
              <div className={styles.ProductActions}>
                <div className={styles.ProductPrice}>
                  {productData ? (
                    <>
                      {`${translationProductPage?.translation?.price}:`}
                      <span>{formatPrice()}</span>
                      {getCurrencySymbol()}
                    </>
                  ) : null}
                </div>
                <div className={styles.Actions}>
                  <ISTButtonN
                    theme="dark"
                    accent={cartState ? 'important' : 'secondary'}
                    size="L"
                    mobileTriggerSize="SM_576"
                    title={{
                      caption: cartState
                        ? translationProductPage?.translation?.inCart
                        : translationProductPage?.translation?.addToCart,
                    }}
                    onClick={() => {
                      !cartState
                        ? cAdder(productData.id).then(() => isInCart())
                        : router.push('/cart')
                    }}
                    style={{
                      borderRadius: '15px',
                    }}
                  />

                  <ISTButtonN
                    theme="dark"
                    accent="inactive"
                    size="L"
                    mobileTriggerSize="SM_576"
                    title={{
                      caption: translationProductPage?.translation?.order,
                    }}
                    onClick={() => {}}
                    style={{
                      borderRadius: '15px',
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  ) : (
    <>
      <RequestFailure translation={translationEmptySpecifics} />
    </>
  )
}

export async function getServerSideProps(context: { query: { slug: string } }) {
  const { slug } = context.query

  const { data } = await catalogClient.query<IProducts_Q>({
    query: GET_PRODUCT_BY_SLUG,
    variables: {
      slug,
    },
    fetchPolicy: 'network-only',
  })

  return {
    props: data,
  }
}

const getLayout = (page: ReactElement) => {
  return <LandingLayout>{page}</LandingLayout>
}

ProductPage.getLayout = getLayout
export default ProductPage
