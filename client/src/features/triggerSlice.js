import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isUploadingImage: false,
    isConnectingS3: false,
    isSign: false,
};

export const triggerSlice = createSlice({
    name: "trigger",
    initialState,
    reducers: {
        setIsUploadingImage: (state, action) => {
            state.isUploadingImage = action.payload;
        },

        setIsConnectingS3: (state, action) => {
            state.isConnectingS3 = action.payload;
        },

        setIsSign: (state, action) => {
            state.isSign = action.payload;
        },
    },
});

export const { setIsUploadingImage, setIsConnectingS3, setIsSign } =
    triggerSlice.actions;

export default triggerSlice.reducer;
