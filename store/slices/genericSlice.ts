import {
  createSlice,
  SliceCaseReducers,
  ValidateSliceCaseReducers,
} from '@reduxjs/toolkit'

export const createGenericSlice = <T, Reducers extends SliceCaseReducers<T>>(
  name: string,
  initialState: T,
  reducers: ValidateSliceCaseReducers<T, Reducers>,
) => {
  return createSlice({
    name,
    initialState,
    reducers,
  })
}
