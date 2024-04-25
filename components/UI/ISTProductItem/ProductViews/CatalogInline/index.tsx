import React, { FC, useEffect, useState } from 'react'
import styles from './index.module.scss'

import noImg from '../src/Empty_Prod_image.svg'
import Image from 'next/image'
import { IProductItem_catalog } from '../../Abstract/ICatalogTypes'

import { IProductData } from '../../../common'

const CatalogInline: FC<IProductItem_catalog> = ({
  style,
  currencySymbol,
  data,
}) => {
  const [productData, setProductData] = useState<IProductData>()

  useEffect(() => {
    if (data) setProductData(data)
  }, [data])

  return (
    <>
      <div
        className={styles.productCardVariant_Inline}
        style={{
          margin: style?.margin,
        }}
      >
        <div className={styles.cardInline}>
          <div className={styles.imageBox}>
            {productData.image ? (
              <Image alt="Product Item Image" src={productData.image} />
            ) : (
              <Image width={120} alt="Product item empty image" src={noImg} />
            )}
          </div>

          <div className={styles.productInformationInline}>
            <div className={styles.title}>
              <div className={styles.productTitle}>{productData.title}</div>
              <div className={styles.vendCode}>
                Артикул: {productData.vendCode}
              </div>
            </div>

            <div className={styles.price}>Цена: {productData.price}$</div>
          </div>
        </div>
      </div>
    </>
  )
}

export default CatalogInline
