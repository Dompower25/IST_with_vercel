import PopUpBase from '../PopUpBase'
import ComponentLoader from '../ComponentLoader'
import styles from '../../styles/ModalComponents/ModalBase.module.css'
import { useEffect, useState } from 'react'
import NextImageRatioSaver from '../NextImageRatioSaver'
import PhoneInput from 'react-phone-number-input/input'
import { useMutation } from 'react-query'
import setData from '../../helpers/setData'
import { CreateCallBack, updateCallBack } from '../../queries/CallBack'
import CheckRequired from '../../helpers/CheckRequired'

export default function CallRequestSenderModal({
  cbModalState,
  setCbModalState,
  api_data,
  respStateSet,
  respNameSet,
}) {
  const [compLoaderData, setCompLoaderData] = useState()
  const [userName, setName] = useState('')
  const [userPhone, setUserPhone] = useState()
  const [isSessionSet, setSession] = useState(
    typeof window !== 'undefined' &&
      localStorage.getItem('session_id') !== null,
  )
  const [requestSent, setRequestSent] = useState()
  const [RequestResModal, setRequestResModal] = useState(false)

  const mutation = useMutation((newSession) => {
    if (!isSessionSet) {
      setData(CreateCallBack, { data: newSession }).then((resp) => {
        localStorage.setItem('session_id', resp.create_CB_Requests_item.id)
      })
      setSession(true)
    } else {
      setRequestSent(
        setData(updateCallBack, {
          data: newSession,
          id: localStorage.getItem('session_id'),
        }),
      )
    }
  })

  const sendPhoneNum = () => {
    mutation.mutate({
      status: 'draft',
      cb_order: [
        {
          client_name: userName,
          client_phone: userPhone,
        },
      ],
    })
  }

  useEffect(() => {
    if (requestSent) {
      respNameSet(userName)
      respStateSet(true)
      setCbModalState(false)
    }
  }, [requestSent])

  return (
    <>
      <PopUpBase
        puState={cbModalState}
        closer={setCbModalState}
        header={compLoaderData ? compLoaderData.CallBack_Title_Ru : ''}
        paragraph={compLoaderData ? compLoaderData.CallBack_subtitle_Ru : ''}
      >
        <ComponentLoader data={api_data} data_setter={setCompLoaderData}>
          <div className={styles.ModalFormContent}>
            <label>
              Имя:
              <input
                type="text"
                placeholder="Андрей"
                value={userName}
                onChange={(e) => setName(e.target.value)}
                className={'required_field'}
              />
            </label>
            <label>
              Телефон:
              <PhoneInput
                type="text"
                placeholder="+7(000)000-00-00"
                value={userPhone}
                onChange={setUserPhone}
                className={'required_field'}
              />
            </label>

            <button onClick={() => sendPhoneNum()}>Отправить</button>

            <a
              href={`tel: ${
                api_data ? api_data.phone_number_ru.phoneNum : null
              }`}
            >
              {api_data ? api_data.phone_number_ru.phoneNum : null}
            </a>

            <div className={styles.PUbackImg}>
              <NextImageRatioSaver
                Img={api_data ? api_data.BackImage : null}
                unique={'pop_up_back_image'}
                q={50}
                wPrime={true}
              ></NextImageRatioSaver>
            </div>
          </div>
        </ComponentLoader>
      </PopUpBase>
    </>
  )
}
