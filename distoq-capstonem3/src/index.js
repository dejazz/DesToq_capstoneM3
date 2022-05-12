import "@fontsource/itim";
import "@fontsource/nunito";
import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { thema } from "./styles/GlobalStyles";
import "@fontsource/itim"
import "@fontsource/nunito"
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ChakraProvider theme={thema}>
        <App />
      </ChakraProvider>
    </BrowserRouter>
  </React.StrictMode>
);
