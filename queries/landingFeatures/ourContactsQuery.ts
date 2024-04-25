import { gql } from '@apollo/client'
import { ILangCodeQuery } from '../common'

type phoneNumbers = {
  phone_item: string
}

type emailAddresses = {
  email_item: string
}

type addressesType = {
  address_name: string
  address_map: string
}

export type TContactsData = {
  phone_numbers: Array<phoneNumbers>
  emails: Array<emailAddresses>
  addresses: Array<addressesType>
}

interface IContactsData {
  contacts_data: Array<TContactsData>
}

export interface IOurContacts {
  ourContacts: IContactsData
}

export interface IOurContactsVars extends ILangCodeQuery {}

const getOurContactsData = (inData: IOurContacts): TContactsData => {
  if (
    inData.ourContacts.contacts_data &&
    inData.ourContacts.contacts_data.length >= 0
  ) {
    return inData.ourContacts.contacts_data[0]
  }
  return null
}

export const GET_OUR_CONTACTS_QUERY = gql`
  query getOurContacts($code: String) {
    ourContacts {
      contacts_data(filter: { languages_code: { code: { _eq: $code } } }) {
        phone_numbers
        emails
        addresses
      }
    }
  }
`

export default getOurContactsData
