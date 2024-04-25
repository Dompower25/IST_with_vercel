export type TContactsData = {
  phones?: Array<string>
  mails?: Array<string>
  addresses?: Array<{
    addressName: string
    addressCoordinates?: string
  }>
}


