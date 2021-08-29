import "typeface-open-sans";

import React from "react";

import { ChakraProvider } from "@chakra-ui/react";

import { ApolloProvider } from "@apollo/client";
import { AppProps } from "next/app";

import customTheme from "@/styles/theme";
import { graph_client } from "@/lib/fetch";

import "@/styles/style.css";

// Check if it's running on server or client
const isServerSideRendered = () => {
  return typeof window === "undefined";
};

if (process.env.NODE_ENV !== "production" && !isServerSideRendered()) {
  // @ts-ignore: Uneccessary types
  import("react-dom").then((ReactDOM) => {
    // Find accessibility issues
    import("@axe-core/react").then((axe) => {
      axe.default(React, ReactDOM, 1000, {});
    });
  });
}

const App = ({ Component, pageProps }: AppProps) => (
  <ChakraProvider resetCSS theme={customTheme}>
    <ApolloProvider client={graph_client}>
      <Component {...pageProps} />
    </ApolloProvider>
  </ChakraProvider>
);

export default App;
