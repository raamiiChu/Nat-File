import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    backendUrl:
        "https://ec2-52-192-99-138.ap-northeast-1.compute.amazonaws.com",
};

export const urlSlice = createSlice({
    name: "url",
    initialState,
    reducers: {},
});

export const {} = urlSlice.actions;

export default urlSlice.reducer;
