import React, { Dispatch, FC, useCallback, useEffect, useState } from 'react'
import styles from './Header.module.scss'
import Image from 'next/image'
import IstInput, { inputTypesVars } from '../UI/ISTInput/ISTInput'
import useDelayedEffect from '../../Hooks/useDelayedEffect'
import logo_def from '@root/public/brand/svg/mainLogo.svg'

export interface IHeader_translation {
  catalog: string
  search: string
  contacts: string
}

type TAnyFunction = (props: unknown) => unknown

type TSearchActions = {
  onFocus?: TAnyFunction
  onBlur?: TAnyFunction

  setRequest: Dispatch<string>
  requestSetterDelay: number
  onChange?: TAnyFunction
}

interface IHeaderButtonsHandlers {
  logo?: TAnyFunction
  cart?: TAnyFunction
  contacts?: TAnyFunction
}

interface IBasicControls {
  catalogOpener?: TAnyFunction
  searchField: TSearchActions
}

interface Header {
  buttonsDefs?: IHeaderButtonsHandlers
  basicDefs: IBasicControls
  translation: IHeader_translation
  children?: React.ReactNode
}

const Header: FC<Header> = ({
  children,
  translation,
  buttonsDefs,
  basicDefs,
}) => {
  const [searchState, setSearchState] = useState<string>('')

  useDelayedEffect(
    () => basicDefs.searchField.setRequest(searchState),
    basicDefs.searchField.requestSetterDelay,
    [searchState],
  )

  return (
    <div className={`${styles.headerCont}`}>
      <div className={`header-container`}>
        <div
          className={`col-2 col-lg-2 h-100 d-none d-lg-flex align-items-center`}
        >
          <div
            className={styles.headerLogo}
            onClick={buttonsDefs?.logo ?? null}
          >
            <Image
              src={logo_def}
              alt={'Logo'}
              fill={true}
              style={{
                objectFit: 'contain',
                objectPosition: 'left',
                padding: '1px',
              }}
            />
          </div>
        </div>

        <div className={'col-2 d-flex h-100 d-lg-none  position-relative'}>
          <div className={styles.mobLogo} onClick={buttonsDefs?.logo ?? null}>
            <div className={styles.headerLogo}>
              <Image
                src={logo_def}
                alt={'Logo'}
                fill={true}
                style={{
                  objectFit: 'contain',
                  objectPosition: 'center',
                }}
              />
            </div>
          </div>
        </div>

        {/*CATALOG & SEARCH*/}

        <div className={'px-0 px-sm-3 col-7 col-sm-7 col-lg-7 d-flex h-75'}>
          <div className={styles.headerCatalog}>
            {basicDefs && basicDefs.catalogOpener ? (
              <button
                className={styles.catalogBtn}
                onClick={basicDefs.catalogOpener}
              >
                <div className={styles.catalogBtn_img}>
                  <Image
                    src={'/Header/catalog_btn.svg'}
                    alt={'ISTCatalog button'}
                    fill={true}
                    style={{
                      objectFit: 'contain',
                    }}
                  />
                </div>
                <span>{translation?.catalog}</span>
              </button>
            ) : null}
            {basicDefs && basicDefs?.catalogOpener ? (
              <div className={styles.searchForm}>
                <IstInput
                  inputType={inputTypesVars.any_string}
                  placeholder={'Search'}
                  required={false}
                  outDataSetter={(value) => {
                    setSearchState(value)
                    basicDefs?.searchField?.onChange
                      ? basicDefs?.searchField?.onChange(value)
                      : null
                  }}
                  actualData={searchState}
                  style={{
                    borderRadius: '15px',
                    height: '52px',
                  }}
                  onFocus={basicDefs?.searchField?.onFocus ?? null}
                  onBlur={basicDefs?.searchField?.onBlur ?? null}
                />
              </div>
            ) : null}
          </div>
        </div>

        {/*NAVIGATION*/}

        <div
          className={
            'px-2 px-sm-3 col-3 col-sm-3 d-flex h-75 align-items-center justify-content-end'
          }
        >
          <div className={styles.headerNav}>
            <button
              className={styles.cartBtn}
              onClick={buttonsDefs?.cart ?? null}
            >
              <div className={styles.cartBtn_img}>
                <Image
                  src={'/Header/header_cart.svg'}
                  alt={'cart'}
                  fill={true}
                  style={{
                    objectFit: 'contain',
                  }}
                />
              </div>
            </button>

            <button
              className={styles.contactsBtn}
              onClick={buttonsDefs?.contacts ?? null}
            >
              <div className={styles.contactsBtn_img}>
                <Image
                  src={'/Header/header_contacts.svg'}
                  alt={'contacts'}
                  fill={true}
                  style={{
                    objectFit: 'contain',
                  }}
                />
              </div>
              <span>{translation?.contacts}</span>
            </button>

            <div
              style={{
                position: 'absolute',
                display: 'none',
              }}
            >
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header
