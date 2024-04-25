import { FC, useCallback, useEffect, useState } from 'react'
import PuWrapper from '../../popUp/puWrapper'
import {
  IContactsModalTranslation,
  toc_contacts_modal,
} from '../../popUp/store/contacts/IContactsModal'
import { useTransition } from '@root/Hooks/useTranslation/useTranslation'
import { EN_LOCALE, RU_LOCALE } from '@root/locales/locales'
import {
  contactsModal_en_translation,
  contactsModal_ru_translation,
} from '@root/locales/modals/contactsModal/locales'
import { useAppSelector } from '@root/Hooks/reduxSettings'
import {
  IGratitudeModalTranslation,
  toc_gratitude_message,
} from '../../popUp/store/gratitude/IGratitudeModal'
import {
  gratitudeModal_en_translation,
  gratitudeModal_ru_translation,
} from '@root/locales/modals/gratitudeModal/locale'
import {
  ICallBackRequestTranslation,
  toc_callback_modal,
} from '../../popUp/store/callBack/ICallBackModel'
import {
  callBack_ru_translation,
  callBack_en_translation,
} from '@root/locales/modals/callBackModal/locales'
import {
  IWrongMessageTranslation,
  toc_wrong_message_modal,
} from '../../popUp/store/wrongMessage/IWrongMessage'
import {
  wrongMessageModal_en_translation,
  wrongMessageModal_ru_translation,
} from '@root/locales/modals/wrongMessageModal/locales'
import { WrongMessageModal } from '../../popUp/store/wrongMessage/wrongMessage'
import useBaseModal from '@root/Hooks/useBaseModal/useBaseModal'
import ContactsModal from '../../popUp/store/contacts/contactsModal'
import GratitudeModal from '../../popUp/store/gratitude/gratitudeModal'
import { CallBackModal } from '../../popUp/store/callBack/callBackModal'
import { cartClient } from '@root/Apollo/cartClient'
import useCallRequest from '@root/Hooks/useCallRequest/useCallRequest'
import { MobileFiltersModal } from '../../popUp/store/mobileFilters/mobileFilters'
import {
  IMobileFiltersModalTranslation,
  TMobileFilterModal,
  toc_mobile_filters_modal,
} from '../../popUp/store/mobileFilters/IMobileFilters'
import {
  mobileFiltersModal_en_translation,
  mobileFiltersModal_ru_translation,
} from '@root/locales/modals/mobileFiltersModal/locales'

interface IPopUpModalWrapper {
  onClose: () => void
  onUpdateModal: (modalName: string) => void
}

type TCurrentMobileFilter = {
  modal: TMobileFilterModal
  modalDestination: string
  modalParagraph: string
  modalName: string
}

export const PopUpModalWrapper: FC<IPopUpModalWrapper> = ({
  onClose,
  onUpdateModal,
}) => {
  // BASE MODAL
  const [modalComponent, ModalView] = useBaseModal(
    'APP_BODY_WRAPPER',
    'PopUpBase',
  )

  // MODALS DATA
  const contactsData = useAppSelector((selector) => selector.contacts)
  const modal = useAppSelector((selector) => selector.modal)
  const articles = useAppSelector((selector) => selector.pubArticles)

  // MODAL TRANSLATION
  const contactsModalTranslation = useTransition<IContactsModalTranslation>([
    { locale: RU_LOCALE, translation: contactsModal_ru_translation },
    { locale: EN_LOCALE, translation: contactsModal_en_translation },
  ])

  const gratitudeModalTranslation = useTransition<IGratitudeModalTranslation>([
    { locale: RU_LOCALE, translation: gratitudeModal_ru_translation },
    { locale: EN_LOCALE, translation: gratitudeModal_en_translation },
  ])

  const callBackModalTranslation = useTransition<ICallBackRequestTranslation>([
    { locale: RU_LOCALE, translation: callBack_ru_translation },
    { locale: EN_LOCALE, translation: callBack_en_translation },
  ])

  const wrongMessageTranslation = useTransition<IWrongMessageTranslation>([
    { locale: RU_LOCALE, translation: wrongMessageModal_ru_translation },
    { locale: EN_LOCALE, translation: wrongMessageModal_en_translation },
  ])

  const mobileFiltersListTranslation =
    useTransition<IMobileFiltersModalTranslation>([
      { locale: RU_LOCALE, translation: mobileFiltersModal_ru_translation },
      { locale: EN_LOCALE, translation: mobileFiltersModal_en_translation },
    ])

  // MODALS SETTINGS
  useEffect(() => {
    if (!modalComponent || !modal?.popUp) return
    modalComponent.applyModalByName(modal.popUp.modalName)
    modalComponent.switch(modal.popUp.state)
  }, [modal, modalComponent])

  useEffect(
    () => {
      modalComponent.editModals(
        [
          {
            _header: contactsModalTranslation.translation.header,
            _paragraph: contactsModalTranslation.translation.paragraph,
            typeName: toc_contacts_modal.typeName,
          },
          {
            _header: gratitudeModalTranslation.translation.header,
            _paragraph: gratitudeModalTranslation.translation.paragraph,
            typeName: toc_gratitude_message.typeName,
          },
          {
            _header: callBackModalTranslation.translation.header,
            _paragraph: callBackModalTranslation.translation.paragraph,
            typeName: toc_callback_modal.typeName,
          },
          {
            _header: wrongMessageTranslation.translation.title,
            _paragraph: wrongMessageTranslation.translation.paragraph,
            typeName: toc_wrong_message_modal.typeName,
          },
          {
            _header: '',
            _paragraph: '',
            typeName: toc_mobile_filters_modal.typeName,
          },
        ],
        0,
      )
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      // mobileFiltersModalState,
      // callBackModalTranslation,
      // contactsModalTranslation,
      // gratitudeModalTranslation,
      // modalComponent,
      // wrongMessageTranslation,
    ],
  )

  // COMMUNICATION NAVIGATION MOVES
  const { send, result } = useCallRequest(cartClient)
  const sendCallBack = useCallback(
    (fieldsIsFelt: boolean, data: { name: string; phone: string }) => {
      if (!fieldsIsFelt || !data) return

      send(data.name, data.phone).then((res) => {
        if (!res.data || res.error) {
          console.log(res.data, res.error)
          res.removePrevAndSendAgain()
        }
      })
    },
    [send],
  )

  const onShowContacts = () => {
    modalComponent
      .applyModalByName(toc_contacts_modal.typeName)
      .then((modal) => onUpdateModal(modal.modal.typeName))
  }

  const onShowGratitude = useCallback(() => {
    modalComponent
      .applyModalByName(toc_gratitude_message.typeName)
      .then((modal) => onUpdateModal(modal.modal.typeName))
  }, [modalComponent, onUpdateModal])

  useEffect(() => {
    if (result && result.id) onShowGratitude()
  }, [onShowGratitude, result])

  // MOBILE FILTERS LIST MODAL
  const [mobileFiltersModalState, setMobileFiltersModalState] =
    useState<TCurrentMobileFilter>({
      modal: 'sections',
      modalDestination: null,
      modalName: null,
      modalParagraph: null,
    })

  const mobileModalUpdater = useCallback(
    (header: string, paragraph: string) => {
      modalComponent
        .applyModalByName(toc_mobile_filters_modal.typeName)
        .then(() => modalComponent.editModal(header, paragraph))
    },
    [modalComponent],
  )

  const setMobileModalPageType = (data: TMobileFilterModal) => {
    let currentData = {} as TCurrentMobileFilter
    setMobileFiltersModalState((prev) => {
      currentData = {
        ...prev,
        modal: data,
      }
      mobileModalUpdater(currentData.modalName, currentData.modalParagraph)
      return currentData
    })
  }

  const setMobileDestination = (data: string) => {
    let currentData = {} as TCurrentMobileFilter
    setMobileFiltersModalState((prev) => {
      currentData = {
        ...prev,
        modalDestination: data,
      }
      mobileModalUpdater(currentData.modalName, currentData.modalParagraph)
      return currentData
    })
  }

  const setMobileModalTitle = useCallback(
    (header: string) => {
      let currentData = {} as TCurrentMobileFilter
      setMobileFiltersModalState((prev) => {
        currentData = {
          ...prev,
          modalName: header,
        }
        mobileModalUpdater(currentData.modalName, currentData.modalParagraph)
        return currentData
      })
    },
    [mobileModalUpdater],
  )

  const setMobileModalParagraph = useCallback(
    (paragraph: string) => {
      setMobileFiltersModalState((prev) => {
        const currentData = {
          ...prev,
          modalParagraph: paragraph,
        }
        mobileModalUpdater(currentData.modalName, currentData.modalParagraph)
        return currentData
      })
    },
    [mobileModalUpdater],
  )

  const isEmptyString = (string: string) => {
    return string === undefined || string.trim().length === 0
  }

  const descManagerPublicationsModal = useCallback(
    (publicationsIsCurrent: boolean) => {
      const pIsEmpty = isEmptyString(modalComponent.getParagraph)
      const hIsEmpty = isEmptyString(modalComponent.getHeader)

      if (publicationsIsCurrent && pIsEmpty && hIsEmpty)
        switch (!!mobileFiltersModalState.modalDestination) {
          case false:
            modalComponent.editModal(
              mobileFiltersListTranslation.translation?.sectionsList?.header,
              mobileFiltersListTranslation.translation?.sectionsList?.paragraph,
            )
            break
          case true:
            modalComponent.editModal(
              mobileFiltersModalState.modalName,
              mobileFiltersListTranslation.translation?.articlesList?.paragraph,
            )
            break
        }
    },
    [mobileFiltersListTranslation, mobileFiltersModalState, modalComponent],
  )

  useEffect(() => {
    const publicationsIsCurrent = modalComponent.isCurrentModal(
      toc_mobile_filters_modal.typeName,
    )
    descManagerPublicationsModal(publicationsIsCurrent)
  }, [
    mobileFiltersListTranslation,
    descManagerPublicationsModal,
    mobileFiltersModalState,
    setMobileModalParagraph,
    setMobileModalTitle,
    modalComponent,
  ])

  // COMPONENT
  return modal.popUp ? (
    <ModalView data={modalComponent}>
      <PuWrapper
        header={modalComponent.getHeader}
        paragraph={modalComponent.getParagraph}
        onClose={onClose}
      >
        {modalComponent.isCurrentModal(toc_contacts_modal.typeName) ? (
          <ContactsModal
            connectionData={[
              {
                connectionName: contactsModalTranslation.translation.phoneText,
                contacts: [
                  {
                    contactName: contactsModalTranslation.translation.phoneText,
                    contactField: contactsData.phone_numbers.map((el) => {
                      return el.phone_item
                    }),
                  },
                ],
              },
              {
                connectionName: contactsModalTranslation.translation.mailText,
                contacts: [
                  {
                    contactName: contactsModalTranslation.translation.mailText,
                    contactField: contactsData.emails.map((el) => {
                      return el.email_item
                    }),
                  },
                ],
              },
              {
                connectionName:
                  contactsModalTranslation.translation.addressText,
                contacts: [
                  {
                    contactName:
                      contactsModalTranslation.translation.addressText,
                    contactField: contactsData.addresses.map((el) => {
                      return el.address_name
                    }),
                  },
                ],
              },
            ]}
          />
        ) : null}

        {modalComponent.isCurrentModal(toc_gratitude_message.typeName) ? (
          <GratitudeModal
            translation={gratitudeModalTranslation.translation}
            onShowContacts={onShowContacts}
          />
        ) : null}

        {modalComponent.isCurrentModal(toc_callback_modal.typeName) ? (
          <CallBackModal
            translation={callBackModalTranslation.translation}
            onShowContacts={onShowContacts}
            onSendRequest={sendCallBack}
          />
        ) : null}

        {modalComponent.isCurrentModal(toc_wrong_message_modal.typeName) ? (
          <WrongMessageModal
            onShowContacts={onShowContacts}
            translation={wrongMessageTranslation.translation}
          />
        ) : null}

        {modalComponent.isCurrentModal(toc_mobile_filters_modal.typeName) ? (
          <MobileFiltersModal
            articleSections={[...articles.sections]}
            currentPage={mobileFiltersModalState?.modal}
            currentDestination={mobileFiltersModalState?.modalDestination}
            //
            pageSwitcher={setMobileModalPageType}
            titleSetter={setMobileModalTitle}
            paragraphSetter={setMobileModalParagraph}
            destinationSetter={setMobileDestination}
            //
            onClose={onClose}
            translation={mobileFiltersListTranslation.translation}
          />
        ) : null}
      </PuWrapper>
    </ModalView>
  ) : null
}
