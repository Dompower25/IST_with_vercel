type TCallBackItem = {
  cb_order: Array<{
    client_name: string
    client_phone: string
  }>
}

export interface ICallBackCreateVars {
  data: TCallBackItem
}

export interface ICallBackUpdateVars {
  id: string
  data: TCallBackItem
}

export interface ICallBackCreateQueryResp {
  create_CB_Requests_item: {
    id: string
  }
}

export interface ICallBackUpdateQueryResp {
  update_CB_Requests_item: {
    id: string
  }
}

// FOR HOOK
export interface ICallBackResponse {
  id: string
}

export type TCBRetried = {
  called: boolean
  success: boolean
}

export type TCBSenderResponse = {
  data: ICallBackResponse
  error: string
  removePrevAndSendAgain: () => void
}

export type TCBSenderFnc = (
  name: string,
  phone: string,
) => Promise<TCBSenderResponse>
