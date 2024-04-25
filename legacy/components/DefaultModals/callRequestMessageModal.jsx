import PopUpBase from '../PopUpBase'

export default function CallRequestMessageModal({
  modalState,
  modalSwitcher,
  userName,
}) {
  return (
    <>
      <PopUpBase
        puState={modalState}
        closer={modalSwitcher}
        header={`Спасибо, ${userName}!`}
        paragraph={'Мы скоро свяжемся с вами :)'}
      ></PopUpBase>
    </>
  )
}
