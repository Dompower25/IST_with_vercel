import { useEffect, useState } from 'react'
import styles from './componentLoader.module.scss'

export default function ComponentLoader({
  data,
  children,
  data_setter,
  margin,
  fill_percent,
}) {
  const [isLoaded, setLoaded] = useState(false)
  const [returnVal, setReturn] = useState('Loading Error...')

  useEffect(() => {
    if (data !== undefined && data !== null) setLoaded(true)
  })

  useEffect(() => {
    setReturn(data)
    if (data_setter) {
      data_setter(data)
    }
  }, [isLoaded])

  return isLoaded ? (
    <>{children}</>
  ) : (
    <>
      <div
        className={styles.ComponentLoader}
        style={
          margin && fill_percent
            ? {
                marginTop: margin + 'px',
                width: fill_percent + '%',

                marginLeft: 50 + '%',
                transform: 'translateX(-50%)',
              }
            : margin
              ? {
                  marginTop: margin + 'px',
                }
              : fill_percent
                ? {
                    width: fill_percent + '%',
                  }
                : null
        }
      ></div>
    </>
  )
}
