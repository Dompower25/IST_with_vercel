import { useState, useEffect } from 'react'
import styles from './callBackModal.module.scss'
import Image from 'next/image'
import NextImageRatioSaver from '../NextImageRatioSaver'

export default function CallBackModal({ backImg, actPhone }) {
  const [callUser, setCallUser] = useState({
    name: '',
    phone: '',
  })
  const [backImgUrl, setBgImg] = useState('/null_bg.png')

  useEffect(() => {
    backImg !== undefined ? setBgImg(backImg) : setBgImg('/null_bg.png')
    // console.log(backImg);
  }, [])

  return (
    <>
      <div className={styles.ModalFormContent}>
        <label>
          Имя:
          <input
            type="text"
            placeholder="Андрей"
            value={callUser.name}
            onChange={(e) =>
              setCallUser((user) => ({ ...user, name: e.target.value }))
            }
          />
        </label>
        <label>
          Телефон:
          <input
            type="text"
            placeholder="+7(000)000-00-00"
            value={callUser.phone}
            onChange={(e) =>
              setCallUser((user) => ({ ...user, phone: e.target.value }))
            }
          />
        </label>

        <button>Отправить</button>

        <a>{actPhone}</a>
        <div className={styles.PUbackImg}>
          <NextImageRatioSaver
            Img={backImgUrl}
            unique={'pop_up_back_image'}
            q={50}
            wPrime={true}
          ></NextImageRatioSaver>
          {/* <Image
                        src={backImgUrl}
                        width={w !== undefined ? w : 0}
                        height={h !== undefined ? h : 0}
                        q={50}
                    /> */}
        </div>
      </div>
    </>
  )
}
