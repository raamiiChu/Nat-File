import React from "react";
import ReactDOM from "react-dom";
import "./css/reset.css";
import App from "./App.js";
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </React.StrictMode>,
    document.querySelector("#root")
);
