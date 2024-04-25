import { FC, useCallback, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import {
  hintsModalSetState,
  modalHideAll,
  puModalSetByName,
  puModalSetState,
} from '../../../store/slices/modalSlice/modalSlice'
import { useRouter } from 'next/router'
import { LoadingModalWrapper } from './wrappers/loadingModalWrapper'
import { HintsModalWrapper } from './wrappers/hintsModalWrapper'
import { PopUpModalWrapper } from './wrappers/puModalWrapper'

export const ModalStore: FC = () => {
  const dispatch = useDispatch()
  const router = useRouter()

  // ==============
  //    GENERAL
  // ==============

  // ON CHANGE ROUTE
  // * Hide all modals when route is changing
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleChangeRoute = () => {
    dispatch(modalHideAll())
  }

  useEffect(() => {
    router.events.on('routeChangeStart', handleChangeRoute)
    return () => {
      router.events.off('routeChangeStart', handleChangeRoute)
    }
  }, [handleChangeRoute, router.events])

  // ===========
  //    HINTS
  // ===========

  // SEARCH HINTS > SHOW MORE
  const showMoreProducts = useCallback(
    (request: string) => {
      if (!router) return
      router.push(
        `/products${request ? `/?search=${encodeURIComponent(request)}` : ''}`,
      )
    },
    [router],
  )

  // CLOSE SEARCH HINTS
  const closeHints = () => {
    dispatch(hintsModalSetState(false))
  }

  // CLOSE POP-UP MODAL
  const closeModal = useCallback(() => {
    dispatch(puModalSetState(false))
  }, [dispatch])

  const onUpdateModal = useCallback(
    (modalName: string) => {
      dispatch(puModalSetByName(modalName))
    },
    [dispatch],
  )

  return (
    <>
      {/* 💿 LOADER MODAL */}
      <LoadingModalWrapper />

      {/* 🔍 SEARCH HINTS MODAL */}
      <HintsModalWrapper onShowMore={showMoreProducts} closer={closeHints} />

      {/* ℹ️ POP-UP MODAL */}
      <PopUpModalWrapper onClose={closeModal} onUpdateModal={onUpdateModal} />
    </>
  )
}
