import styles from '../../../styles/LandingStyles/PagesComponents/HelloPage/callBack.module.scss'
import { FC, useCallback, useEffect, useRef, useState } from 'react'
import ISTInput, { inputTypesVars } from '../../UI/ISTInput/ISTInput'
import IstButton from '../../UI/ISTButton/IstButton'
import { TContactsData } from '../../../queries/landingFeatures/ourContactsQuery'
import { cartClient } from '@root/Apollo/cartClient'
import useCallRequest from '@root/Hooks/useCallRequest/useCallRequest'
import { useISTInputFelt } from '@root/components/UI/ISTInput/useISTInputFelt'
import { useDispatch } from 'react-redux'
import { puModalOpenByName } from '@root/store/slices/modalSlice/modalSlice'
import { toc_gratitude_message } from '@root/components/modals/popUp/store/gratitude/IGratitudeModal'

export interface ICallBack_translation {
  call: string
  name: string
  phone: string
  send: string
  ourPhone: string
}

interface CallBack {
  translation: ICallBack_translation
  contactsData: TContactsData
}

const CallBack: FC<CallBack> = ({ contactsData, translation }) => {
  const { send, result } = useCallRequest(cartClient)
  const { checkFields } = useISTInputFelt()
  const dispatch = useDispatch()

  const [client_name, setName] = useState('')
  const [client_phone, setPhone] = useState('')

  const nameRef = useRef(null)
  const phoneRef = useRef(null)

  const sendCallBack = useCallback(() => {
    send(client_name, client_phone).then((res) => {
      if (!res.data || res.error) {
        console.log(res.data, res.error)
        res.removePrevAndSendAgain()
      }
    })
  }, [client_name, client_phone, send])

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

    if (fieldsIsFelt) sendCallBack()
  }, [checkFields, sendCallBack])

  const openGratitude = useCallback(() => {
    const gratitudeModal = toc_gratitude_message
    if (gratitudeModal && gratitudeModal.typeName)
      dispatch(puModalOpenByName(gratitudeModal.typeName))
  }, [dispatch])

  useEffect(() => {
    if (result && result.id) openGratitude()
  }, [openGratitude, result])

  return contactsData ? (
    <>
      <div className={styles.callBack}>
        <div className={styles.baseBlock}>
          <p className={styles.callBackTitle}>{translation?.call}</p>

          <div className={styles.inputBlock}>
            <div
              style={{
                marginBottom: '5px',
              }}
            >
              <ISTInput
                inputType={inputTypesVars.any_string}
                placeholder={translation?.name}
                required={true}
                outDataSetter={setName}
                actualData={client_name}
                ref={nameRef}
                style={{
                  margin: '0 0 10px 0',
                }}
              />

              <ISTInput
                inputType={inputTypesVars.phone}
                placeholder={translation?.phone}
                required={true}
                outDataSetter={setPhone}
                actualData={client_phone}
                ref={phoneRef}
                style={{
                  margin: '5px 0',
                }}
              />
            </div>
            <IstButton
              title={translation?.send}
              paddings={{ horizontalPadding: 28, paddingFactor: 2 }}
              maxSize={{ h: '55px' }}
              size={{ w: '100%' }}
              borderRadius={'28px'}
              buttonAction={sendRequest}
            />
          </div>
        </div>
        <p>
          {translation?.ourPhone}:
          <span>
            <a
              href={`tel:${
                contactsData ? contactsData.phone_numbers[0]?.phone_item : null
              }`}
            >
              {contactsData ? contactsData.phone_numbers[0]?.phone_item : null}
            </a>
          </span>
        </p>
      </div>
    </>
  ) : null
}

export default CallBack
