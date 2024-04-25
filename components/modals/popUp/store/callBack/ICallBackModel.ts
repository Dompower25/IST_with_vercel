import { modalsBasics } from '@root/Hooks/useBaseModal/modalSetter'

export interface ICallBackRequestTranslation {
  header: string
  paragraph: string

  nameField: string
  phoneField: string

  phonePlaceholder: string
  namePlaceholder: string

  sendButton: string
  contactsButton: string
}

export interface ICallBackModal {
  translation: ICallBackRequestTranslation
  onShowContacts: () => void
  onSendRequest: (
    fieldsIsFelt: boolean,
    data: { name: string; phone: string },
  ) => void
}

export const toc_callback_modal = {
  typeName: 'callback_modal',
  _header: '',
  _paragraph: '',
} as modalsBasics
