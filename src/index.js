import React from "react";
import { render } from "react-dom";
import { ApolloClient } from "apollo-client";
import { ApolloProvider } from "@apollo/react-hooks";
import { InMemoryCache } from "apollo-cache-inmemory";

import { link } from "./graphql/link";
import App from "./App";
import { resolvers, typeDefs } from './resolvers';

import "./index.css";

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link,
  resolvers,
  typeDefs
});

render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);
