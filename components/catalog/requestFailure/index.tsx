import { FC } from 'react'
import { ITranslation } from '../../../Hooks/useTranslation/ITranslation'
import styles from './requestFailure.module.scss'
import Image from 'next/image'
import NF_Image from './NotFoundImage.svg'
import { IRequestFailureTranslation } from '../translations/emptyResult'

interface IRequestFailure {
  translation: ITranslation<IRequestFailureTranslation>
  onHelp?: () => void
  onLoad?: () => void
}

const RequestFailure: FC<IRequestFailure> = ({ translation, onHelp }) => {
  return (
    <div className={styles.emptyResultContainer}>
      <div className={styles.emptyResult}>
        <Image src={NF_Image} width={160} height={160} alt={'NOT FOUND'} />
        <span>{translation.translation.emptyResponseMessage}</span>
      </div>
    </div>
  )
}

export default RequestFailure
