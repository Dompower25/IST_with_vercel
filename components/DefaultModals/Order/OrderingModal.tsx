import { FC, useCallback, useEffect, useState } from 'react'
import useBaseModal from '../../../Hooks/useBaseModal/useBaseModal'
import { useQueryBuilder } from '../../../Hooks/useQueryBuilder/useQueryBuilder'
import PuWrapper from '../../modals/popUp/puWrapper'
import {
  ICartSelected,
  IOrderRequest_translation,
  IOrderingDialog_translation,
  IOrderingInformation_translation,
  IOrderingModal,
} from './common'
import { useTransition } from '../../../Hooks/useTranslation/useTranslation'
import { EN_LOCALE, RU_LOCALE } from '../../../locales/locales'

import { toc_order_information } from '../../DefaultModals/table_of_contents/order/toc_order_information'
import { toc_order_request } from '../../DefaultModals/table_of_contents/order/toc_order_request'

import ru_order_information from '../../../locales/orderInformation/ru'
import en_order_information from '../../../locales/orderInformation/en'

import ru_order_request from '../../../locales/orderRequest/ru'
import en_order_request from '../../../locales/orderRequest/en'

import ru_order_dialog from '../../../locales/orderDialog/ru'
import en_order_dialog from '../../../locales/orderDialog/en'

import { useAppSelector } from '../../../Hooks/reduxSettings'
import { useCartActions } from '../../../Hooks/useCartActions/useCartActions'
import { ICartSelector_type } from '../../UI/ISTProductItem/Abstract/ICartTypes'
import OrderingInformation_modal from './OrderingInformation_modal'
import OrderingRequest_modal from './OrderingRequest_modal'
import { useImageOptimization } from '../../../Hooks/useImageOptimization/useImageOptimization'
import { OrderedCartWrapper } from './OrderedCartWrapper'
import { useDispatch } from 'react-redux'
import OrderingFooterDialog from './OrderingFooterDialog'

const OrderingModal: FC<IOrderingModal> = ({
  loadingSetter,
  selectedProducts,
  totalSum,
  modalState,
}) => {
  // IMAGE OPTIMIZATION

  // let cloudinary_acc = process.env.NEXT_PUBLIC_CLOUDINARY_ACC
  // const PROD_IMAGES_ROOT = process.env.NEXT_PUBLIC_PROD_IMAGES_ROOT
  // const PROD_NAME_INCLUDED_PART =
  //   process.env.NEXT_PUBLIC_PROD_NAME_INCLUDED_PART

  // const { sourcedLoader } = useImageOptimization(
  //   cloudinary_acc,
  //   PROD_NAME_INCLUDED_PART,
  //   PROD_IMAGES_ROOT,
  // )

  // REGION & TRANSLATION

  // const regionHandler = useAppSelector((selector) => selector.region)

  // const currentTranslationOrderInformation =
  //   useTransition<IOrderingInformation_translation>([
  //     { locale: RU_LOCALE, translation: ru_order_information },
  //     { locale: EN_LOCALE, translation: en_order_information },
  //   ])

  // const currentTranslationOrderRequest =
  //   useTransition<IOrderRequest_translation>([
  //     { locale: RU_LOCALE, translation: ru_order_request },
  //     { locale: EN_LOCALE, translation: en_order_request },
  //   ])

  // const currentTranslationOrderDialog =
  //   useTransition<IOrderingDialog_translation>([
  //     { locale: RU_LOCALE, translation: ru_order_dialog },
  //     { locale: EN_LOCALE, translation: en_order_dialog },
  //   ])

  // const currentTranslationCooperationMessage =
  //   useTransition<ICooperationMessage_translation>([
  //     { locale: RU_LOCALE, translation: ru_cooperation_message },
  //     { locale: EN_LOCALE, translation: en_cooperation_message },
  //   ])

  // const currentTranslationUnderDeveloping =
  //   useTransition<IUnderDeveloping_translation>([
  //     { locale: RU_LOCALE, translation: ru },
  //     { locale: EN_LOCALE, translation: en },
  //   ])

  // CART ORDERING MODAL

  // const [currentCartModalIndex, setCurrentCartModalIndex] = useState(0)
  // const [puModalComponent, PU_ModalView] = useBaseModal(
  //   'APP_BODY_WRAPPER',
  //   'PopUpBase',
  // )

  // useEffect(() => {
  //   if (!puModalComponent) return

  //   puModalComponent.editModals(
  //     [
  //       {
  //         typeName: toc_order_information.typeName,
  //         _header: currentTranslationOrderInformation?.translation.order,
  //         _paragraph:
  //           currentTranslationOrderInformation?.translation.detailsOrder,
  //       },

  //       {
  //         typeName: toc_order_request.typeName,
  //         _header: currentTranslationOrderRequest?.translation?.order,
  //         _paragraph: currentTranslationOrderRequest?.translation?.detailsOrder,
  //       },

  //       {
  //         typeName: toc_cooperation_message.typeName,
  //         _header: currentTranslationCooperationMessage?.translation?.header,
  //         _paragraph:
  //           currentTranslationCooperationMessage?.translation?.paragraph,
  //       },
  //       {
  //         typeName: toc_under_developing.typeName,
  //         _header: currentTranslationUnderDeveloping?.translation?.header,
  //         _paragraph: currentTranslationUnderDeveloping?.translation?.paragraph,
  //       },
  //     ],
  //     currentCartModalIndex,
  //   )

  //   puModalComponent.setOnClose = () => {
  //     modalState?.modalStateSetter(false)
  //   }
  // }, [
  //   puModalComponent,
  //   modalState,
  //   currentTranslationOrderInformation,
  //   currentTranslationOrderRequest,
  //   currentCartModalIndex,
  //   currentTranslationCooperationMessage,
  //   currentTranslationUnderDeveloping,
  // ])

  // const handleSwitcherCartModalRequest = useCallback(() => {
  //   puModalComponent
  //     .applyModalByName(toc_order_request?.typeName)
  //     .then((value) => {
  //       setCurrentCartModalIndex(value.index)
  //     })
  // }, [puModalComponent])

  // const handleSwitcherCartModalInformation = useCallback(() => {
  //   puModalComponent
  //     .applyModalByName(toc_order_information?.typeName)
  //     .then((value) => {
  //       setCurrentCartModalIndex(value.index)
  //     })
  // }, [puModalComponent])

  // const handleSwitcherCooperationMessage = useCallback(() => {
  //   puModalComponent
  //     .applyModalByName(toc_cooperation_message?.typeName)
  //     .then((value) => {
  //       setCurrentCartModalIndex(value.index)
  //     })
  // }, [puModalComponent])

  // const handleSwitcherUnderDeveloping = useCallback(() => {
  //   puModalComponent
  //     .applyModalByName(toc_under_developing?.typeName)
  //     .then((value) => {
  //       setCurrentCartModalIndex(value.index)
  //     })
  // }, [puModalComponent])

  // CART ITEMS HANDLING

  // const [cartSelector, setCartSelector] = useState<ICartSelector_type[]>([])
  // const dispatch = useDispatch()
  // const { parseQuery } = useQueryBuilder<ICartSelected>()
  // const { cItemById, cData, cMeta } = useCartActions({
  //   cartAutoFetching: true,
  //   regionHandler: regionHandler,
  // })

  // useEffect(() => {
  //   loadingSetter(cMeta.loading && !puModalComponent.getState)
  // }, [cMeta, loadingSetter, puModalComponent.getState])

  // const getCartFilteredData = useCallback((): ICartSelector_type[] => {
  //   const _selected = parseQuery()?.cartSelected
  //   if (!(_selected?.length > 0) || !(cData?.length > 0)) return

  //   const _cartItemsData = [] as ICartSelector_type[]

  //   const _cartData_filtered = cData.filter((cd) => {
  //     return _selected.indexOf(cd?.productId?.toString()) > -1
  //   })

  //   _cartData_filtered.map((el) => {
  //     _cartItemsData.push({
  //       id: el.productId,
  //       quantity: el.quantity,
  //     })
  //   })

  //   setCartSelector(_cartItemsData)
  //   return _cartItemsData
  // }, [cData, parseQuery])

  // const openOrderingModal = useCallback(() => {
  //   // const _cartSelector = getCartFilteredData();
  //   // const _HasSelected =
  //   //   _cartSelector?.length > 0 && !(cMeta.loading || cMeta.error);
  //   // !puModalComponent.getState
  //   //   ? puModalComponent.switch(_HasSelected).then(() => {
  //   //       if (_HasSelected) dispatch(setCatalogState(false));
  //   //     })
  //   //   : null;
  // }, [getCartFilteredData, cMeta, puModalComponent, dispatch])

  // useEffect(() => {
  //   openOrderingModal()
  // }, [openOrderingModal])

  // useEffect(() => {
  //   if (modalState?.modalState) openOrderingModal()
  // }, [modalState, openOrderingModal])

  return (
    // <PU_ModalView>
    //   <PuWrapper
    //     data={puModalComponent}
    //     style={{
    //       padding: '0px 0px 10px',
    //     }}
    //   >
    //     <div>
    //       {puModalComponent.isCurrentModal(toc_order_information.typeName) ? (
    //         <OrderingInformation_modal
    //           translation={currentTranslationOrderInformation?.translation}
    //         >
    //           <OrderedCartWrapper
    //             selectedItems={cartSelector}
    //             cartItemGetter={cItemById}
    //             region={regionHandler}
    //             imageOptimization={{
    //               loader: sourcedLoader,
    //               sizes: '350px',
    //             }}
    //           />
    //         </OrderingInformation_modal>
    //       ) : puModalComponent.isCurrentModal(toc_order_request.typeName) ? (
    //         <OrderingRequest_modal
    //           translation={currentTranslationOrderRequest?.translation}
    //         />
    //       ) : puModalComponent.isCurrentModal(toc_under_developing.typeName) ? (
    //         <UnderDeveloping_modal
    //           buttonAction={() => {}}
    //           translation={currentTranslationUnderDeveloping?.translation}
    //         >
    //           {currentTranslationUnderDeveloping?.translation.contacts}
    //         </UnderDeveloping_modal>
    //       ) : null}
    //       {puModalComponent.isCurrentModal(
    //         toc_under_developing.typeName,
    //       ) ? null : (
    //         <OrderingFooterDialog
    //           openRequestPage={handleSwitcherCartModalRequest}
    //           openOrderingInfo={handleSwitcherCartModalInformation}
    //           placeOrder={handleSwitcherUnderDeveloping} //cooperationMessage
    //           totalSelect={selectedProducts}
    //           totalSum={totalSum}
    //           translation={currentTranslationOrderDialog?.translation}
    //           openingModal={currentCartModalIndex}
    //         />
    //       )}
    //     </div>
    //   </PuWrapper>
    // </PU_ModalView>

    <></>
  )
}

export default OrderingModal
