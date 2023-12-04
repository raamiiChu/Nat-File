import { configureStore } from "@reduxjs/toolkit";

import { portfolioSlice, triggerSlice, urlSlice, userSlice } from "../features";

const store = configureStore({
    reducer: { portfolioSlice, triggerSlice, urlSlice, userSlice },
});

export default store;
