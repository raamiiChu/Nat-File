import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userId: localStorage.getItem("userId") || null,
    user: localStorage.getItem("user") || null,
    isAuth: localStorage.getItem("isAuth") || false,
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUserId: (state, action) => {
            state.userId = localStorage.getItem("userId");
        },

        setUser: (state, action) => {
            state.user = localStorage.getItem("user");
        },

        setIsAuth: (state, action) => {
            state.isAuth = action.payload;
        },
    },
});

export const { setUserId, setUser, setIsAuth } = userSlice.actions;

export default userSlice.reducer;
