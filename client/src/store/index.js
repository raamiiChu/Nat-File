import { configureStore } from "@reduxjs/toolkit";

import { portfolioSlice, triggerSlice } from "../features";

const store = configureStore({
    reducer: { portfolioSlice, triggerSlice },
});

export default store;
