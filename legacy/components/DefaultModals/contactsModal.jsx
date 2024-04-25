import PopUpBase from '../PopUpBase'
import styles from './contactsModal.module.scss'
import { useEffect, useState } from 'react'
import { getOurContacts } from '../../queries/getOurContacts'
import { getData } from '../../queries/getData'
import Link from 'next/link'

export default function ContactsModal({ modalState, modalSwitcher }) {
  const [modalContent, setModalContent] = useState()

  useEffect(() => {
    let isMounted = true

    const contentLoad = async () => {
      const data = await getData(getOurContacts, 'ourContacts', {})
      if (isMounted) setModalContent(data)
    }
    if (!modalContent) {
      contentLoad()
    }

    return () => {
      isMounted = false
    }
  }, [])

  return modalContent ? (
    <>
      <PopUpBase
        puState={modalState}
        closer={modalSwitcher}
        header={'Наши контакты'}
        paragraph={'Мы всегда рады помочь вам!'}
      >
        <div className={styles.contacts}>
          <div className={styles.contactsData}>
            Адрес электронной почты:
            <span>
              <a href={`mailTo: ${modalContent.ourEmail.emailAddress}`}>
                {modalContent.ourEmail.emailAddress}
              </a>
            </span>
          </div>

          <div className={styles.contactsData}>
            Наш телефон:
            <span>
              <a href={`tel: ${modalContent.phone_number_ru.phoneNum}`}>
                {modalContent.phone_number_ru.phoneNum}
              </a>
            </span>
          </div>

          <div className={styles.contactsData}>
            Наш адрес:
            <span>
              <a>{modalContent.address}</a>
            </span>
          </div>
        </div>

        <Link href={`${modalContent.address_map}`} passHref>
          <a className={styles.outLink} target="_blank">
            Показать на карте
          </a>
        </Link>
      </PopUpBase>
    </>
  ) : null
}
