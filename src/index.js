import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";

import "./index.css";
import reportWebVitals from "./reportWebVitals";

import * as atatus from "atatus-spa";
atatus.config("bc28eadc23684e809d24f925da1fe523").install();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

// Test integration: to verify that the integration is working
atatus.notify(new Error("Test Atatus Setup"));
