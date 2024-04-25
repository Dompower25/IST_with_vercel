import ISTButtonN from '@root/components/UI/ISTButton/ISTButtonN'
import { FC, useState, useCallback } from 'react'
import { IContactsModal, TConnection } from './IContactsModal'
import styles from '@root/styles/Modals/popUp/contacts/contacts.module.scss'

const ContactsModal: FC<IContactsModal> = ({ connectionData }) => {
  const [currentConnection, setCurrentConnection] = useState<TConnection>(
    connectionData[0],
  )

  const currentFill = useCallback(
    (name: string): boolean => {
      return currentConnection.connectionName === name
    },
    [currentConnection],
  )

  return (
    <>
      <div className={styles.contactsBlock}>
        <div className={styles.buttonsBlock}>
          {connectionData.map((connection, i) => {
            return (
              <ISTButtonN
                key={connection.connectionName + i}
                title={{
                  caption: connection.connectionName,
                }}
                theme="dark"
                stylingFor={['focus', 'hover']}
                size="M"
                mobileTriggerSize="SM_576"
                accent={
                  currentFill(connection.connectionName)
                    ? 'important'
                    : 'secondary'
                }
                onClick={() => {
                  setCurrentConnection(connection)
                }}
              />
            )
          })}
        </div>
        <div className={styles.contentView}>
          {currentConnection?.contacts?.map((contact, i) => {
            return (
              <div className={styles.phoneBlock} key={contact.contactName + i}>
                <div className={styles.contentName}>{contact.contactName}:</div>
                {contact.contactField.map((contactField, i) => {
                  return (
                    <div key={contactField + i} className={styles.contentText}>
                      {contactField}
                    </div>
                  )
                })}
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default ContactsModal
