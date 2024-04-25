import React, { Dispatch, FC, useEffect, useRef, useState } from 'react'
import styles from './headerCatalog.module.scss'
import { IInputDataSetter, mobileTrigger_size } from '../../UI/common'
import Image from 'next/image'
import IstInput, { inputTypesVars } from '../../UI/ISTInput/ISTInput'
import Link from 'next/link'

interface IHeader {
  mobileTriggerSize?: mobileTrigger_size
  searchingElement: ISearchOptions
  logo: ILogoOptions
}

type ISearchOptions = {
  focus: boolean
  searchField: boolean
  searchSetter: Dispatch<string>
  searchValue: string
}

type ILogoOptions = {
  forwardingPath: string
  logoSrc: string
}

const HeaderCatalog: FC<IHeader> = ({
  logo,
  searchingElement,
  mobileTriggerSize,
}) => {
  const inputRef = useRef<HTMLInputElement>()

  return (
    <>
      <div
        className={`row pr-3 pl-3 position-fixed fixed-top ${
          mobileTriggerSize
            ? styles[`header_${mobileTriggerSize}`]
            : styles[`header_MD_768`]
        } ${styles[`header`]}`}
      >
        <div
          className={`col-11 col-md-2 p-0 h-100 align-items-center ${styles.logoBlock}`}
        >
          <Link href={logo?.forwardingPath ? logo.forwardingPath : ''}>
            <div className={styles.logoContainer}>
              <Image
                src={logo?.logoSrc}
                alt={'Header Logo'}
                fill={true}
                style={{
                  objectFit: 'contain',
                  objectPosition: 'left',
                  padding: '5px',
                }}
              />
            </div>
          </Link>
        </div>
        {searchingElement?.searchField ? (
          <div
            className={`col-8 d-none col-lg-6 mr-auto ${styles.searchBlock}`}
          >
            <IstInput
              ref={inputRef}
              inputType={inputTypesVars.any_string}
              placeholder={'Search'}
              required={false}
              outDataSetter={searchingElement.searchSetter}
              actualData={searchingElement.searchValue}
              style={{ borderRadius: '15px', height: '55px' }}
            />
          </div>
        ) : (
          ''
        )}
      </div>
    </>
  )
}

export default HeaderCatalog
