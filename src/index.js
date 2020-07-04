import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloLink } from 'apollo-link';
import { onError } from 'apollo-link-error';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { ApolloProvider } from '@apollo/react-hooks';
import { InMemoryCache } from 'apollo-cache-inmemory';
import notify from 'react-notify-toast';

import App from './App';
import './index.css';

const errorLink = onError(({ graphQLErrors }) => {
  if (graphQLErrors)
    graphQLErrors.map(({ message }) => notify.show(message, 'error'));
});

const isProduction = process.env.NODE_ENV === 'production';
const uri = isProduction ? 'https://taskbird.herokuapp.com/graphql' : 'http://localhost:4300/graphql';
const httpLink = createHttpLink({ uri: uri });
const link = ApolloLink.from([errorLink, httpLink]);

const client = new ApolloClient({
  link,
  cache: new InMemoryCache()
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);
