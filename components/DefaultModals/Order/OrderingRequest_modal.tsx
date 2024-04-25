import React, { FC } from 'react'
import styles from '../../../styles/Modals/order/ordering_request.module.scss'
import ISTInput, { inputTypesVars } from '../../UI/ISTInput/ISTInput'
import ISTButtonN from '../../UI/ISTButton/ISTButtonN'
import { IOrderRequest } from './common'

const OrderingRequest_modal: FC<IOrderRequest> = ({ translation }) => {
  return (
    <>
      <div className={styles.orderRequestBox}>
        <div className={styles.input}>
          <div>{translation?.contactPhoneText}</div>

          <ISTInput
            placeholder={translation?.placeholderPhone}
            inputType={inputTypesVars.phone}
            style={{ borderRadius: '5px 25px 25px 20px', height: '50px' }}
            actualData=""
            outDataSetter={() => {}}
            required={true}
          />
        </div>

        <div className={styles.description}>
          <div>{translation?.descriptionText}</div>
          <div>{translation?.descriptionTextInformation}</div>
        </div>

        <div className={styles.input}>
          <div>{translation?.IPNText}</div>

          <ISTInput
            placeholder={'0000000000000'}
            inputType={inputTypesVars.any_string}
            style={{ borderRadius: '5px 25px 25px 20px', height: '50px' }}
            actualData=""
            outDataSetter={() => {}}
            required={true}
          />
        </div>

        <div className={styles.input}>
          <div>{translation?.organizationNameText}</div>

          <ISTInput
            placeholder={translation?.organizationName}
            inputType={inputTypesVars.any_string}
            style={{ borderRadius: '5px 25px 25px 20px', height: '50px' }}
            actualData=""
            outDataSetter={() => {}}
            required={true}
          />
        </div>

        <div className={styles.input}>
          <div>{translation?.fullNameRepresentativeText}</div>

          <ISTInput
            placeholder={translation?.fullNameRepresentative}
            inputType={inputTypesVars.any_string}
            style={{ borderRadius: '5px 25px 25px 20px', height: '50px' }}
            actualData=""
            outDataSetter={() => {}}
            required={true}
          />
        </div>

        <div className={styles.input}>
          <div>{translation?.emailText}</div>

          <ISTInput
            placeholder={translation?.email}
            inputType={inputTypesVars.any_string}
            style={{ borderRadius: '5px 25px 25px 20px', height: '50px' }}
            actualData=""
            outDataSetter={() => {}}
            required={true}
          />
        </div>
      </div>
    </>
  )
}

export default OrderingRequest_modal
