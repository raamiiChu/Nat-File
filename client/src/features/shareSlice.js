import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isOpeningImage: false,
    imageUrl: "",
    info: {},
};

export const shareSlice = createSlice({
    name: "share",
    initialState,
    reducers: {
        setIsOpeningImage: (state, action) => {
            state.isOpeningImage = action.payload;
        },

        setImageUrl: (state, action) => {
            state.imageUrl = action.payload;
        },

        setInfo: (state, action) => {
            state.info = action.payload;
        },
    },
});

export const { setIsOpeningImage, setImageUrl, setInfo } = shareSlice.actions;

export default shareSlice.reducer;
