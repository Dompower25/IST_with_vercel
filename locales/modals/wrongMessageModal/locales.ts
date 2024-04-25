import { IWrongMessageTranslation } from '@root/components/modals/popUp/store/wrongMessage/IWrongMessage'

export const wrongMessageModal_ru_translation: IWrongMessageTranslation = {
  title: 'Упс!',
  paragraph: 'Кажется, что-то пошло \nне так',
  showContacts: 'Наши контакты',
  message:
    'Похоже, что что-то пошло не так \nМы уже решаем этот вопрос \n\nВы можете попробовать перезагрузить страницу \nили связаться с нами и уточнить ваш вопрос по телефону',
}

export const wrongMessageModal_en_translation: IWrongMessageTranslation = {
  title: 'Oops!',
  paragraph: 'Looks like something went wrong',
  showContacts: 'Our Contacts',
  message:
    'It seems that something went wrong \nWe are already addressing this issue \n\nYou can try reloading the page \nor contact us to clarify your question by phone',
}
