import Image from 'next/image'
import { useState, useEffect } from 'react'

export default function NextImageRatioSaver({
  Img,
  wPrime,
  hPrime,
  q,
  unique,
  primaryFill,
  placeholderBlurURL,
  primaryLoad,
  alt = '',
  title = '',
}) {
  const [quality, setQuality] = useState(75)

  const [imageSize, setSize] = useState({
    width: 0,
    height: 0,
  })

  const [calibratedSize, setCalibrated] = useState({
    width: 0,
    height: 0,
  })

  const [PrimeOpt, setPrime] = useState({
    width: false,
    height: false,
    autofill: false,
  })

  const [uniqueName, setUnique] = useState(unique ? unique : '')

  // W-PRIME IS DEF

  // useEffect(()=>{
  //     if(wPrime === undefined){
  //         setPrime({
  //             width: false,
  //             height: true
  //         })
  //     }
  //     else if(hPrime === undefined){
  //         setPrime({
  //             width: true,
  //             height: false
  //         })
  //     }
  //     else if(hPrime===undefined && wPrime===undefined){
  //         setPrime({
  //             width: true,
  //             height: false
  //         })
  //     }
  //     else if(hPrime===true && wPrime===true){
  //         setPrime({
  //             width: true,
  //             height: false
  //         })
  //     }
  //     else if(hPrime===false && wPrime===false){
  //         setPrime({
  //             width: true,
  //             height: false
  //         })
  //     }
  //     else{
  //         setPrime({
  //             width: wPrime,
  //             height: hPrime
  //         })
  //     }
  //
  // },[])

  useEffect(() => {
    if (primaryFill) {
      let primaryVal = primaryFill
      if (hPrime || wPrime)
        hPrime
          ? (primaryVal = 'height')
          : wPrime
            ? (primaryVal = 'width')
            : (primaryVal = 'autofill')

      if (PrimeOpt.hasOwnProperty(primaryVal)) {
        const setValue = {
          ...PrimeOpt,
          ...(PrimeOpt[primaryVal] = true),
        }
        setPrime(setValue)
      }
    }
  }, [])

  useEffect(() => {
    if (q !== undefined && typeof q === 'number') {
      // console.log(q);
      setQuality(q)
    }
  }, [q])

  // useEffect(()=>{
  //     if(unique !== undefined){
  //         try{
  //             setUnique(unique.toString());
  //         }catch(err){
  //             setUnique("");
  //             console.error("Unique type is not correct: ", err);
  //         }
  //     }
  // },[])

  const resizer = (CalibrationItem) => {
    if (imageSize.width !== 0 && imageSize.height !== 0) {
      if (PrimeOpt.width) {
        setCalibrated({
          width: CalibrationItem.offsetWidth,
          height:
            (imageSize.height / imageSize.width) * CalibrationItem.offsetWidth,
        })
      } else if (PrimeOpt.height) {
        setCalibrated({
          width:
            (imageSize.width / imageSize.height) * CalibrationItem.offsetHeight,
          height: CalibrationItem.offsetHeight,
        })

        // console.log(
        //     "W: ", imageSize.width,
        //     "H: ", CalibrationItem.offsetHeight);
      } else if (PrimeOpt.autofill) {
        const tWidth = CalibrationItem.offsetWidth
        const tHeight =
          (imageSize.height / imageSize.width) * CalibrationItem.offsetWidth

        let k = 1

        if (tHeight < CalibrationItem.offsetHeight)
          k = CalibrationItem.offsetHeight / tHeight

        if (tWidth < CalibrationItem.offsetWidth)
          k = CalibrationItem.offsetWidth / tWidth

        setCalibrated({
          width: tWidth * k,
          height: tHeight * k,
        })
      }
    }
  }

  const windowSizeListener = () => {
    const CalibrationItem = document.querySelector(
      '.CalibrationBlock_' + uniqueName,
    )

    if (
      calibratedSize.height > 0 &&
      calibratedSize.height !== CalibrationItem.offsetHeight &&
      PrimeOpt.height
    ) {
      resizer(CalibrationItem)
      console.log(
        'HEIGHT CHANGED!',
        'Base: ',
        calibratedSize.height,
        'Calib: ',
        CalibrationItem.offsetHeight,
      )
    } else if (
      calibratedSize.width > 0 &&
      calibratedSize.width !== CalibrationItem.offsetWidth &&
      PrimeOpt.width
    ) {
      console.log(
        'WIDTH CHANGED!',
        'Base: ',
        calibratedSize.width,
        'Calib: ',
        CalibrationItem.offsetWidth,
      )
      resizer(CalibrationItem)
    }
  }

  useEffect(() => {
    window.addEventListener('resize', windowSizeListener, false)
    return () => {
      window.removeEventListener('resize', windowSizeListener, false)
    }
  }, [calibratedSize, PrimeOpt])

  useEffect(() => {
    const CalibrationItem = document.querySelector(
      '.CalibrationBlock_' + uniqueName,
    )

    if (!CalibrationItem.classList.contains('.Ex')) {
      CalibrationItem.classList.add('Ex')

      resizer(CalibrationItem)
      // console.log("imakgeSize: ", CalibrationItem);
    }
  }, [imageSize])

  // useEffect(()=>{
  // if(lilImgLoad){
  //    const lImg = document.querySelector("#lil_img_");
  //    setSize(
  //     {
  //         width: lImg.naturalWidth,
  //         height: lImg.naturalHeight
  //     })
  // }
  // },[lilImgLoad]);

  // WAS CHANGED. Prev version --^
  useEffect(() => {
    setTimeout(() => {
      const lImg = document.getElementById('lil_img_' + uniqueName)

      try {
        // console.log(lImg, "w: ", lImg.naturalWidth, "H: ", lImg.offsetHeight);
        setSize({
          width: lImg.naturalWidth,
          height: lImg.naturalHeight,
        })
      } catch {}

      //  console.log("Rendered!!");
    }, 150)

    //  console.log(uniqueName);
  })

  return (
    <>
      <div style={{ position: `relative`, width: `100%`, height: `100%` }}>
        <img
          src={Img}
          style={{
            opacity: '0',
            position: `absolute`,
          }}
          id={'lil_img_' + uniqueName}
        />

        <div
          className={`CalibrationBlock_` + uniqueName}
          style={{ width: `100%`, height: `100%`, position: `absolute` }}
        ></div>

        <div
          className={`NextImageRatioSaver_` + uniqueName}
          style={{
            width: calibratedSize.width + `px`,
            height: calibratedSize.height + `px`,
            position: `relative`,
          }}
        >
          <Image
            src={Img}
            layout="fill"
            q={quality}
            blurDataURL={placeholderBlurURL ? placeholderBlurURL : null}
            placeholder={placeholderBlurURL ? 'blur' : null}
            priority={primaryLoad ? true : false}
            alt={alt}
            title={title}
          />
        </div>
      </div>
    </>
  )
}
