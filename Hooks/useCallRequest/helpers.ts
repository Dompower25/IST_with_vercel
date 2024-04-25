import { ICallBackCreateVars, ICallBackUpdateVars } from './ICallBack'

export const callBackCreation_varsBuilder_callBackHelper = (
  name: string,
  phone: string,
): ICallBackCreateVars => {
  return {
    data: {
      cb_order: [
        {
          client_name: `${name}`,
          client_phone: `${phone}`,
        },
      ],
    },
  }
}

export const callBackUpdating_varsBuilder_callBackHelper = (
  name: string,
  phone: string,
  id: string,
): ICallBackUpdateVars => {
  return {
    id: `${id}`,
    data: {
      cb_order: [
        {
          client_name: `${name}`,
          client_phone: `${phone}`,
        },
      ],
    },
  }
}
