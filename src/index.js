import React from "react";
import ReactDOM from "react-dom";
import "assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-react.scss";

import "react-toastify/dist/ReactToastify.css";
import App from "App";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import store from "store";

ReactDOM.render(
  <Provider store={store}>
    <ToastContainer />
    <App />
  </Provider>,
  document.getElementById("root")
);
