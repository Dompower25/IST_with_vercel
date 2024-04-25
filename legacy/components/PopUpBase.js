import { useState, useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'
import styles from './popUpBase.module.scss'

export default function PopUpBase({
  puState,
  children,
  header,
  paragraph,
  closer,
  nonBorder,
}) {
  const [isBrowser, setIsBrowser] = useState(false)

  function backHider(e) {
    if (
      e.target.classList.contains(`${styles.PopUpLayout}`) ||
      e.target.classList.contains(`${styles.PopUpBaseCantainer}`) ||
      e.target.id === 'btn_closer'
    ) {
      document.querySelector(`.${styles.PopUpLayout}`).style.opacity = '0'

      setTimeout(() => {
        closer(false)
      }, 300)
    } else {
      null
    }
  }

  useEffect(() => {
    !puState
      ? (document.body.style.overflowY = 'auto')
      : (document.body.style.overflowY = 'hidden')
    puState
      ? (document.querySelector(`.${styles.PopUpLayout}`).style.opacity = '1')
      : null
  }, [puState])

  useEffect(() => {
    setIsBrowser(true)
  }, [])

  const modalContent = puState ? (
    <>
      <div className={styles.PopUpLayout} onClick={(e) => backHider(e)}>
        <div className="nb_container">
          <div className={styles.PopUpBaseCantainer}>
            <div
              className={
                nonBorder === true
                  ? styles.PopUpBaseContent + ' ' + styles.wb_style
                  : styles.PopUpBaseContent
              }
            >
              <div className={styles.PUB_header}>
                <h1>{header}</h1>

                <p>{paragraph}</p>

                <button onClick={(e) => backHider(e)}>
                  <img src="/PU_closer.svg" alt="Close" id="btn_closer" />
                </button>
              </div>

              <div className={styles.PUB_content}>{children}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  ) : (
    ''
  )

  if (isBrowser) {
    return createPortal(modalContent, document.getElementById('PopUpBase'))
  } else {
    return null
  }
}
