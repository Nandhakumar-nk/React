import React from "react";
import { createRoot } from "react-dom/client";

import { Provider } from "react-redux";

import configureStore from "./store";
import App from "./App";

// createRoot(container!) if you use TypeScript
const root = createRoot(document.getElementById("root")!);

root.render(
  <Provider store={configureStore()}>
    <App />
  </Provider>
);
