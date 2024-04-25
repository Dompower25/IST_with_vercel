import { ApolloError } from '@apollo/client'
import { IRegionsListType } from '../../store/slices/common/regionsListType'
import { IRegionSlice } from '../../store/slices/regionSlice/IRegionSlice'

export interface ICartActionsPayload {
  regionHandler?: IRegionSlice<IRegionsListType>
  cartAutoFetching?: boolean
}

export type ICartFetchingMeta = {
  error: ApolloError
  loading: boolean
}
