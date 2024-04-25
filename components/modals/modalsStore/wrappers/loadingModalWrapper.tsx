import { FC } from 'react'
import LoaderModal from '../../loader/loaderModal'
import { useAppSelector } from '../../../../Hooks/reduxSettings'

export const LoadingModalWrapper: FC = () => {
  const loaderModal = useAppSelector((modal) => modal.modal.loaderModal)
  return (
    <>
      <LoaderModal
        loadingState={loaderModal.state}
        targetContainerId={'LoadingSpace'}
      />
    </>
  )
}
