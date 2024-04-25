import { useEffect, useRef } from 'react'

type ChangeHandler = (...args: unknown[]) => void

function useDelayedEffect(
  callback: ChangeHandler,
  delay: number,
  dependencies: unknown[],
): void {
  const callbackRef = useRef<ChangeHandler>()
  const isCallbackRunningRef = useRef<boolean>(false)
  const timeoutRef = useRef<NodeJS.Timeout>()

  useEffect(() => {
    callbackRef.current = callback
  }, [callback])

  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    if (!isCallbackRunningRef.current) {
      timeoutRef.current = setTimeout(() => {
        if (callbackRef.current) {
          isCallbackRunningRef.current = true
          callbackRef.current(...dependencies)
          isCallbackRunningRef.current = false
        }
      }, delay)
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies)
}

export default useDelayedEffect
