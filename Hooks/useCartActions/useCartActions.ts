import { QueryResult, useLazyQuery, useMutation } from '@apollo/client'
import { cartCollection } from '../../components/ProductsWrapper/common'
import {
  CREATE_CART_COLLECTION,
  GET_CART_COLLECTION_BY_ID,
  ICartCollectionVariables,
  ICartCollection_created,
  ICartCollection_updated,
  ICartItem,
  UPDATE_CART_BY_ID,
} from '../../queries/cart/cartActions'
import { useSessionActions } from '../useSessionActions/useSessionActions'
import { IDirectusGraphQlErrors } from '../../Directus/ExceptionTypes/DirectusExceptionTypes'
import { useCallback, useEffect, useState } from 'react'
import { ICartItem_properties_data } from '../../components/UI/ISTProductItem/Abstract/ICartTypes'
import { ICreationFnc, IUpdateFnc } from '../useSessionActions/common'
import {
  IProductData,
  cartAdder_fnc,
  cartItemGetter_fnc,
  deleteProduct_fnc,
  quantityEditor_fnc,
} from '../../components/UI/common'
import {
  products_addItem_actionsHelper,
  products_editQuantity_actionsHelper,
  products_removeItem_actionsHelper,
} from '../../helpers/Products/products_actions.helper'
import { redefining_to_CartModel_redefiningHelper } from '../../helpers/Products/products_redefining.helper'
import {
  GET_PRODUCT_BY_ID,
  IProducts_Q,
} from '../../queries/products/productActions'
import { cartClient } from '../../Apollo/cartClient'
import { RU_LOCALE } from '../../locales/locales'
import { ICartActionsPayload, ICartFetchingMeta } from './ICartActions'

export const useCartActions = (data?: ICartActionsPayload) => {
  const [refetchDataState, setRefetchDataState] = useState<boolean>(true)
  const [cartProducts, setCartProducts] = useState<ICartItem_properties_data[]>(
    [],
  )
  const [fetchingMeta, setFetchingMeta] = useState<ICartFetchingMeta>({
    error: null,
    loading: false,
  })

  // CREATION BLOCK
  const [onMutateCart_create] = useMutation<
    ICartCollection_created,
    ICartCollectionVariables
  >(CREATE_CART_COLLECTION, {
    onError: (ex) => {
      handleCartExc(ex.graphQLErrors)
    },
  })

  const cartCreateNew = useCallback<
    ICreationFnc<ICartCollectionVariables, ICartCollection_created>
  >(
    async (variables: ICartCollectionVariables) => {
      return await onMutateCart_create({ variables: variables }).then(
        (data) => {
          return data?.data
        },
      )
    },
    [onMutateCart_create],
  )

  const _creationResolver = (data: ICartCollection_created) => {
    const newCartModel = data?.create_cartCollection_item?.cart_model
    if (newCartModel) cartItemsUpdater(newCartModel)
  }

  // UPDATING BLOCK
  const [onMutateCart_update] = useMutation<
    ICartCollection_updated,
    ICartCollectionVariables
  >(UPDATE_CART_BY_ID, {
    onError: (ex) => {
      handleCartExc(ex.graphQLErrors)
    },
  })

  const cartUpdateItem = useCallback<
    IUpdateFnc<ICartCollectionVariables, ICartCollection_updated>
  >(
    async (variables: ICartCollectionVariables) => {
      return await onMutateCart_update({ variables: variables }).then(
        (data) => {
          return data?.data
        },
      )
    },
    [onMutateCart_update],
  )

  const _updateResolver = (data: ICartCollection_updated) => {
    const newCartModel = data?.update_cartCollection_item?.cart_model
    if (newCartModel) cartItemsUpdater(newCartModel)
  }

  // SESSION HANDLING
  const {
    handleSessionException,
    getSessionFromLS,
    removeSession,
    updateData,
  } = useSessionActions<
    ICartCollectionVariables,
    ICartCollection_created,
    ICartCollection_updated,
    IDirectusGraphQlErrors
  >(
    'id',
    {
      creation: cartCreateNew,
      update: cartUpdateItem,
    },
    {
      sessionIDGetterForCreation: (data) => {
        return data?.create_cartCollection_item?.id.toString()
      },
      updateResolver: _updateResolver,
      creationResolver: _creationResolver,
    },
  )

  // CART EXCEPTIONS HANDLING
  const handleCartExc = useCallback(
    (ex: IDirectusGraphQlErrors) => {
      const nonExistentCartHandling = () => {
        return ex.find((el) => el.extensions?.code === 'FORBIDDEN')
      }

      handleSessionException({
        ex: ex,
        onHandle: (ex, fnc, vars) => {
          const nonExistentCartError = nonExistentCartHandling()

          if (
            ex?.length > 0 &&
            nonExistentCartError &&
            refetchDataState &&
            fnc &&
            vars
          ) {
            setRefetchDataState(false)
            removeSession()

            fnc({
              ...vars,
              id: null,
            }).then((data) => {
              if (!data.result || !data.id) {
                console.log(
                  'OOPS, something went wrong, refresh page =) ',
                  refetchDataState,
                )
              }
            })
          }
        },
      })
    },
    [handleSessionException, refetchDataState, removeSession],
  )

  // UPDATE CART ITEMS STATE
  const cartItemsUpdater = useCallback(
    (data: ICartItem[]) => {
      const newCartItems = new Array<ICartItem_properties_data>()
      data?.map((_el) => {
        newCartItems.push({
          productId: _el.product_id,
          quantity: _el.quantity,
        } as ICartItem_properties_data)
      })
      setCartProducts(newCartItems)
    },
    [setCartProducts],
  )

  // REFETCH CART
  const cartItemsFetch = useCallback(async () => {
    const session = getSessionFromLS()?.toString()
    if (!session) return

    cartClient
      .query({
        query: GET_CART_COLLECTION_BY_ID,
        variables: <{ id: string }>{ id: getSessionFromLS()?.toString() },
      })
      .then((el) => {
        el?.data
          ? cartItemsUpdater(el.data.cartCollection_by_id?.cart_model)
          : setFetchingMeta({ error: el.error, loading: el.loading })
      })
  }, [cartItemsUpdater, getSessionFromLS])

  // AUTO FETCHING CART
  useEffect(() => {
    if (data?.cartAutoFetching) cartItemsFetch()
  }, [cartItemsFetch, data?.cartAutoFetching])

  // CART MOVEMENTS - ADD TO CART
  const cartAdder = useCallback<cartAdder_fnc>(
    async (id) => {
      if (!cartProducts) return false

      const newCart = products_addItem_actionsHelper(cartProducts, id, 1)

      const vars = {
        id: null,
        data: {
          status: 'Draft',
          cart_model: redefining_to_CartModel_redefiningHelper(newCart),
        },
      } as ICartCollectionVariables

      updateData(vars)

      return true
    },
    [cartProducts, updateData],
  )

  // CART MOVEMENTS - REMOVE FROM CART
  const cartRemover = useCallback<deleteProduct_fnc>(
    async (id, callBack) => {
      const newCart = products_removeItem_actionsHelper(cartProducts, id)

      if (!cartProducts || !getSessionFromLS()) return false

      const vars = {
        id: getSessionFromLS()?.toString(),
        data: {
          status: 'Draft',
          cart_model: redefining_to_CartModel_redefiningHelper(newCart),
        },
      } as ICartCollectionVariables

      updateData(vars)

      return true
    },
    [cartProducts, getSessionFromLS, updateData],
  )

  // CART MOVEMENTS - GETTING ITEM BY ID

  /**
   * Getting cart item by id
   * Warning: For successfully work please pass "regionHandler" property to useCartActions hook.
   */
  const getCartProductDataById: cartItemGetter_fnc = useCallback(
    async (id: number | string, callBack): Promise<IProductData> => {
      let outProduct = {} as IProductData

      if (!data?.regionHandler) {
        console.warn(
          "getCartProductDataById: For successfully work please pass 'regionHandler' property to useCartActions hook.",
        )
        return
      }

      const regionHandler = data?.regionHandler

      await cartClient
        .query<IProducts_Q>({
          query: GET_PRODUCT_BY_ID,
          variables: {
            id: Number(id),
          },
        })
        .then((prod) => {
          if (prod.data && prod.data.Products[0]) {
            const _data = prod.data.Products[0]

            outProduct = {
              id: _data.id,
              image: _data.image_url,

              title: regionHandler
                ? regionHandler.region === RU_LOCALE
                  ? _data.product_name_ru
                  : _data.product_name
                : _data.product_name,

              price: regionHandler
                ? (
                    Number(_data.price) *
                    regionHandler.currency[regionHandler.currentCurrencyId]
                      ?.currencyMultiplier
                  ).toString()
                : _data.price.toString(),

              vendCode: _data.vend_code.toString(),
              slug: _data.slug,
            }
          }

          if (callBack?.sideEffect && callBack?.flag === true)
            callBack.sideEffect(outProduct)
        })

      return outProduct
    },
    [data?.regionHandler],
  )

  // CART MOVEMENTS - EDIT QUANTITY
  const editQuantity = useCallback<quantityEditor_fnc>(
    async (id, newQuantity, callBack) => {
      if (!cartProducts || !getSessionFromLS()) return

      const newCart = products_editQuantity_actionsHelper(
        cartProducts,
        id,
        newQuantity,
      )

      const variables = {
        id: getSessionFromLS(),
        data: {
          status: 'Draft',
          cart_model: redefining_to_CartModel_redefiningHelper(newCart),
        },
      } as ICartCollectionVariables

      await cartClient
        .mutate<ICartCollection_updated>({
          mutation: UPDATE_CART_BY_ID,
          variables: variables,
        })
        .then((el) => {
          if (el.data && callBack?.flag) setCartProducts(newCart)
        })

      return true
    },
    [cartProducts, getSessionFromLS],
  )

  return {
    cData: cartProducts,
    cAdder: cartAdder,
    cRemover: cartRemover,
    cQuantityEditor: editQuantity,
    cFetch: cartItemsFetch,
    cItemById: getCartProductDataById,
    cMeta: fetchingMeta,
  }
}
