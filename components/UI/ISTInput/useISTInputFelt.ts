import styles from './input.module.scss'
import React from 'react'

type dataType = {
  refObj: React.MutableRefObject<any | null>
  required: boolean
}

interface fieldStatus {
  id: number
  req: boolean
  felt: boolean
}

export const useISTInputFelt = () => {
  const printErr = () => {
    alert('Something went wrong =(\nReload the page')
  }

  const convert = (data: Array<dataType>): Array<fieldStatus> => {
    const fields: Array<fieldStatus> = []

    data.map((elem, i) => {
      const refObjVal: string = elem.refObj.current
        ? elem.refObj.current.value
        : printErr()

      const newField: fieldStatus = {
        id: i,
        req: elem.required,
        felt: refObjVal.length >= 2,
      }

      fields.push(newField)
    })

    return fields
  }

  const removeAllWarns = (data: Array<dataType>) => {
    data.map((el) => {
      const item = el.refObj.current
      if (item && item.classList.contains(styles._input_required))
        item.classList.remove(styles._input_required)
    })
  }

  const checkFields = (data: Array<dataType>) => {
    removeAllWarns(data)
    const convertedData = convert(data)
    const unFeltFields = convertedData.filter((el) => el.req && !el.felt)

    if (unFeltFields && unFeltFields.length > 0) {
      unFeltFields.map((el) => {
        const unFelt = data[el.id].refObj.current
        if (unFelt && !unFelt.classList.contains(styles._input_required))
          unFelt.classList.add(styles._input_required)
      })

      return false
    } else if (unFeltFields && unFeltFields.length === 0) return true
    else {
      printErr()
      return false
    }
  }

  return {
    checkFields,
  }
}
