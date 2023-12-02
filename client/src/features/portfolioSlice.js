import { createSlice } from "@reduxjs/toolkit";

const initLayouts = () => {
    // try to get layouts from local storage
    const savedLayouts = JSON.parse(localStorage.getItem("layouts"));
    console.log(savedLayouts);

    return (
        savedLayouts || {
            lg: [
                { i: "1", x: 0, y: 0, w: 1, h: 2 },
                { i: "2", x: 1, y: 0, w: 2, h: 2 },
                { i: "3", x: 4, y: 0, w: 1, h: 2 },
            ],
            md: [
                { i: "1", x: 0, y: 0, w: 1, h: 2 },
                { i: "2", x: 1, y: 0, w: 2, h: 2 },
                { i: "3", x: 4, y: 0, w: 1, h: 2 },
            ],
            sm: [
                { i: "1", x: 0, y: 0, w: 1, h: 2 },
                { i: "2", x: 1, y: 0, w: 2, h: 2 },
                { i: "3", x: 4, y: 0, w: 1, h: 2 },
            ],
        }
    );
};

const initImages = () => {
    // try to get images from local storage
    const savedImages = JSON.parse(localStorage.getItem("images"));
    return savedImages || [];
};

const initialState = {
    layout: [],
    layouts: initLayouts(),
    images: initImages(),
};

export const portfolioSlice = createSlice({
    name: "portfolio",
    initialState,
    reducers: {
        setLayout: (state, action) => {
            state.layout = action.payload;
        },

        setLayouts: (state, action) => {
            state.layouts = action.payload;
        },

        setImages: (state, action) => {
            state.images = action.payload;
        },
    },
});

export const { setLayout, setLayouts, setImages } = portfolioSlice.actions;

export default portfolioSlice.reducer;
