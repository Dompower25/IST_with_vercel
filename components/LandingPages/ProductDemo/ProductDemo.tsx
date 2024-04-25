import React, { FC, useCallback } from 'react'
import styles from '../../../styles/LandingStyles/PagesComponents/ProductDemo/ProdDemo.module.scss'
import Image from 'next/image'
import { useAppDispatch } from '@root/Hooks/reduxSettings'
import { puModalOpenByName } from '@root/store/slices/modalSlice/modalSlice'
import { toc_callback_modal } from '@root/components/modals/popUp/store/callBack/ICallBackModel'
import { TGallerySlide } from '../GalleryTypes'

export interface IProductDemo_translation {
  more: string
  openCatalog: string
  questions: string
  leave: string
  request: string
  call: string
  headerReq: string
  paragraphReq: string
  headerRes: string
  paragraphRes: string
}

interface IActionsHandlers {
  catalogOpener?: (props: unknown) => unknown
}
interface IPage {
  translation: IProductDemo_translation
  onClick: (route: string) => void
  gallery: TGallerySlide[]
}

const ProductDemo: FC<IPage> = ({ translation, onClick, gallery }) => {
  const dispatch = useAppDispatch()

  //user contacts for CB request
  // const [newCB_data, setNewCB_data] = useState<ICB_RequestModalData>(null)

  // useEffect(() => {
  //   if (newCB_data && modalComponent)
  //     modalComponent
  //       .applyModalByName(toc_cooperation_message.typeName)
  //       .then((el) => setCurrentModal(el.index))
  // }, [newCB_data, modalComponent])

  // const handleSwitcherByContactsModal = useCallback(() => {
  //   modalComponent
  //     .applyModalByName(toc_contacts.typeName)
  //     .then(() => modalComponent.switch(true))
  // }, [modalComponent])

  const handleCB_Request = useCallback(() => {
    const callBackModal = toc_callback_modal
    if (callBackModal && callBackModal.typeName)
      dispatch(puModalOpenByName(callBackModal.typeName))
  }, [dispatch])

  return (
    <>
      <div className={`col-12 ${styles.pdPage}`}>
        <div className={styles.pdList}>
          {gallery?.map((content, cont_i) => (
            <div className={styles.prTypeCard} key={cont_i}>
              <div className={styles.imageBlock}>
                <Image
                  src={content.image}
                  fill={true}
                  style={{
                    objectFit: 'contain',
                  }}
                  alt="product_category"
                  priority={true}
                  sizes={'100px'}
                />
              </div>
              <div className={styles.textBlock}>
                <p>{content?.title}</p>

                <button
                  style={{
                    opacity: 0,
                  }}
                  onClick={() => {
                    onClick ? onClick(content?.action) : null
                  }}
                >
                  {translation?.more}...
                </button>
              </div>
            </div>
          ))}

          <div className={`${styles.prTypeCard} ${styles.opener}`}>
            <button
              onClick={() => {
                onClick ? onClick('/products') : null
              }}
            />
            <div className={styles.imageBlock}>
              <Image
                src={'/op_catalog.svg'}
                fill={true}
                style={{
                  objectFit: 'contain',
                }}
                alt="product_category"
                priority={true}
                sizes={'250px'}
              />
            </div>
            <div className={styles.textBlock}>
              <p>{translation?.openCatalog}</p>
            </div>
          </div>
        </div>

        <div className={styles.helpBlock}>
          <p>{translation?.questions}</p>
          <a>
            {translation?.leave}{' '}
            <span
              onClick={() => {
                handleCB_Request()
              }}
            >
              {translation?.request}
            </span>{' '}
            {translation?.call}
          </a>
        </div>
      </div>
    </>
  )
}

export default ProductDemo
