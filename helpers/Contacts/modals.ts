import {
  IOurContacts,
  TContactsData,
} from '../../queries/landingFeatures/ourContactsQuery'

export const helper_contacts_modals_getContactsData = (
  fetchData: IOurContacts,
): TContactsData => {
  const fetchDataArray = fetchData?.ourContacts?.contacts_data
  if (!fetchDataArray || !(fetchDataArray.length > 0))
    throw new Error('Getting contacts data error :(')
  return fetchDataArray[0]
}

export const helper_contacts_modals_addressesTransform = (
  data: TContactsData,
): string[] => {
  if (!data?.addresses) return ['']
  const outData = [] as string[]

  data.addresses.map((el) => {
    outData.push(el?.address_name)
  })

  return outData
}

export const helper_contacts_modals_emailTransform = (
  data: TContactsData,
): string[] => {
  if (!data?.emails) return ['']
  const outData = [] as string[]

  data.emails.map((el) => {
    outData.push(el?.email_item)
  })

  return outData
}

export const helper_contacts_modals_phoneTransform = (
  data: TContactsData,
): string[] => {
  if (!data?.phone_numbers) return ['']
  const outData = [] as string[]

  data.phone_numbers.map((el) => {
    outData.push(el?.phone_item)
  })

  return outData
}
