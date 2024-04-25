import { PayloadAction } from '@reduxjs/toolkit'
import { createGenericSlice } from '../genericSlice'
import { THeadingItem } from '@root/components/publications/common'

type THeadingSlice = {
  title: string
  headingItems: THeadingItem[]
}

const initialState = {
  title: '',
  headingItems: [],
} as THeadingSlice

const regionSlice = createGenericSlice('publicationDescSlice', initialState, {
  setHeading(state, action: PayloadAction<THeadingSlice>) {
    state.title = action.payload.title
    state.headingItems = [...action.payload.headingItems]
  },
})

export const { setHeading } = regionSlice.actions

export default regionSlice.reducer
