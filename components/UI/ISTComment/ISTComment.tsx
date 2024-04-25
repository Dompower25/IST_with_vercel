import React, {
  CSSProperties,
  FC,
  ForwardedRef,
  useEffect,
  useState,
} from 'react'
import styles from './ISTComment.module.scss'
import Image from 'next/image'
import { cstmStyles } from '../common'

export type styleProps = Pick<
  CSSProperties,
  'margin' | 'marginRight' | 'marginLeft' | 'marginTop' | 'marginBottom'
>

interface ISTComment {
  name: string
  rate: string
  comment: string
  category: string

  customAdaptiveStyles?: cstmStyles
  style?: styleProps

  desiredRef?: ForwardedRef<HTMLDivElement>
  isDesired?: boolean
  event?: (...props) => any
}

const ISTComment: FC<ISTComment> = ({
  name,
  rate,
  comment,
  category,
  style,
  customAdaptiveStyles,
  desiredRef,
  isDesired,
  event,
}) => {
  // useEffect(()=>{
  //     console.log("CSTM CSS: ", customAdaptiveStyles);
  // },[])

  return (
    <>
      <div
        className={`${styles.comment_container} ${customAdaptiveStyles?.comment_container} ${isDesired ? styles.desired : ''}`}
        style={style}
        ref={isDesired ? desiredRef : null}
      >
        <div
          className={`${styles.comment_header} ${customAdaptiveStyles?.comment_header}`}
        >
          <div className={`${styles.name} ${customAdaptiveStyles?.name}`}>
            {name}
          </div>
          <div
            className={`${styles.category} ${customAdaptiveStyles?.category}`}
          >
            {category}
          </div>
          <div
            className={`${styles.rate_container} ${customAdaptiveStyles?.rate_container}`}
          >
            <div
              className={`${styles.comment_rate} ${customAdaptiveStyles?.comment_rate}`}
            >
              <Image src={rate} alt={'FeedBack_Reaction_image'} fill={true} />
            </div>
          </div>
        </div>

        <div className={`${styles.comment} ${customAdaptiveStyles?.comment}`}>
          {comment}
        </div>

        <div
          className={`${styles.rFull_link} ${customAdaptiveStyles?.rFull_link}`}
        >
          <a onClick={() => (event ? event() : {})}>Read full</a>
        </div>
      </div>
    </>

    // <>
    //     <div className={newItemStyles.comment_container}
    //          style={style}
    //     >
    //         <div className={newItemStyles.comment_header}>
    //             <div className={newItemStyles.name}>{name}</div>
    //             <div className={newItemStyles.category}>{category}</div>
    //             <div className={newItemStyles.rate_container}>
    //                 <div className={newItemStyles.comment_rate}>
    //                     <Image
    //                         src={rate}
    //                         alt={"FeedBack_Reaction_image"}
    //                         fill={true}
    //                     />
    //                 </div>
    //             </div>
    //         </div>
    //
    //         <div className={newItemStyles.comment}>
    //             {comment}
    //         </div>
    //
    //         <div className={newItemStyles.rFull_link}>
    //             <a onClick={() => event ? event() : {}}>Read full</a>
    //         </div>
    //     </div>
    // </>
  )
}

export default ISTComment
