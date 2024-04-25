import { modalsBasics } from '@root/Hooks/useBaseModal/modalSetter'

export interface IContactsModalTranslation {
  header?: string
  paragraph?: string
  phoneText: string
  buttonPhoneText: string
  mailText: string
  buttonMailText: string
  addressText: string
  buttonAddressText: string
}

export type TContactItem = {
  contactName: string
  contactField: string[]
}

export type TConnection = {
  connectionName: string
  contacts: Array<TContactItem>
}

export interface IContactsModal {
  // translation: IContactsModalTranslation
  connectionData: Array<TConnection>
}

export const toc_contacts_modal = {
  typeName: 'contacts_modal_toc',
  _header: '',
  _paragraph: '',
} as modalsBasics
