import { modalsBasics } from '@root/Hooks/useBaseModal/modalSetter'

export interface IWrongMessageTranslation {
  title: string,
  paragraph: string,
  showContacts: string,
  message: string
}

export interface IWrongMessage {
  onShowContacts: () => void;
  translation: IWrongMessageTranslation
}

export const toc_wrong_message_modal = {
  typeName: 'wrong_message_modal',
  _header: '',
  _paragraph: '',
} as modalsBasics