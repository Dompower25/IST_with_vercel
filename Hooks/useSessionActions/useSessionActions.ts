import {
  IAddingDataResult,
  ICachedData,
  IFailItem,
  IHandlingFailItem,
  ISessionActionsConfig,
  ISessionResolversConfig,
  sessionObjectKey,
} from './common'
import { useCallback, useState } from 'react'
import { ISTSessionAdder } from './sessionAdder'
import { useLocalStorageManager } from './useLocalStorageManager'
import { GraphQLError } from 'graphql/error'

export const useSessionActions = <
  MUTATION_VARS_TYPE,
  CREATION_DATA_TYPE,
  UPDATE_DATA_TYPE = any,
  EXCEPTIONS_TYPE extends
    ReadonlyArray<GraphQLError> = ReadonlyArray<GraphQLError>,
>(
  sessionIdFieldName: keyof MUTATION_VARS_TYPE | string,
  sessionActionsConfig: ISessionActionsConfig<
    MUTATION_VARS_TYPE,
    CREATION_DATA_TYPE,
    UPDATE_DATA_TYPE
  >,
  sessionResolversConfig?: ISessionResolversConfig<
    CREATION_DATA_TYPE,
    UPDATE_DATA_TYPE
  >,
) => {
  const { getStorageItem, setStorageItem, removeStorageItem } =
    useLocalStorageManager(sessionObjectKey)

  // >> ---- ---- ---- EX Handling ---- ---- ----
  const [fails, setFails] = useState<
    IFailItem<CREATION_DATA_TYPE, UPDATE_DATA_TYPE, EXCEPTIONS_TYPE>[]
  >([])

  const [cachedData, setCachedData] =
    useState<
      ICachedData<MUTATION_VARS_TYPE, CREATION_DATA_TYPE, UPDATE_DATA_TYPE>
    >()

  const addToSessionExceptions = useCallback(
    (
      data: IFailItem<CREATION_DATA_TYPE, UPDATE_DATA_TYPE, EXCEPTIONS_TYPE>,
    ) => {
      const newExList = [...fails]
      newExList.push({
        ...data,
      })
      setFails(newExList)
    },
    [fails],
  )

  const handleSessionException = useCallback(
    (
      data: IHandlingFailItem<
        CREATION_DATA_TYPE,
        UPDATE_DATA_TYPE,
        MUTATION_VARS_TYPE,
        EXCEPTIONS_TYPE
      >,
    ) => {
      if (!data) return
      data.onHandle(
        data.ex,
        cachedData?.function,
        cachedData?.variables,
        data.operation,
      )
    },
    [cachedData],
  )

  const [sessionAdder] = useState(
    new ISTSessionAdder<
      CREATION_DATA_TYPE,
      UPDATE_DATA_TYPE,
      MUTATION_VARS_TYPE
    >(sessionActionsConfig, sessionResolversConfig),
  )

  const configureSessionResolvers = useCallback(
    (config: ISessionResolversConfig<CREATION_DATA_TYPE, UPDATE_DATA_TYPE>) => {
      if (!sessionAdder) return

      sessionAdder.setSessionIDGetterForCreation =
        config.sessionIDGetterForCreation
      sessionAdder.setUpdatedDataResolver = config.updateResolver
      sessionAdder.setCreateDataResolver = config.creationResolver
    },
    [sessionAdder],
  )

  const variablesBuilder = useCallback(
    (
      IdFieldName: typeof sessionIdFieldName,
      data: MUTATION_VARS_TYPE,
    ): MUTATION_VARS_TYPE => {
      const newSession = getStorageItem()

      return newSession
        ? {
            ...data,
            [IdFieldName]: newSession,
          }
        : data
    },
    [getStorageItem],
  )

  const updateData = useCallback(
    async (
      sessionData: MUTATION_VARS_TYPE,
    ): Promise<IAddingDataResult<UPDATE_DATA_TYPE | CREATION_DATA_TYPE>> => {
      let result = {
        id: null,
        result: null,
      } as IAddingDataResult<UPDATE_DATA_TYPE | CREATION_DATA_TYPE>

      const newVars = variablesBuilder(sessionIdFieldName, sessionData)

      setCachedData({
        variables: newVars,
        function: updateData,
      })

      if (newVars[sessionIdFieldName.toString()])
        await sessionAdder.update(newVars).then((data) => {
          if (!data) return

          result = {
            id: newVars[sessionIdFieldName.toString()],
            result: data,
          }

          sessionAdder.getUpdatedDataResolver
            ? sessionAdder.getUpdatedDataResolver(data)
            : console.warn(
                'Cannot find resolver configuration to modify session. Check the useSessionActions configuration',
              )
        })
      else {
        await sessionAdder.create(newVars).then((data) => {
          if (!data || !sessionAdder.getSessionIDGetterForCreation) {
            console.warn(
              'Could not find a function to get the new session ID required to register a new session. Check the useSessionActions configuration ',
            )
            return
          }

          if (!sessionAdder.getSessionIDGetterForCreation(data)) {
            console.warn(
              'Failed to get an ID for a new session system entry. Check the useSessionActions configuration',
            )
            return
          }

          result = {
            id: sessionAdder.getSessionIDGetterForCreation(data),
            result: data,
          }

          setStorageItem(
            sessionAdder.getSessionIDGetterForCreation(data).toString(),
          )

          sessionAdder.getCreateDataResolver
            ? sessionAdder.getCreateDataResolver(data)
            : 'Cannot find resolver configuration to session creation. Check the useSessionActions configuration'
        })
      }

      return new Promise((resolve) => {
        resolve(result)
      })
    },
    [sessionAdder, sessionIdFieldName, setStorageItem, variablesBuilder],
  )

  return {
    fails,
    updateData,
    getSessionFromLS: getStorageItem,
    removeSession: removeStorageItem,
    handleSessionException,
    addToSessionExceptions,
    configureSessionResolvers,
  }
}
