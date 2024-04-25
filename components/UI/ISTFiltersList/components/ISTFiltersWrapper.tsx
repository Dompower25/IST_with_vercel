import React, { FC, useCallback, useState } from 'react'
import {
  getMobileSettings_isTransfer,
  getMobileSettings_triggerSize,
  IST_IFiltersWrapper,
} from '../common'

import styles from '../styles/filtersWrapper.module.scss'
import adaptiveStyles from '../styles/filtersWrapperAdaptive.module.scss'

const ISTFiltersWrapper: FC<IST_IFiltersWrapper> = ({
  title,
  isOpened,
  children,
  hasActives,
  mobileSettings,
}) => {
  const [openState, setOpenState] = useState<boolean>(isOpened)

  const switchOpenState = () => {
    setOpenState(!openState)
  }

  const transferHandler = useCallback(() => {
    if (mobileSettings && mobileSettings.type === 'transfer')
      mobileSettings.onTransfer()
    else
      throw new Error(
        'failed to define the handler function "onTransfer" from the settings of the mobile version of the component',
      )
  }, [mobileSettings])

  return (
    <>
      <div
        className={`
              ${styles.container} 
              ${adaptiveStyles[getMobileSettings_triggerSize(mobileSettings)]}
            `}
      >
        {hasActives ? <div className={styles.dot} /> : null}
        <div
          className={`${styles.title}  
                    ${hasActives ? styles.titleTransition : ''}`}
        >
          <div
            className={`${adaptiveStyles.titleHandlerBlock} 
                        ${adaptiveStyles.default_handler} 
                        ${
                          getMobileSettings_isTransfer(mobileSettings)
                            ? adaptiveStyles[
                                `default_handler_${getMobileSettings_triggerSize(
                                  mobileSettings,
                                )}`
                              ]
                            : ''
                        }
                    `}
            onClick={() => switchOpenState()}
          />

          <div
            className={`${adaptiveStyles.titleHandlerBlock} 
                        ${adaptiveStyles.mobile_transfer}
                        ${
                          getMobileSettings_isTransfer(mobileSettings)
                            ? adaptiveStyles[
                                `mobile_transfer_${getMobileSettings_triggerSize(
                                  mobileSettings,
                                )}`
                              ]
                            : ''
                        }
                    `}
            onClick={transferHandler}
          />

          {title}

          <div
            className={`
                            ${
                              getMobileSettings_isTransfer(mobileSettings)
                                ? adaptiveStyles[
                                    `vector_${getMobileSettings_triggerSize(mobileSettings)}`
                                  ]
                                : ''
                            }
                           
                            ${styles.vector} 
                            ${openState ? styles.active : ''}
                            
                            ${
                              getMobileSettings_isTransfer(mobileSettings) &&
                              openState
                                ? adaptiveStyles.vector_active
                                : ''
                            }
                        `}
          />
        </div>

        <div
          className={`
                    ${styles.ch_wrapper} 
                    ${openState ? styles.active : ''}
                    ${
                      getMobileSettings_isTransfer(mobileSettings)
                        ? adaptiveStyles[
                            `ch_wrapper_hider_${getMobileSettings_triggerSize(mobileSettings)}`
                          ]
                        : ''
                    }
                `}
        >
          {children}
        </div>
      </div>
    </>
  )
}

export default ISTFiltersWrapper
