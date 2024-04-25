import styles from '../../../styles/OurPartners/ourPartnersPage.module.scss'
import PartnersList, { sliderPositionVar } from './PartnersList'
import { FC, useCallback, useEffect, useState } from 'react'
import { IGallery, TGallerySlide } from '../GalleryTypes'
import { useAppDispatch } from '@root/Hooks/reduxSettings'
import { puModalOpenByName } from '@root/store/slices/modalSlice/modalSlice'
import { toc_callback_modal } from '@root/components/modals/popUp/store/callBack/ICallBackModel'
import { toc_contacts_modal } from '@root/components/modals/popUp/store/contacts/IContactsModal'

export interface IOurPartnersPage_translation {
  joinUs: string
  send: string
  orderCall: string
  contact: string
}

interface IOurPartnersPage {
  gallery: TGallerySlide[]
  translation: IOurPartnersPage_translation
}

const OurPartnersPage: FC<IOurPartnersPage> = ({ gallery, translation }) => {
  const [partnersList, setPartnersList] = useState<IGallery>()
  const dispatch = useAppDispatch()

  useEffect(() => {
    setPartnersList(
      gallery?.length > 0
        ? {
            slides: gallery,
          }
        : null,
    )
  }, [gallery])

  const openCBRequestModal = useCallback(() => {
    const callBackModal = toc_callback_modal
    if (callBackModal && callBackModal.typeName)
      dispatch(puModalOpenByName(callBackModal.typeName))
  }, [dispatch])

  const openContactsModal = useCallback(() => {
    const contactsModal = toc_contacts_modal
    if (contactsModal && contactsModal.typeName)
      dispatch(puModalOpenByName(contactsModal.typeName))
  }, [dispatch])

  return (
    <>
      <div
        className={
          'col-lg-7 col-md-10 col-sm-12 col-12 d-flex align-items-center mx-auto w-100'
        }
      >
        <div className={'w-100 flex-grow-1'}>
          <PartnersList
            items={partnersList}
            layout={[
              {
                rows: 3,
                cols: 2,
                windowWidth: 0,
                sliderOption: sliderPositionVar.side,
                maxWidth: '400px',
              },

              {
                rows: 2,
                cols: 4,
                windowWidth: 576,
                sliderOption: sliderPositionVar.bottom,
                maxWidth: '700px',
              },

              {
                rows: 2,
                cols: 3,
                windowWidth: 968,
                sliderOption: sliderPositionVar.bottom,
                maxWidth: '700px',
              },

              {
                rows: 2,
                cols: 4,
                windowWidth: 1200,
                sliderOption: sliderPositionVar.bottom,
                maxWidth: '720px',
              },
            ]}
          />
        </div>
      </div>
      <div
        className={
          'col-lg-5 col-md-10 col-12 d-flex align-items-center mx-auto'
        }
      >
        <div className={styles.PartnersJoinBlock}>
          <p>{translation?.joinUs}</p>
          <a>{translation?.send}:</a>
          <div>
            <button
              className={styles.primaryButton}
              onClick={openCBRequestModal}
            >
              {translation?.orderCall}
            </button>

            <button onClick={openContactsModal}>{translation?.contact}</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default OurPartnersPage
