import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    test: 0,
};

export const portfolioSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        setTest: (state, action) => {
            state.test += 1;
        },
    },
});

export const { setTest } = portfolioSlice.actions;

export default portfolioSlice.reducer;
