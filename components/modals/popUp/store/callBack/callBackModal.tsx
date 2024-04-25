import ISTComponentWrapper from '@root/components/UI/ComponentWrapper/ISTComponentWrapper'
import ISTButtonN from '@root/components/UI/ISTButton/ISTButtonN'
import ISTInput, { inputTypesVars } from '@root/components/UI/ISTInput/ISTInput'
import { FC, useCallback, useRef, useState } from 'react'
import { ICallBackModal } from './ICallBackModel'
import styles from '@root/styles/Modals/callBack/callBack_request.module.scss'
import { useISTInputFelt } from '@root/components/UI/ISTInput/useISTInputFelt'

export const CallBackModal: FC<ICallBackModal> = ({
  translation,
  onSendRequest,
  onShowContacts,
}) => {
  const { checkFields } = useISTInputFelt()
  const [name, setName] = useState<string>('')
  const [phone, setPhone] = useState<string>('')

  const nameRef = useRef<HTMLInputElement>(null)
  const phoneRef = useRef<HTMLInputElement>(null)

  const sendRequest = useCallback(() => {
    const fieldsIsFelt = checkFields([
      {
        refObj: nameRef,
        required: true,
      },
      {
        refObj: phoneRef,
        required: true,
      },
    ])

    if (fieldsIsFelt)
      onSendRequest(fieldsIsFelt, {
        name,
        phone,
      })
  }, [checkFields, name, onSendRequest, phone])



  return (
    <>
      <ISTComponentWrapper
        title={translation?.nameField}
        wrapperClass={styles.inputWrapper}
      >
        <ISTInput
          ref={nameRef}
          inputType={inputTypesVars.any_string}
          placeholder={translation?.namePlaceholder}
          required={true}
          outDataSetter={setName}
          actualData={name}
          style={{
            height: '50px',
            borderRadius: '25px 89px 89px',
          }}
        />
      </ISTComponentWrapper>

      <ISTComponentWrapper
        title={translation?.phonePlaceholder}
        wrapperClass={styles.inputWrapper}
      >
        <ISTInput
          ref={phoneRef}
          inputType={inputTypesVars.phone}
          placeholder={translation.phonePlaceholder}
          required={true}
          outDataSetter={setPhone}
          actualData={phone}
          style={{
            height: '50px',
            borderRadius: '25px 89px 89px',
          }}
        />
      </ISTComponentWrapper>

      <div className={styles.buttonWrapper}>
        <ISTButtonN
          theme="dark"
          accent="important"
          size="S"
          style={{ borderWidth: '2px', borderRadius: '15px' }}
          title={{
            caption: translation?.sendButton,
          }}
          onClick={() => {
            sendRequest()
          }}
        />

        <ISTButtonN
          theme="dark"
          accent="secondary"
          size="S"
          style={{ borderWidth: '2px', borderRadius: '15px' }}
          title={{
            caption: translation?.contactsButton,
          }}
          onClick={() => {
            onShowContacts()
          }}
        />
      </div>
    </>
  )
}
