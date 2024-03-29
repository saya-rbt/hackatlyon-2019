import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { DocumentNode } from 'graphql';

// Instantiate required constructor fields
const cache = new InMemoryCache();
const link = new HttpLink({
  uri: 'https://arc-hackatlyon-2019.herokuapp.com/v1/graphql',
});

const client = new ApolloClient({
  cache: cache,
  link: link,
  name: 'arc-web-client',
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'ignore',
    },
    query: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'all',
    },
  }
});

export async function query<T>(query: DocumentNode): Promise<T> {
  const response = await client.query({ query });

  if (response.errors) {
    // TODO Handle errors
    throw response.errors;
  }

  return response.data;
}

export async function mutate<T>(mutation: DocumentNode): Promise<T> {
  const response = await client.mutate({ mutation });

  if (response.errors) {
    // TODO Handle errors
    throw response.errors;
  }

  return response.data;
}
