import React, { FC } from 'react'
import styles from '@root/styles/Modals/popUp/cooperation/CooperationMessage.module.scss'
import bg_image from './bg.svg'
import Image from 'next/image'
import ISTButtonN from '@root/components/UI/ISTButton/ISTButtonN'
import { IGratitudeModal } from './IGratitudeModal'

const GratitudeModal: FC<IGratitudeModal> = ({
  translation,
  onShowContacts,
}) => {
  return (
    <>
      <div className={styles.modalBox}>
        <div className={styles.imageBlock}>
          <Image
            alt="background image"
            src={bg_image}
            height={200}
            style={{
              objectFit: 'contain',
              right: '20px',
              position: 'absolute',
            }}
          />
        </div>
        <div className={styles.mainText}>{translation.mainText}</div>
        <div className={styles.button}>
          <ISTButtonN
            theme="dark"
            accent="important"
            size="S"
            title={{
              caption: translation?.buttonText,
            }}
            onClick={onShowContacts}
          />
        </div>
      </div>
    </>
  )
}

export default GratitudeModal
