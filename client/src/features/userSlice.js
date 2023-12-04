import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: localStorage.getItem("user") || null,
    isAuth: false,
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = localStorage.getItem("user");
        },

        setIsAuth: (state, action) => {
            state.isAuth = action.payload;
        },
    },
});

export const { setUser, setIsAuth } = userSlice.actions;

export default userSlice.reducer;
