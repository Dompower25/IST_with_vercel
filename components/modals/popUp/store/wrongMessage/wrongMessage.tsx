import ISTButtonN from '@root/components/UI/ISTButton/ISTButtonN'
import { FC } from 'react'
import { IWrongMessage } from './IWrongMessage'
import styles from '@root/styles/Modals/popUp/underDeveloping/underDeveloping.module.scss'

export const WrongMessageModal: FC<IWrongMessage> = ({
  translation,
  onShowContacts,
}) => {
  return (
    <>
      <div className={styles.modalBox}>
        <div className={styles.mainText}>{translation.message}</div>
        <div className={styles.button}>
          <ISTButtonN
            theme="dark"
            accent="important"
            size="M"
            mobileTriggerSize="SM_576"
            title={{
              caption: translation?.showContacts,
            }}
            onClick={onShowContacts ? onShowContacts : null}
          />
        </div>
      </div>
    </>
  )
}
