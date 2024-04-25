import {
  ICreateDataResolver,
  ICreationFnc,
  ISessionActionsConfig,
  ISessionIDGetterForCreation,
  ISessionResolversConfig,
  IUpdateFnc,
  IUpdatedDataResolver,
} from './common'

export class ISTSessionAdder<
  CREATION_DATA_TYPE,
  UPDATE_DATA_TYPE,
  MUTATION_VARS_TYPE,
> {
  private _newsessionIDGetterForCreation: ISessionIDGetterForCreation<CREATION_DATA_TYPE> =
    undefined
  private _updatedDataResolver: IUpdatedDataResolver<UPDATE_DATA_TYPE> =
    undefined
  private _createDataResolver: ICreateDataResolver<CREATION_DATA_TYPE> =
    undefined

  private _sessionCreationFnc: ICreationFnc<
    MUTATION_VARS_TYPE,
    CREATION_DATA_TYPE
  > = undefined
  private _sessionUpdateFnc: IUpdateFnc<MUTATION_VARS_TYPE, UPDATE_DATA_TYPE> =
    undefined

  /**
   * session getting session id resolver
   */
  set setSessionIDGetterForCreation(
    getter: ISessionIDGetterForCreation<CREATION_DATA_TYPE>,
  ) {
    this._newsessionIDGetterForCreation = getter
  }

  get getSessionIDGetterForCreation(): ISessionIDGetterForCreation<CREATION_DATA_TYPE> {
    return this._newsessionIDGetterForCreation
  }

  /**
   * session creation resolver
   */
  set setCreateDataResolver(resolver: ICreateDataResolver<CREATION_DATA_TYPE>) {
    this._createDataResolver = resolver
  }

  get getCreateDataResolver(): ICreateDataResolver<CREATION_DATA_TYPE> {
    return this._createDataResolver
  }

  /**
   * session update resolver
   */
  set setUpdatedDataResolver(resolver: IUpdatedDataResolver<UPDATE_DATA_TYPE>) {
    this._updatedDataResolver = resolver
  }

  get getUpdatedDataResolver(): IUpdatedDataResolver<UPDATE_DATA_TYPE> {
    return this._updatedDataResolver
  }

  public async update(vars: MUTATION_VARS_TYPE): Promise<UPDATE_DATA_TYPE> {
    return await this._sessionUpdateFnc(vars)
  }

  public async create(vars: MUTATION_VARS_TYPE): Promise<CREATION_DATA_TYPE> {
    return await this._sessionCreationFnc(vars)
  }

  constructor(
    sessionActionsConfig: ISessionActionsConfig<
      MUTATION_VARS_TYPE,
      CREATION_DATA_TYPE,
      UPDATE_DATA_TYPE
    >,
    sessionResolversConfig?: ISessionResolversConfig<
      CREATION_DATA_TYPE,
      UPDATE_DATA_TYPE
    >,
  ) {
    this._sessionCreationFnc = sessionActionsConfig.creation
    this._sessionUpdateFnc = sessionActionsConfig.update

    if (sessionResolversConfig) {
      this.setUpdatedDataResolver = sessionResolversConfig.updateResolver
      this.setCreateDataResolver = sessionResolversConfig.creationResolver
      this.setSessionIDGetterForCreation =
        sessionResolversConfig.sessionIDGetterForCreation
    }
  }
}
