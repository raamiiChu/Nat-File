import { createSlice } from "@reduxjs/toolkit";

const initLayouts = () => {
    // try to get layouts from local storage
    const savedLayouts = JSON.parse(localStorage.getItem("layouts"));

    return (
        savedLayouts || {
            lg: [],
            md: [],
            sm: [],
        }
    );
};

const initImages = () => {
    // try to get images from local storage
    const savedImages = JSON.parse(localStorage.getItem("images"));
    return savedImages || [];
};

const initialState = {
    portfolioId: localStorage.getItem("portfolioId") || null,
    layout: [],
    layouts: initLayouts(),
    images: initImages(),
};

export const portfolioSlice = createSlice({
    name: "portfolio",
    initialState,
    reducers: {
        setPortfolioId: (state, action) => {
            state.portfolioId = action.payload;
        },

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

export const { setPortfolioId, setLayout, setLayouts, setImages } =
    portfolioSlice.actions;

export default portfolioSlice.reducer;
