import React, {
  CSSProperties,
  FC,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { IModalOptions, modalStater } from './modalSetter'
import { createPortal } from 'react-dom'

interface modalView {
  children?: ReactNode
  data?: modalStater
  currentData?: any
}

type alignStyle = {
  vertical?: 'end' | 'start' | 'center'
  horizontal?: 'end' | 'start' | 'center'
}

type styles = Pick<
  CSSProperties,
  | 'zIndex'
  | 'height'
  | 'width'
  | 'minHeight'
  | 'minWidth'
  | 'position'
  | 'top'
  | 'left'
  | 'bottom'
  | 'right'
>

interface IAlignStyle {
  alignStyle?: alignStyle
  style?: styles
}

export interface IBaseModalFC extends modalView, IAlignStyle {}

const useBaseModal = (
  ContainerIdForScrollBlocking?: string,
  TransferBlockId?: string,
  Options?: IModalOptions,
): [modalStater, FC<IBaseModalFC>] => {
  const [mainState, dataUpdate] = useState<modalStater>(null)

  const modalComponent = useMemo(() => {
    const newModal = new modalStater()
    newModal.setDataUpdater(dataUpdate)
    return newModal
  }, [])

  useEffect(() => {
    if (!Options) return
    modalComponent.editModals(Options.modals, Options.startModalIndex ?? 0)
  }, [Options, modalComponent])

  const sendWarn = () => {
    console.warn(
      'Base modal component:\n' +
        'The container with the ID you provided was not found',
    )
  }

  useEffect(() => {
    const modalStateBP = 'modal-state'
    const targetForScroll = 'modal-target-for-scroll'
    const pageBody = document.getElementById(ContainerIdForScrollBlocking)

    if (!mainState) return
    if (!pageBody) {
      sendWarn()
      return
    }

    // ADD DEFAULT CLASS-NAME FOR TARGET SCROLL-BLOCK
    pageBody.classList.add(targetForScroll)

    // MANAGE MODALS STATE
    if (mainState.getState)
      pageBody.classList.add(`${modalStateBP}-${mainState.getModalName}`)
    else {
      const modalName = `${modalStateBP}-${mainState.getModalName}`
      pageBody.classList.remove(
        ...Array.from(pageBody.classList).filter(
          (className) => className === modalName,
        ),
      )
    }

    // SET OVERFLOW STYLES
    if (pageBody.classList.length > 1) pageBody.style.overflow = 'hidden'
    else pageBody.style.overflow = 'auto'
  }, [ContainerIdForScrollBlocking, mainState])

  const portalSender = useCallback(
    (modal: React.ReactNode) => {
      if (mainState)
        return createPortal(
          mainState.getState ? modal : null,
          document.getElementById(
            TransferBlockId ? TransferBlockId : 'PopUpBase',
          ),
        )
    },
    [TransferBlockId, mainState],
  )

  const ModalView: FC<IBaseModalFC> = ({
    children,
    data,
    alignStyle,
    style,
  }) => {
    const modal = useMemo(() => {
      return (
        <>
          <div
            style={{
              minWidth: style?.minWidth ? style?.minWidth : '100vw',
              width: style?.width ? style?.width : 'unset',

              minHeight: style?.minHeight ? style?.minHeight : '100%',
              height: style?.height ? style?.height : '100%',

              position: style?.position ? style?.position : 'fixed',
              zIndex: style?.zIndex ? style.zIndex : 10,

              justifyContent: alignStyle?.horizontal
                ? alignStyle?.horizontal
                : 'center',

              alignItems: alignStyle?.vertical
                ? alignStyle?.vertical
                : 'center',

              display: 'flex',
              ...style,
            }}
          >
            {children}
          </div>
        </>
      )
    }, [alignStyle?.horizontal, alignStyle?.vertical, children, style])

    return mainState?.getState ? portalSender(modal) : null
  }

  return [modalComponent, ModalView]
}

export default useBaseModal
