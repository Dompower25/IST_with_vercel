import { configureStore } from '@reduxjs/toolkit'

import { helloSaga } from './saga/saga'
import createSagaMiddleware from 'redux-saga'

import regionReducer from './slices/regionSlice/regionSlice'
import catalogReducer from './slices/catalogSlices/catalogSlice'
import modalReducer from './slices/modalSlice/modalSlice'
import contactsReducer from './slices/contactsSlice/contactsSlice'
import pubHeadingReducer from './slices/publicationDescSlice/publicationDescSlice'
import pubArticlesReducer from './slices/publicationArticlesSlice/publicationArticlesSlice'

const sagaMiddleware = createSagaMiddleware()

const store = configureStore({
  devTools: true,
  reducer: {
    modal: modalReducer,
    region: regionReducer,
    catalog: catalogReducer,
    contacts: contactsReducer,
    pubHeading: pubHeadingReducer,
    pubArticles: pubArticlesReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(sagaMiddleware)
  },
})

sagaMiddleware.run(helloSaga)
export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
