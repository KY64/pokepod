// @ts-nocheck
import { ApolloClient, InMemoryCache } from "@apollo/client";

import { API_ENDPOINT } from "@/config";

export const graph_client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: API_ENDPOINT
});
