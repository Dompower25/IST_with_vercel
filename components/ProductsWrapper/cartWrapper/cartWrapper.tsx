import React, { FC, useCallback, useEffect, useState } from 'react'
import ISTProductItem from '../../UI/ISTProductItem/ISTProductItem'
import { useAppSelector } from '../../../Hooks/reduxSettings'
import { useCartTotalSum } from '../../../Hooks/useCartTotalSum/useCartTotalSum'
import { ICartTotalSum_prodsInf } from '../../../Hooks/useCartTotalSum/ICartTotalSum'
import styles from './cartWrapper.module.scss'
import { ICartWrapper } from './ICartWrapper'
import { useCartActions } from '../../../Hooks/useCartActions/useCartActions'
import { useImageOptimization } from '../../../Hooks/useImageOptimization/useImageOptimization'

export const CartWrapper: FC<ICartWrapper> = ({
  cartSelector,
  loadingSetter,
  cartEmptyMessage,

  mobileTriggerSize,
  itemStyles,
  wrapperStyles,

  amountData,
}) => {
  // IMAGE OPTIMIZATION
  let cloudinary_acc = process.env.NEXT_PUBLIC_CLOUDINARY_ACC
  const PROD_IMAGES_ROOT = process.env.NEXT_PUBLIC_PROD_IMAGES_ROOT
  const PROD_NAME_INCLUDED_PART =
    process.env.NEXT_PUBLIC_PROD_NAME_INCLUDED_PART

  const { sourcedLoader } = useImageOptimization(
    cloudinary_acc,
    PROD_NAME_INCLUDED_PART,
    PROD_IMAGES_ROOT,
  )

  const regionHandler = useAppSelector((selector) => selector.region)
  const { cItemById, cRemover, cData, cQuantityEditor, cMeta } = useCartActions(
    {
      cartAutoFetching: true,
      regionHandler: regionHandler,
    },
  )

  const { getItemsInfo } = useCartTotalSum({
    cartSelector: cartSelector.selectedState,
    getProductByIdQuery_func: cItemById,
  })

  useEffect(() => {
    const calcTotalSum = (prodsInf: ICartTotalSum_prodsInf[]) => {
      let totalPrice = 0
      let totalSelectedNum = 0

      cartSelector.selectedState.map((el, i) => {
        const selectedProduct = el
        const fetchedProduct = prodsInf.find(
          (product) => product.productId === selectedProduct.id,
        )

        if (fetchedProduct) {
          const itemPrice =
            fetchedProduct.pricePerItem * Number(selectedProduct.quantity)
          totalPrice += itemPrice
          totalSelectedNum += Number(selectedProduct.quantity)
        }
      })

      amountData?.amountPriceSetter(totalPrice)
      amountData?.amountQuantitySetter(totalSelectedNum)
    }

    getItemsInfo().then((data) => calcTotalSum(data))
  }, [amountData, cartSelector, getItemsInfo])

  /**
   *  LOADING HANDLER
   */
  useEffect(() => {
    loadingSetter(cMeta.loading)
  }, [cMeta.loading, loadingSetter])

  /**
   *  CART WRAPPER VIEW
   */
  return (
    <div className={styles.cartWrapper}>
      {cData?.length < 1 || cMeta.error ? (
        <div className={styles.emptyCart}>
          <div className={styles.emptyCart_title}>
            {cartEmptyMessage.header}
          </div>
          <div className={styles.emptyCart_hint}>{cartEmptyMessage.hint}</div>
        </div>
      ) : (
        <>
          <div style={wrapperStyles}>
            {cData.map((el, index) => {
              return (
                <ISTProductItem
                  key={`ISTProductItem_${index}`}
                  currencySymbol={
                    regionHandler.currency[regionHandler.currentCurrencyId]
                      ?.currencySymbol
                  }
                  imageOptimization={{
                    loader: sourcedLoader,
                    sizes: '350px',
                  }}
                  style={itemStyles?.style}
                  itemType={{
                    productType: 'cart',
                    mobileSettings: {
                      mobileSizeTrigger: mobileTriggerSize,
                    },

                    cartSelector: {
                      data: {
                        id: el?.productId,
                        quantity: el?.quantity,
                        price: undefined,
                      },

                      selectedState: cartSelector?.selectedState,
                      setSelectedState: cartSelector?.setSelectedState,
                    },

                    data: {
                      productId: el?.productId,
                      quantity: el?.quantity,
                      cartItemGetter: cItemById,
                      quantityEditor: cQuantityEditor,
                      deleteProduct: cRemover,
                    },
                  }}
                />
              )
            })}
          </div>
        </>
      )}
    </div>
  )
}
