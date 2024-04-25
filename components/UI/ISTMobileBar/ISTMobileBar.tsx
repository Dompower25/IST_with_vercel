import React, { FC, useCallback, useEffect, useRef, useState } from 'react'
import { IISTMobileBar } from './Abstract/I_ISTMobileBar'
import styles from './ISTMobileBar.module.scss'
import Image from 'next/image'
import ISTInput, { inputTypesVars } from '../ISTInput/ISTInput'

const ISTMobileBar: FC<IISTMobileBar> = ({
  buttons,
  style,
  mobileTriggerSize,
  inputOptions,
}) => {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleOnBlur = useCallback(() => {
    if (inputRef?.current && inputOptions) inputOptions.onBlur()
  }, [inputRef, inputOptions])

  useEffect(() => {
    if (inputOptions?.state && inputRef?.current) inputRef.current.focus()
  }, [inputOptions?.state, inputRef])

  return (
    <div
      className={`${styles.mobileBar} ${styles[mobileTriggerSize]} ${inputOptions?.state ? styles.searching : ''}`}
      style={{
        minHeight: '90px',
        ...style,
      }}
    >
      {inputOptions?.state ? (
        <>
          <ISTInput
            inputType={inputTypesVars.any_string}
            placeholder={inputOptions?.placeholder}
            required={false}
            ref={inputRef}
            outDataSetter={inputOptions?.currentDataSetter}
            actualData={inputOptions?.currentData}
            style={{
              borderRadius: '15px',
              height: '52px',
            }}
          />

          <div
            className={styles.applyAndClose}
            onClick={() => {
              handleOnBlur()
            }}
          >
            <div className={styles.apply_ico} />
          </div>
        </>
      ) : (
        <>
          {buttons && buttons.length > 0
            ? buttons.map((el, i) => {
                return i <= 3 ? (
                  <div
                    key={`button_menu_mobile_${i}`}
                    className={`${styles.mobileBtn} ${el.isActive ? styles.active : ''}`}
                    style={{
                      width: `calc((100% - 14px - (${(buttons.length * 2 - 2) * 5}px)) / ${buttons.length})`,
                      maxWidth: `calc((100% - 14px - (${(buttons.length * 2 - 2) * 5}px)) / ${buttons.length})`,
                      minWidth: `calc((100% - 14px - (${(buttons.length * 2 - 2) * 5}px)) / ${buttons.length})`,
                    }}
                    onClick={el.action}
                  >
                    <div className={styles.imageWrapper}>
                      <Image
                        src={el.image}
                        alt={el.title}
                        sizes={'30px'}
                        fill={true}
                        style={{
                          objectPosition: 'center',
                          objectFit: 'contain',
                        }}
                      />
                    </div>

                    <div className={styles.titleWrapper}>{el.title}</div>
                  </div>
                ) : null
              })
            : null}
        </>
      )}
    </div>
  )
}

export default ISTMobileBar
