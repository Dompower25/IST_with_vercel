import { CSSProperties, FC, useEffect, useMemo } from 'react'
import styles from './loaderModal.module.scss'
import useBaseModal from '../../../Hooks/useBaseModal/useBaseModal'
import useWindowDimensions from '../../../Hooks/useWindowsDimensions'
import Image from 'next/image'
import loaderImage from './fullSizeLoader.gif'

interface ILoaderModal {
  loadingState: boolean
  targetContainerId: string
}

const LoaderModal: FC<ILoaderModal> = ({ loadingState, targetContainerId }) => {
  const { width } = useWindowDimensions()

  const loaderModalTN = 'loaderModal'
  const [modalComponent, ModalView] = useBaseModal(
    'APP_BODY_WRAPPER',
    targetContainerId,
    {
      modals: [
        {
          typeName: loaderModalTN,
          _header: '',
          _paragraph: '',
        },
      ],
    },
  )

  const buildOffset = (): string => {
    const loaderOffset = '50%'
    if (typeof window === 'undefined') return
    const targetContainer = document.getElementById(targetContainerId)
    if (targetContainer) {
      const elemRect = targetContainer.getBoundingClientRect()
      const newOffset = elemRect
        ? `${elemRect.left + elemRect.width / 2}px`
        : loaderOffset
      return newOffset
    } else return
  }

  const loaderAfterStyle: CSSProperties = useMemo(() => {
    return {
      left: buildOffset(),
    } as CSSProperties
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [width])

  useEffect(() => {
    modalComponent.switch(loadingState)
  }, [loadingState, modalComponent])

  return (
    <ModalView
      style={{
        minWidth: 'unset',
        width: '100%',
        position: 'relative',
        minHeight: 'unset',
        height: '100%',
        zIndex: 'unset',
      }}
    >
      <div className={`${styles.loader_container}`}>
        <div className={styles.loader} style={loaderAfterStyle}>
          {loadingState ? (
            <Image
              src={loaderImage}
              alt={'LOADER_ANIMATION'}
              fill
              style={{
                objectFit: 'contain',
                objectPosition: 'center',
                padding: '10px',
              }}
            />
          ) : null}
        </div>
      </div>
    </ModalView>
  )
}

export default LoaderModal
