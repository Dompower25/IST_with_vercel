import { ApolloClient, NormalizedCacheObject } from '@apollo/client'
import { useCallback, useEffect, useState } from 'react'
import {
  TCBSenderResponse,
  ICallBackResponse,
  TCBRetried,
  TCBSenderFnc,
  ICallBackCreateVars,
  ICallBackUpdateVars,
  ICallBackCreateQueryResp,
  ICallBackUpdateQueryResp,
} from './ICallBack'
import {
  CALL_BACK_SEND_ORDER,
  CALL_BACK_UPDATE_ORDER,
} from './query/ICBQueries'
import {
  callBackCreation_varsBuilder_callBackHelper,
  callBackUpdating_varsBuilder_callBackHelper,
} from './helpers'

const useCallRequest = (client: ApolloClient<NormalizedCacheObject>) => {
  const LOCAL_STORAGE_FIELD_NAME = 'call_req_id'
  const [lsCallFieldValue, setCallFieldValue] = useState<string | undefined>()
  const [result, setResult] = useState<ICallBackResponse>()

  useEffect(() => {
    if (typeof window !== 'undefined')
      setCallFieldValue(localStorage.getItem(LOCAL_STORAGE_FIELD_NAME))
  }, [])

  const createCallback = async (
    _client: ApolloClient<NormalizedCacheObject>,
    vars: { name: string; phone: string },
  ) => {
    return _client.mutate<ICallBackCreateQueryResp, ICallBackCreateVars>({
      mutation: CALL_BACK_SEND_ORDER,
      variables: callBackCreation_varsBuilder_callBackHelper(
        vars.name,
        vars.phone,
      ),
    })
  }

  const updateCallback = async (
    _client: ApolloClient<NormalizedCacheObject>,
    vars: { name: string; phone: string; id: string },
  ) => {
    return _client.mutate<ICallBackUpdateQueryResp, ICallBackUpdateVars>({
      mutation: CALL_BACK_UPDATE_ORDER,
      variables: callBackUpdating_varsBuilder_callBackHelper(
        vars.name,
        vars.phone,
        vars.id,
      ),
    })
  }

  const removePrevAndSendAgain = useCallback(
    async (name, phone) => {
      if (typeof window !== 'undefined') {
        setCallFieldValue(undefined)
        localStorage.clear()

        await createCallback(client, { name, phone }).then((res) => {
          if (!res || !res.data) return
          const result = res.data.create_CB_Requests_item
          result ? writeToStorage(result.id) : null
          setResult(result as ICallBackResponse)
        })
      }
    },

    [client],
  )

  const writeToStorage = (value: string) => {
    if (typeof window !== 'undefined')
      localStorage.setItem(LOCAL_STORAGE_FIELD_NAME, value)
  }

  const send: TCBSenderFnc = useCallback(
    async (name, phone) => {
      return new Promise<TCBSenderResponse>(async (resolve) => {
        let callBackId: ICallBackResponse
        let error: string

        switch (typeof lsCallFieldValue) {
          case 'string':
            await updateCallback(client, {
              name,
              phone,
              id: lsCallFieldValue,
            })
              .then((res) => {
                callBackId = res.data?.update_CB_Requests_item
                callBackId ? writeToStorage(callBackId.id) : null
                setResult(callBackId as ICallBackResponse)
              })
              .catch((_error) => (error = _error))
            break
          case 'undefined':
            await createCallback(client, {
              name,
              phone,
            })
              .then((res) => {
                callBackId = res.data?.create_CB_Requests_item
                callBackId ? writeToStorage(callBackId.id) : null
                setResult(callBackId as ICallBackResponse)
              })
              .catch((_error) => (error = _error))
            break
        }

        resolve({
          removePrevAndSendAgain: () => {
            removePrevAndSendAgain(name, phone)
          },
          data: callBackId,
          error,
        })
      })
    },
    [client, removePrevAndSendAgain, lsCallFieldValue],
  )

  return {
    result,
    send,
  }
}

export default useCallRequest
