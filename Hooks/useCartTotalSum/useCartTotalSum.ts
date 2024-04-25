import { ICartTotalSum, ICartTotalSum_prodsInf } from './ICartTotalSum'
import { useCallback, useEffect, useState } from 'react'
import { IProductData } from '../../components/UI/common'

export const useCartTotalSum = ({
  cartSelector,
  getProductByIdQuery_func,
}: ICartTotalSum) => {
  const getItemsInfo = useCallback(async (): Promise<
    ICartTotalSum_prodsInf[]
  > => {
    if (!getProductByIdQuery_func || !cartSelector) {
      return
    }

    const result = await Promise.all(
      cartSelector.map((cart_sel_id, idx) =>
        getProductByIdQuery_func(cart_sel_id?.id).catch((ex) =>
          console.warn(ex),
        ),
      ),
    )

    const prodsInfo: ICartTotalSum_prodsInf[] = []
    result.forEach((item) => {
      const productData = item as IProductData
      prodsInfo.push({
        productId: productData?.id,
        pricePerItem: Number(productData?.price),
      })
    })

    return prodsInfo
  }, [cartSelector, getProductByIdQuery_func])

  return {
    getItemsInfo,
  }
}
