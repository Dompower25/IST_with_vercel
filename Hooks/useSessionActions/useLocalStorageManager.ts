import { useCallback } from 'react'
import { sessionObjectKey } from './common'

export const useLocalStorageManager = (
  storageItemName: string = sessionObjectKey,
) => {
  const getStorageItem = useCallback(() => {
    return typeof window !== 'undefined' &&
      localStorage.getItem(storageItemName)
      ? localStorage.getItem(storageItemName)
      : null
  }, [storageItemName])

  const setStorageItem = useCallback(
    (id: string | number) => {
      window !== undefined
        ? localStorage.setItem(storageItemName, id.toString())
        : null
    },
    [storageItemName],
  )

  const removeStorageItem = useCallback(() => {
    let _sessionCaratId = getStorageItem()
    if (_sessionCaratId && window) localStorage.removeItem(storageItemName)
  }, [getStorageItem, storageItemName])

  return {
    getStorageItem,
    setStorageItem,
    removeStorageItem,
  }
}
