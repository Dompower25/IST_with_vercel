import React from 'react'
import { DocumentNode } from 'graphql/language'
import {
  ApolloClient,
  NormalizedCacheObject,
  OperationVariables,
} from '@apollo/client'
import { GraphQLErrors } from '@apollo/client/errors'
import { GraphQLError } from 'graphql/error'

export interface dataSenderResult {
  data: any
  errors: GraphQLErrors
}

export interface dataForSend {
  query?: DocumentNode
  client: ApolloClient<NormalizedCacheObject>
  variables?: OperationVariables
}

export class dataSender<T> implements dataForSend {
  client: ApolloClient<NormalizedCacheObject>
  query: DocumentNode
  variables: OperationVariables

  constructor(
    client: ApolloClient<NormalizedCacheObject>,
    query: DocumentNode,
    variables: OperationVariables,
  ) {
    this.client = client
    this.variables = variables
    this.query = query
  }

  public mutation = async (): Promise<dataSenderResult> => {
    if (this.query && this.variables) {
      return await this.mutate()
    } else {
      const newErr: GraphQLError = new GraphQLError(
        'CAN NOT SEND REQUEST. CHECK QUERY AND VARIABLES',
      )

      return new Promise<dataSenderResult>(() => {
        throw {
          data: null,
          errors: new Array<GraphQLError>(newErr),
        }
      })
    }
  }

  private mutate = async <T>(): Promise<dataSenderResult> => {
    let result: dataSenderResult = {} as dataSenderResult

    await this.client
      .mutate<T>({
        mutation: this.query,
        variables: this.variables,
      })
      .then((res) => {
        if (res?.data) result.data = res.data
      })
      .catch((err) => {
        result.errors = err?.graphQLErrors
      })

    return result
  }
}
