import { GraphQLError } from 'graphql/error'

//  ---- ---- ---- TYPES ---- ---- ----
export type ISessionIDGetterForCreation<CREATION_DATA_TYPE> = (
  data: CREATION_DATA_TYPE,
) => string | number

export type IUpdatedDataResolver<UPDATE_DATA_TYPE> = (
  data: UPDATE_DATA_TYPE,
) => void | UPDATE_DATA_TYPE | any

export type ICreateDataResolver<CREATION_DATA_TYPE> = (
  data: CREATION_DATA_TYPE,
) => void | CREATION_DATA_TYPE | any

export type ICreationFnc<MUTATION_VARS_TYPE, CREATION_DATA_TYPE> = (
  vars: MUTATION_VARS_TYPE,
) => Promise<CREATION_DATA_TYPE>

export type IUpdateFnc<MUTATION_VARS_TYPE, UPDATE_SESSION_BY_ID> = (
  vars: MUTATION_VARS_TYPE,
) => Promise<UPDATE_SESSION_BY_ID>

export type IAddingDataResult<RESULT_TYPE> = {
  id: string | number
  result: RESULT_TYPE
}

export type IAsyncFncType<RESULT_TYPE> = (
  ...props: any
) => Promise<IAddingDataResult<RESULT_TYPE>>

export type IHandlingFailFnc<EX_T, CALLED_FNC_T, MUTATION_VARS_TYPE> = (
  ex: EX_T,
  calledFnc: CALLED_FNC_T,
  sentVars: MUTATION_VARS_TYPE,
  operation?: string,
) => any | Promise<any>

export type ICachedData<
  MUTATION_VARS_TYPE,
  CREATION_DATA_TYPE,
  UPDATE_DATA_TYPE,
  CACHED_FNC_TYPE extends IAsyncFncType<
    CREATION_DATA_TYPE | UPDATE_DATA_TYPE
  > = IAsyncFncType<CREATION_DATA_TYPE | UPDATE_DATA_TYPE>,
> = {
  variables: MUTATION_VARS_TYPE
  function: CACHED_FNC_TYPE
}

//  ---- ---- ---- CONSTANTS ---- ---- ----
export const sessionObjectKey = 'SESSION_ID'
// ---- ---- ---- INTERFACES ---- ---- ----

export interface IFailItem<
  CREATION_DATA_TYPE,
  UPDATE_DATA_TYPE,
  EX_TYPE extends ReadonlyArray<GraphQLError> = ReadonlyArray<GraphQLError>,
> {
  operation: string
  ex: EX_TYPE
  calledFnc: IAsyncFncType<CREATION_DATA_TYPE | UPDATE_DATA_TYPE>
}

export interface IHandlingFailItem<
  CREATION_DATA_TYPE,
  UPDATE_DATA_TYPE,
  MUTATION_VARS_TYPE,
  EX_TYPE extends ReadonlyArray<GraphQLError> = ReadonlyArray<GraphQLError>,
> {
  ex: EX_TYPE
  onHandle: IHandlingFailFnc<
    EX_TYPE,
    IAsyncFncType<CREATION_DATA_TYPE | UPDATE_DATA_TYPE>,
    MUTATION_VARS_TYPE
  >
  operation?: string
}

export interface ISessionResolversConfig<CREATION_DATA_TYPE, UPDATE_DATA_TYPE> {
  sessionIDGetterForCreation: ISessionIDGetterForCreation<CREATION_DATA_TYPE>
  updateResolver?: IUpdatedDataResolver<UPDATE_DATA_TYPE>
  creationResolver?: ICreateDataResolver<CREATION_DATA_TYPE>
}

export interface ISessionActionsConfig<
  MUTATION_VARS_TYPE,
  CREATION_DATA_TYPE,
  UPDATE_SESSION_BY_ID,
> {
  creation: ICreationFnc<MUTATION_VARS_TYPE, CREATION_DATA_TYPE>
  update: IUpdateFnc<MUTATION_VARS_TYPE, UPDATE_SESSION_BY_ID>
}
