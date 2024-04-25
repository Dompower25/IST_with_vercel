import { useEffect, useState, useRef, FC } from 'react'
import styles from './availabilityStatus.module.scss'
import { useRouter } from 'next/router'
import ru from '../../../locales/ru'
import en from '../../../locales/en'
import { ITranslation } from '../../../Hooks/useTranslation/ITranslation'
import { IProductPage_availability_translation } from '../translations/IProductPageTranslations'

interface IAvailabilityStatus {
  status: number
  translation: IProductPage_availability_translation
}

export const AvailabilityStatus: FC<IAvailabilityStatus> = ({
  status,
  translation,
}) => {
  let ref = useRef<HTMLDivElement>(null)
  const [textValue, setText] = useState(translation.checkByPhone)

  // -1 not Available
  // 0 Check by phone
  // 1 is Available

  useEffect(() => {
    const el = ref.current

    if (status && el) {
      el.className = `${styles.AvailabilityStatus}`

      if (status === -1) {
        setText(translation.isNotAvailable)
        el.classList.add(`${styles.notAvailable}`)
      } else if (status === 1) {
        setText(translation.isAvailable)
        el.classList.add(`${styles.Available}`)
      }
    }
  }, [status, translation])

  return (
    <>
      <div className={styles.AvailabilityStatus} ref={ref}>
        <p>{textValue}</p>
      </div>
    </>
  )
}
