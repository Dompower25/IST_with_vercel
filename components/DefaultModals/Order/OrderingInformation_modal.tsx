import React, { FC } from 'react'
import styles from '../../../styles/Modals/order/ordering_information.module.scss'
import { IOrderingInformation } from './common'

const OrderingInformation_modal: FC<IOrderingInformation> = ({
  children,
  translation,
}) => {
  return (
    <>
      <div className={styles.order}>
        <div className={styles.cartProducts}>{children}</div>
      </div>
    </>
  )
}

export default OrderingInformation_modal
