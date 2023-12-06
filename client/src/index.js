import React from "react";
import ReactDOM from "react-dom";
import "./css/reset.css";
import App from "./App.js";

import { BrowserRouter } from "react-router-dom";

import { Provider } from "react-redux";
import store from "./store";

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>,
    document.querySelector("#root")
);
