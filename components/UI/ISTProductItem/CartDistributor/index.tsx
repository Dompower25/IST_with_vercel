import React, { FC, useContext, useEffect, useState } from 'react'
import styles from './index.module.scss'
import CartFunctional from '../ProductViews/CartFunctional'
import CartFunctional_mobile from '../ProductViews/CartFunctional_mobile'
import { ISTProductItemDistributor_Context } from '../Context'
import { IProductData } from '../../common'

const CartDistributor: FC = () => {
  const {
    mobileSettings,
    data,
    cartSelector,
    forwardingPath,
    imageOptimization,
  } = useContext(ISTProductItemDistributor_Context)

  const [productData, setProductData] = useState<IProductData>()
  const [currentQuantity, setCurrentQuantity] = useState<number>(data?.quantity)
  const [checkedState, setCheckedState] = useState<boolean>(false)

  // SELECT / DESELECT
  useEffect(() => {
    setCheckedState(
      cartSelector?.selectedState.findIndex(
        (el) => el.id === cartSelector?.data?.id,
      ) > -1,
    )
  }, [cartSelector])
  //

  // Tracking the props of the number of elements
  useEffect(() => {
    if (data?.quantity) setCurrentQuantity(data.quantity)
  }, [data.quantity])
  //

  // Getting information about a specific product
  useEffect(() => {
    let isSub = true
    if (data.cartItemGetter)
      data
        .cartItemGetter(data.productId, {
          sideEffect: setProductData,
          flag: isSub,
        })
        .catch((ex) => console.warn(ex))

    return () => {
      isSub = false
    }
  }, [data])
  //

  // Data and event transmission function ( REMOVE ITEM )
  const deleteProductBuilder = () => {
    if (data.deleteProduct)
      data
        .deleteProduct(data.productId)
        .then(() => {
          if (cartSelector) {
            cartSelector.setSelectedState((prevState) => {
              const newSate = [...prevState]
              const idx = newSate?.findIndex(
                (el) => el.id === cartSelector.data.id,
              )
              idx > -1 && newSate ? newSate.splice(idx, 1) : null

              return newSate
            })
          }
        })
        .catch((ex) => console.warn(ex))
  }
  //

  // Data and event transmission function ( EDIT QUANTITY )
  const quantityEditorBuilder = (quantity: number) => {
    let isSub = true
    if (data.quantityEditor)
      data
        .quantityEditor(data.productId, quantity, {
          sideEffect: setCurrentQuantity,
          flag: isSub,
        })
        .then(() => {
          if (cartSelector) {
            cartSelector.data = {
              ...cartSelector.data,
              quantity: quantity,
            }

            cartSelector?.setSelectedState((prevState) => {
              const newSate = [...prevState]
              const idx = newSate?.findIndex(
                (el) => el.id === cartSelector.data.id,
              )
              idx > -1 && newSate ? (newSate[idx] = cartSelector.data) : null

              return newSate
            })
          }
        })
        .catch((ex) => console.warn(ex))

    return () => {
      isSub = false
    }
  }

  return (
    <>
      <div
        className={`${styles[`desktop_${mobileSettings?.mobileSizeTrigger}`]} ${
          styles[`def_desktop`]
        }`}
      >
        <CartFunctional
          productData={productData}
          currentQuantity={currentQuantity}
          checkedState={checkedState}
          onEditQuantity={quantityEditorBuilder}
          onRemoveItem={deleteProductBuilder}
        />
      </div>
      <div
        className={`${styles[`mobile_${mobileSettings?.mobileSizeTrigger}`]} 
      ${styles[`def_mobile`]}`}
      >
        <CartFunctional_mobile
          productData={productData}
          currentQuantity={currentQuantity}
          checkedState={checkedState}
          onEditQuantity={quantityEditorBuilder}
          onRemoveItem={deleteProductBuilder}
        />
      </div>
    </>
  )
}

export default CartDistributor
