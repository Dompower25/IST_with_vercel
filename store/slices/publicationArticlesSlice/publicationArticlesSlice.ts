import { PayloadAction } from '@reduxjs/toolkit'
import { createGenericSlice } from '../genericSlice'
import {
  THeadingItem,
  TPublication,
} from '@root/components/publications/common'

type TArticlesSection = {
  title: string
  destination: string 
  items: TPublication[]
}

const initialState = {
  sections: [] as TArticlesSection[],
}

const publicationArticlesSlice = createGenericSlice(
  'publicationArticlesSlice',
  initialState,
  {
    setSectionList(state, action: PayloadAction<TArticlesSection[]>) {
      state.sections = [...action.payload]
    },

    addSection(state, action: PayloadAction<TArticlesSection>) {
      state.sections.push(action.payload)
    },
  },
)

export const { setSectionList, addSection } = publicationArticlesSlice.actions

export default publicationArticlesSlice.reducer
