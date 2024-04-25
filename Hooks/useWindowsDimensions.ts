import { useState, useEffect } from 'react'

export interface IWindowSizes {
  width: number | null
  height: number | null
}

const getWindowDimensions = (): IWindowSizes => {
  if (typeof window !== 'undefined') {
    const { innerWidth: width, innerHeight: height } = window
    return {
      width,
      height,
    }
  } else {
    return {
      width: null,
      height: null,
    }
  }
}

export default function useWindowDimensions(timeoutMs?: number) {
  const [windowDimensions, setWindowDimensions] = useState<IWindowSizes>(
    getWindowDimensions(),
  )

  useEffect(() => {
    let timeoutId: NodeJS.Timeout

    function handleResizeTimeOut() {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => {
        setWindowDimensions(getWindowDimensions())
      }, timeoutMs)
    }

    function handleResize() {
      setWindowDimensions(getWindowDimensions())
    }

    window.addEventListener(
      'resize',
      timeoutMs ? handleResizeTimeOut : handleResize,
    )

    return () => {
      window.removeEventListener(
        'resize',
        timeoutMs ? handleResizeTimeOut : handleResize,
      )
      clearTimeout(timeoutId)
    }
  }, [timeoutMs])

  return windowDimensions
}
