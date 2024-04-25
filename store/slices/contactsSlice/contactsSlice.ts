import { PayloadAction } from '@reduxjs/toolkit'
import { TContactsData } from '../../../queries/landingFeatures/ourContactsQuery'
import { createGenericSlice } from '../genericSlice'

const initialState = {
  phone_numbers: [],
  emails: [],
  addresses: [],
} as TContactsData

const ContactsSlice = createGenericSlice('contactsSlice', initialState, {
  setContactData(state, action: PayloadAction<TContactsData>) {
    if (!action.payload) return
    for (let key in action.payload) {
      const obj = action.payload[key]
      if (obj && Array.isArray(obj) && obj.length > 0) state[key] = [...obj]
      else state[key] = []
    }
  },
})

export const { setContactData } = ContactsSlice.actions
export default ContactsSlice.reducer
