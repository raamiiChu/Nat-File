import { createSlice } from "@reduxjs/toolkit";

const initialState = { backendUrl: "http://localhost:3001" };

export const urlSlice = createSlice({
    name: "url",
    initialState,
    reducers: {},
});

export const {} = urlSlice.actions;

export default urlSlice.reducer;
