import App from "./App";
import { BrowserRouter } from "react-router-dom";
import React, { Suspense } from "react";
import { hydrate } from "react-dom";
import "semantic-ui-css/semantic.min.css";
import "./i18nextConfig";

hydrate(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);

if (module.hot) {
  module.hot.accept();
}
