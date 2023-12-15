import { configureStore } from "@reduxjs/toolkit";

import {
    portfolioSlice,
    triggerSlice,
    urlSlice,
    userSlice,
    shareSlice,
} from "../features";

const store = configureStore({
    reducer: { portfolioSlice, triggerSlice, urlSlice, userSlice, shareSlice },
});

export default store;
