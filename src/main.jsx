import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

import { ChakraProvider } from "@chakra-ui/react";
import { ColorModeScript } from "@chakra-ui/react";
import { BrowserRouter as Router } from "react-router-dom";

import { theme } from "./theme";

ReactDOM.createRoot(document.getElementById('root')).render(
  <ChakraProvider>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <Router>
      <App />
    </Router>
  </ChakraProvider>,
)
