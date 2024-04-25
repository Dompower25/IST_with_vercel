import React, { FC, ReactNode, useEffect, useState } from 'react'
import styles from './index.module.scss'
import IstButtonN from '../ISTButton/ISTButtonN'

export interface ICartTotalSum_translation {
  title: string
  products: string
  sale: string
  totalSum: string
  order: string
}

interface ICartTotalSum_region {
  currencySymbol: string
  region: Intl.LocalesArgument
}

interface ICartTotalSum {
  totalSum: number
  totalSelect: number
  region: ICartTotalSum_region
  translation: ICartTotalSum_translation
  sendOrderFun?: (...props) => any
}

const ISTCartTotalSum: FC<ICartTotalSum> = ({
  totalSelect,
  totalSum,
  region,
  translation,
  sendOrderFun,
}) => {
  return (
    <div className={styles.cart}>
      <div className={styles.cartLabel}>
        <div className={styles.yourCart}>
          {translation?.title}
          <div className={styles.productsQuantity}>
            {totalSelect ? totalSelect : 0}
          </div>
        </div>

        <div className={styles.mobileTotalValue}>
          <span className={styles.sumTitle}>{translation.totalSum}</span>
          <span className={styles.sumValue}>
            {totalSum
              ? `${totalSum.toLocaleString(region.region, {
                  maximumFractionDigits: 2,
                })}`
              : 0}
          </span>
          {region.currencySymbol}
        </div>
      </div>
      <div className={`${styles.prodSaleBox}`}>
        <div className={styles.prod}>
          <div className={styles.title}>
            {translation?.products} ({totalSelect ? totalSelect : 0})
          </div>
          <div className={styles.total}>
            <span>
              {totalSum
                ? `${totalSum.toLocaleString(region.region, {
                    maximumFractionDigits: 2,
                  })}`
                : 0}
            </span>
            <span>{region.currencySymbol}</span>
          </div>
        </div>
        <div className={styles.sale}>
          <div className={styles.title}>{translation?.sale}</div>
          <div className={styles.total}>{region.currencySymbol}</div>
        </div>
      </div>
      <div className={styles.sumBox}>
        <div className={styles.totalSum}>
          {translation?.totalSum}
          <span>
            {totalSum
              ? `${totalSum.toLocaleString(region.region, {
                  maximumFractionDigits: 2,
                })}`
              : 0}
          </span>
          {region.currencySymbol}
        </div>

        <div className={`${styles.discountMobile} ${styles.mobileTotalValue}`}>
          <span className={styles.sumTitle}>{translation.sale}</span>
          {region.currencySymbol}
        </div>

        <IstButtonN
          theme="dark"
          accent="inactive"
          size="M"
          mobileTriggerSize="SM_576"
          title={{
            caption: translation?.order,
          }}
          // onClick={sendOrderFun}
        />
      </div>
    </div>
  )
}

export default ISTCartTotalSum
