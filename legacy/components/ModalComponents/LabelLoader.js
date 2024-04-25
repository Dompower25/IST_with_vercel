import { useEffect, useState } from 'react'
import styles from './labelLoader.module.scss'

export default function LabelLoader({
  data,
  field,
  LoadSizeInSymbols,
  LoadSizeText,
  stateSetter,
}) {
  function generate_string(length) {
    var result = ''
    var characters = String.fromCharCode(9938)
    var break_point = 11
    var new_str = 0
    for (var i = 0; i < length; i++) {
      if (i % break_point === 0 && i !== 0) {
        result += '\n'
      }
      result += characters
    }

    return result

    //    var arr = result.split(/\s+/);
    //     for(var i = 0; i < arr.length; i++)
    //     {
    //         if(arr[i]){
    //             arr[i] = '<span className={styles.Loader}>'+arr[i]+'</span>';
    //         }
    //     }
    //    return arr.join('');
  }

  const [isLoaded, setLoaded] = useState(false)
  const [returnVal, setReturn] = useState('Loading Error...')

  const [laodSymbols, setLoadSymbols] = useState()
  const [loadingVal, setLoadingVal] = useState('Loading...')

  useEffect(() => {
    if (LoadSizeInSymbols) setLoadSymbols(LoadSizeInSymbols)

    if (LoadSizeText) setLoadSymbols(LoadSizeText.length)

    if (LoadSizeInSymbols && LoadSizeText) setLoadSymbols(LoadSizeInSymbols)

    if (!LoadSizeInSymbols && !LoadSizeText) setLoadSymbols(15)
  }, [])

  // useEffect(()=>{
  //     if(stateSetter){
  //         setReturnValMode(false);
  //     }
  // },[stateSetter])

  useEffect(() => {
    if (data !== undefined && data !== null) setLoaded(true)
  })

  useEffect(() => {
    if (!isLoaded && laodSymbols) {
      setLoadingVal(generate_string(laodSymbols))
    }
  }, [isLoaded, laodSymbols])

  useEffect(() => {
    if (isLoaded) {
      const res_keys = Object.keys(data)
      if (res_keys.includes(field)) {
        const return_val = Object.getOwnPropertyDescriptor(data, field).value
        setReturn(return_val.replaceAll('\\n', '\n'))
        if (stateSetter) {
          stateSetter(return_val)
        }
      }
    }
  }, [isLoaded])

  return isLoaded ? (
    !stateSetter ? (
      returnVal
    ) : (
      ''
    )
  ) : (
    <>
      <span className={styles.Loader}>{loadingVal}</span>
    </>
  )
}
