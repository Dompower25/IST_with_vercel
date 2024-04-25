import React, { FC, useEffect } from 'react'
import styles from '../../../styles/Modals/order/ordering_dialog.module.scss'
import ISTButtonN from '../../UI/ISTButton/ISTButtonN'
import { IOrderingDialog } from './common'
import { useAppSelector } from '../../../Hooks/reduxSettings'

const OrderingFooterDialog: FC<IOrderingDialog> = ({
  totalSelect,
  totalSum,
  translation,
  openOrderingInfo,
  openRequestPage,
  placeOrder,
  openingModal,
}) => {
  // const region = useAppSelector((sel) => sel.region)

  return (
    <>
      {/* <div className={styles.orderDialog}>
        <div className={styles.cost}>
          <div className={styles.select}>
            <div>{translation?.products}:</div>
            <div>{totalSelect}</div>
          </div>
          <div className={styles.totalSum}>
            <div>{translation?.sum}:</div>
            <div>
              {totalSum
                ? `${totalSum.toLocaleString(region.region, {
                    maximumFractionDigits: 2,
                  })}`
                : 0}
              {region.currency[region.currentCurrencyId]?.currencySymbol}
            </div>
          </div>
        </div>

        <div className={styles.buttonsDialog}>
          {openingModal === 0 ? (
            <div className={styles.buttonInformationDialog}>
              <ISTButtonN
                theme="dark"
                accent="important"
                size="M"
                mobileTriggerSize="SM_576"
                title={{
                  caption: translation?.continueOrder,
                }}
                onClick={openRequestPage}
              />
            </div>
          ) : (
            <div className={styles.buttonsRequestDialog}>
              <div className={styles.leftButton}>
                <ISTButtonN
                  theme="dark"
                  accent="important"
                  size="M"
                  mobileTriggerSize="SM_576"
                  title={{
                    caption: translation?.buttonOrdering,
                  }}
                  onClick={placeOrder}
                />
              </div>

              <div className={styles.rightButton} onClick={openOrderingInfo}>
                {translation?.buttonOrderingDetails}
              </div>
            </div>
          )}
        </div>
      </div> */}
    </>
  )
}

export default OrderingFooterDialog
