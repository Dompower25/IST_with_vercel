import { FC, useCallback, useEffect, useState } from 'react'
import ISTProductItem from '../../UI/ISTProductItem/ISTProductItem'
import { IOrderedCartWrapper } from './common'

export const OrderedCartWrapper: FC<IOrderedCartWrapper> = ({
  imageOptimization,
  selectedItems,
  cartItemGetter,
  region,
}) => {
  return (
    <>
      {selectedItems?.map((el, idx) => {
        return (
          <ISTProductItem
            style={{
              margin: '0 0 10px 0',
            }}
            currencySymbol={
              region.currency[region.currentCurrencyId]?.currencySymbol
            }
            imageOptimization={imageOptimization}
            key={`ISTProductItem_${idx}`}
            itemType={{
              blocked: true,
              productType: 'cart',
              mobileSettings: {
                mobileSizeTrigger: 'SM_576',
              },

              data: {
                productId: el?.id,
                quantity: Number(el?.quantity) ?? 0,
                cartItemGetter: cartItemGetter,
              },
            }}
          />
        )
      })}
    </>
  )
}
