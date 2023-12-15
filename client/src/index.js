import React from "react";
import ReactDOM from "react-dom";

import "./css/reset.css";
import "./css/tailwind.css";

import App from "./App.js";

import { BrowserRouter } from "react-router-dom";

import { Provider } from "react-redux";
import store from "./store";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Create a client
const queryClient = new QueryClient();

ReactDOM.render(
    <Provider store={store}>
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </QueryClientProvider>
    </Provider>,
    document.querySelector("#root")
);
