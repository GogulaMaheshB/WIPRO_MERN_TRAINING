
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import { ThemeProvider } from "./context/ThemeContext"; 

import { Provider } from "react-redux";
import { store } from "./store/store";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </Provider>
);
