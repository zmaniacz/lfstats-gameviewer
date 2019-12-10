import React from "react";
import "@elastic/eui/dist/eui_theme_light.css";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import GameView from "./GameView";

const client = new ApolloClient({
  uri: process.env.REACT_APP_API_URI
});

export default function App() {
  return (
    <ApolloProvider client={client}>
      <GameView />
    </ApolloProvider>
  );
}
