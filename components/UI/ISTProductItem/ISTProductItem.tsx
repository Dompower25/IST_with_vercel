import React, { FC } from 'react'
import CatalogView from './ProductViews/CatalogDefault/Index'
import CatalogInline from './ProductViews/CatalogInline'
import { IProductItem } from './common'
import CartDistributor from './CartDistributor'
import { ISTProductItemDistributor_Context } from './Context'

const IstProductItem: FC<IProductItem> = ({
  itemType,
  currencySymbol,

  style,
  forwardingPath,
  imageOptimization,
}) => {
  switch (itemType.productType) {
    case 'catalog': {
      if (itemType.parameters.inline) {
        return (
          <CatalogInline
            data={itemType.data}
            style={style}
            currencySymbol={currencySymbol}
            cartStatus={itemType.parameters.cartStatus}
            cartRemover={itemType.parameters.cartRemover}
            cartAdder={itemType.parameters.cartAdder}
            forwardingPath={forwardingPath}
            imageOptimization={imageOptimization}
          />
        )
      } else {
        return (
          <CatalogView
            data={itemType.data}
            style={style}
            currencySymbol={currencySymbol}
            cartStatus={itemType.parameters.cartStatus}
            cartAdder={itemType.parameters.cartAdder}
            cartRemover={itemType.parameters.cartRemover}
            forwardingPath={forwardingPath}
            imageOptimization={imageOptimization}
          />
        )
      }
    }
    case 'cart': {
      return (
        <ISTProductItemDistributor_Context.Provider
          value={{
            mobileSettings: itemType.mobileSettings,
            cartSelector: itemType.cartSelector,
            blocked: itemType.blocked,
            data: itemType.data,
            imageOptimization,
            currencySymbol,
            forwardingPath,
            style,
          }}
        >
          <CartDistributor />
        </ISTProductItemDistributor_Context.Provider>
      )
    }
  }
}

export default IstProductItem
