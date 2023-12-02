import { configureStore } from "@reduxjs/toolkit";

import { portfolioSlice, triggerSlice, urlSlice } from "../features";

const store = configureStore({
    reducer: { portfolioSlice, triggerSlice, urlSlice },
});

export default store;
