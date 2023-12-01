import { configureStore } from "@reduxjs/toolkit";

import { portfolioSlice } from "../features";

const store = configureStore({
    reducer: { portfolioSlice },
});

export default store;
