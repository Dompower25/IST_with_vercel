import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

const graphQLAPI = process.env.NEXT_PUBLIC_GRAPHQL;

const httpLink = createHttpLink({
  uri: graphQLAPI,
});

export const cartClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'network-only',
    },
    query: {
      fetchPolicy: 'network-only',
    },
  },
});

