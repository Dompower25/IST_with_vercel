import { PayloadAction } from '@reduxjs/toolkit'
import { createGenericSlice } from '../genericSlice'
import { IModalsList } from '../../../components/modals/common'

type TModal = {
  state: boolean
}

// LOADER MODAL TYPES
type TQueueItem = {
  name: string
  state: boolean
}

type TLoaderModal = TModal & {
  queue: TQueueItem[]
}

// POP-UP MODALS TYPE
type TPopUpModal = TModal & {
  modalName: string
}

interface IModalsSlice extends Record<string, TModal> {
  popUp: TPopUpModal
  loaderModal: TLoaderModal
  hintsModal: {
    state: boolean
    searchString: string
  }
}

const initialState = {
  loaderModal: {
    state: false,
    queue: [],
  },
  hintsModal: {
    state: false,
  },
  popUp: {
    modalName: '',
    state: false,
  },
} as IModalsList<IModalsSlice>

const updateLoaderState = (loader: TLoaderModal) => {
  loader.state = loader.queue.length > 0
}

const QueueHandler = (
  isLoading: boolean,
  name: string,
  state: TLoaderModal,
) => {
  state.queue = state.queue.filter((el) => el.name !== name)
  isLoading === true
    ? state.queue.push({
        name,
        state: isLoading,
      })
    : null
  updateLoaderState(state)
}

const ModalSlice = createGenericSlice('modalSlice', initialState, {
  //LOADER MODAL
  loadingModalSetState(state, action: PayloadAction<TQueueItem>) {
    const queueItem = action.payload as TQueueItem
    QueueHandler(queueItem.state, queueItem.name, state.loaderModal)
    state.loaderModal.state = state.loaderModal.queue.length > 0
  },

  loadingModalAddToQueue(state, action: PayloadAction<string[]>) {
    action.payload.map((el) => QueueHandler(true, el, state.loaderModal))
  },

  // SEARCH HINTS
  hintsModalSetState(state, action: PayloadAction<boolean>) {
    state.hintsModal.state = action.payload
  },

  hintsModalSetSearch(state, action: PayloadAction<string>) {
    state.hintsModal.searchString = action.payload
  },

  // POP-UP MODALS
  puModalSetByName(state, action: PayloadAction<string>) {
    state.popUp.modalName = action.payload
  },

  puModalOpenByName(state, action: PayloadAction<string>) {
    state.popUp.modalName = action.payload
    state.popUp.state = true
  },

  puModalSetState(state, action: PayloadAction<boolean>) {
    state.popUp.state = action.payload
  },

  // GENERAL
  modalHideAll(state) {
    Object.keys(state).forEach((modalName) => {
      state[modalName].state = false
    })
  },
})

export const {
  loadingModalSetState,
  loadingModalAddToQueue,

  hintsModalSetState,
  hintsModalSetSearch,

  puModalSetByName,
  puModalSetState,
  puModalOpenByName,

  modalHideAll,
} = ModalSlice.actions
export default ModalSlice.reducer
