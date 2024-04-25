export interface IPaginationParameters {
  limit: number
  offset: number
}

export const deepArrayCompare = (arr1: unknown[], arr2: unknown[]): boolean => {
  if (arr1.length !== arr2.length) {
    return false
  }

  for (let i = 0; i < arr1.length; i++) {
    if (Array.isArray(arr1[i]) && Array.isArray(arr2[i])) {
      if (!deepArrayCompare(arr1[i] as unknown[], arr2[i] as unknown[])) {
        return false
      }
    } else if (arr1[i] !== arr2[i]) {
      return false
    }
  }

  return true
}
