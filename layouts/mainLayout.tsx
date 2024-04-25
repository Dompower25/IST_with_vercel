import { FC, ReactNode } from 'react'
import { ModalStore } from '../components/modals/modalsStore/modalsStore'

const MainLayout: FC<{
  children: ReactNode
}> = ({ children }) => {
  return (
    <div className={'container-fluid p-0'}>
      <ModalStore />
      {children}
    </div>
  )
}

export default MainLayout
