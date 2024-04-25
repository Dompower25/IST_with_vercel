import styles from '../../styles/Footer/footer.module.scss'
import { FC } from 'react'
import YandexMap from './Map/YandexMap'
import RequestFailure from '../catalog/requestFailure'
import { TContactsData } from '../contacts/common'
import { ICurrencySpec, ILanguageSpec } from '../region/IRegionSpecList'

export interface IFooter_translation {
  contacts: string
  phone: string
  email: string
  address: string
  failureRequest: string

  regionTitle: string
  currencyTitle: string
  languageTitle: string
}

type TRegionData<T_TRANSLATION_FIELDS> = {
  translation: T_TRANSLATION_FIELDS;
  onSelect: (key: string) => void
  isCurrent: (key: string) => boolean
}

interface IFooter {
  contactsData: TContactsData
  translation: IFooter_translation

  currency: TRegionData<ICurrencySpec>
  language: TRegionData<ILanguageSpec>
}

const Footer: FC<IFooter> = ({
  translation,
  contactsData,
  currency,
  language,
}) => {
  const hasEmptyField = (): boolean => {
    for (let key in contactsData) {
      const field = contactsData[key]
      if (!Array.isArray(field) || !(field.length > 0)) return true
    }
    return false
  }

  return (
    <>
      <div className={styles.Footer}>
        {!hasEmptyField() ? (
          <div className={'row h-100'}>
            <div className={'col-md-6'}>
              <div className={styles.contactsBlock}>
                <>
                  <p>{translation?.contacts}:</p>
                  <ul>
                    <p>{translation?.phone}:</p>
                    {contactsData.phones?.map((phone, ph_i) => (
                      <li key={`${ph_i}_phone_num`}>
                        <a href={`tel: ${phone}`}>
                          <span className={styles.margined}>{phone}</span>
                        </a>
                      </li>
                    ))}

                    <p>{translation?.email}:</p>
                    {contactsData.mails?.map((email, em_i) => (
                      <li key={`${em_i}_mail`}>
                        <a href={`mailto:${email}`}>
                          <span className={styles.margined}>{email}</span>
                        </a>
                      </li>
                    ))}

                    <p>{translation?.address}:</p>
                    {contactsData.addresses?.map((address, ad_i) => (
                      <li key={`${ad_i}_mail`}>
                        <a
                          href={`${address}`}
                          target={'_blank'}
                          rel={'noreferrer'}
                        >
                          <span className={styles.margined}>
                            {address?.addressName}
                          </span>
                        </a>
                      </li>
                    ))}
                  </ul>

                  <p>{translation?.regionTitle || 'Currency & language'}:</p>
                  <ul>
                    <p>{translation.currencyTitle || 'Currency'}:</p>
                    <li className={styles.currency}>
                      {currency &&
                        Object.entries(currency.translation).map(
                          ([currencyCode, currencyName], i) => {
                            return (
                              <a key={`currency_item_${i}_footer`}>
                                <span
                                  className={`${currency?.isCurrent(currencyName?.key) ? styles.current : ''} ${styles.margined}`}
                                  onClick={() => {
                                    currency?.onSelect(currencyName?.key)
                                  }}
                                >
                                  {currencyName.field || 'Unknown'}
                                </span>
                              </a>
                            )
                          },
                        )}
                    </li>

                    <p>{translation.languageTitle || 'Language'}:</p>

                    <li className={styles.currency}>
                      {language &&
                        Object.entries(language.translation).map(
                          ([currencyCode, currencyName], i) => {
                            return (
                              <a key={`currency_item_${i}_footer`}>
                                <span
                                  className={`${styles.margined}`}
                                  onClick={() => {
                                    language?.onSelect(currencyName?.key)
                                  }}
                                >
                                  {currencyName?.field || 'Unknown'}
                                </span>
                              </a>
                            )
                          },
                        )}
                    </li>
                  </ul>
                </>
              </div>
            </div>

            <div className={'col-md-6 d-flex justify-content-end'}>
              <div
                className={'d-none d-md-block'}
                style={{
                  height: '100%',
                  width: '70%',
                }}
              >
                <div className={styles.mapBlock}>
                  <YandexMap
                    location={contactsData?.addresses[0]?.addressCoordinates}
                    zoom={10}
                  />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div
            style={{
              padding: '30px 0',
            }}
          >
            <RequestFailure
              translation={{
                translation: {
                  emptyResponseMessage: translation.failureRequest,
                },
                locale: '',
              }}
            />
          </div>
        )}

        <div className={'row d-flex'}>
          <div className={'mx-auto justify-content-center'}>
            <div className={styles.ourCompanyBlock}>
              <p>IST ELEVATOR</p>
              <a>All rights reserved</a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Footer
