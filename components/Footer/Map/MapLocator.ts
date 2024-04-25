import { number } from 'prop-types'

export interface IMapViewer {
  location: string
  zoom: number
}

export const getCenterLocation = (baseStr: string): Array<number> => {
  const re = /\s*(?:,|;|$)\s*|\s/
  const sLoc = baseStr.split(re)

  const fillFloat = (arr: Array<string>): Array<number> => {
    const outArr: Array<number> = []
    arr.map((elem) => {
      outArr.push(parseFloat(elem))
    })

    return outArr
  }

  const checkNaNArr = (arr: Array<number>): boolean => {
    let status: boolean = false
    arr.map((elem) => {
      if (isNaN(elem)) status = true
    })

    return status
  }

  const outArr = fillFloat(sLoc)
  if (!checkNaNArr(outArr)) return outArr
  else return [0, 0]
}
