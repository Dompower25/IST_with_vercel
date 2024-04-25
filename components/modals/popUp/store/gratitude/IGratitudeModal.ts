import { modalsBasics } from '@root/Hooks/useBaseModal/modalSetter'

export interface IGratitudeModalTranslation {
  header: string
  paragraph: string
  mainText: string
  buttonText: string
}

export interface IGratitudeModal {
  translation: IGratitudeModalTranslation,
  onShowContacts: () => void;
}

export const toc_gratitude_message = {
  typeName: 'gratitude_message',
  _header: '',
  _paragraph: '',
} as modalsBasics