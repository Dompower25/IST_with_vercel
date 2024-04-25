import React, { FC } from 'react'
import CallBack, { ICallBack_translation } from './CallBack'
import { TGallerySlide } from '../GalleryTypes'
import { useTransition } from '../../../Hooks/useTranslation/useTranslation'
import { EN_LOCALE, RU_LOCALE } from '../../../locales/locales'
import ru_callback from '../../../locales/callback/ru'
import en_callback from '../../../locales/callback/en'
import Gallery from './Gallery/Gallery'
import { useRouter } from 'next/router'
import { useAppSelector } from '@root/Hooks/reduxSettings'

interface IHelloPage {
  gallery: TGallerySlide[]
}

const HelloPage: FC<IHelloPage> = ({ gallery }) => {
  
  const contacts = useAppSelector((sel) => sel.contacts);
  const currencyTranslationCallBack = useTransition<ICallBack_translation>([
    { locale: RU_LOCALE, translation: ru_callback },
    { locale: EN_LOCALE, translation: en_callback },
  ])

  return (
    <>
      <div className={'col-md-12 col-lg-6 order-lg-0 order-1 d-flex '}>
        <CallBack
          translation={currencyTranslationCallBack?.translation}
          contactsData={contacts}
        />
      </div>

      <div
        className={
          'col-md-12 col-lg-6 d-flex mt-4 mb-4 mt-lg-0 mb-lg-0 position-static'
        }
      >
        <Gallery slides={gallery} triggerMobileSize={'LG_992'} />
      </div>
    </>
  )
}

export default HelloPage
