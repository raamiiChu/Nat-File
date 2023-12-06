import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import {
    setPortfolioId,
    setLayout,
    setLayouts,
    setImages,
} from "../../features/portfolioSlice";

import { setIsUploadingImage } from "../../features/triggerSlice";

import axios from "axios";

import BoardItem from "./boardItem";

import { Responsive, WidthProvider } from "react-grid-layout";
import "../../css/react-grid-layout.css";

import { FaPlus, FaSave } from "react-icons/fa";

import Swal from "sweetalert2";

const ResponsiveGridLayout = WidthProvider(Responsive);

const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 1000,
    didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
    },
});

const Board = () => {
    // reducer
    const dispatch = useDispatch();

    // redux
    const { backendUrl } = useSelector((state) => state.urlSlice);
    const { user, isAuth } = useSelector((state) => state.userSlice);
    const { portfolioId, layouts, images } = useSelector(
        (state) => state.portfolioSlice
    );
    const [isFirstTime, setIsFirstTime] = useState(true);

    // trigger on layout change
    const saveCurrLayout = (layouts) => {
        dispatch(setLayouts(layouts));
        localStorage.setItem("layouts", JSON.stringify(layouts));
    };

    // trigger by save btn
    const saveToDatabase = async (e) => {
        try {
            const res = await axios.post(`${backendUrl}/portfolio/save`, {
                id: portfolioId,
                email: user,
                layouts,
                images,
            });

            if (!e) {
                return;
            }

            if (res.status === 200) {
                Toast.fire({
                    icon: "success",
                    title: "Your work has been saved",
                });
            }
        } catch (error) {
            console.log(error);
        }
    };

    // set layouts & images from db to local storage ( if exist )
    const loadFromDatabase = async () => {
        try {
            const { data: portfolio } = await axios.post(
                `${backendUrl}/portfolio/load`,
                {
                    id: portfolioId,
                    email: user,
                }
            );

            const { id, images, layouts } = portfolio;

            localStorage.setItem("portfolioId", JSON.stringify(id));
            localStorage.setItem("images", JSON.stringify(images));
            localStorage.setItem("layouts", JSON.stringify(layouts));

            dispatch(setPortfolioId(id));
            dispatch(setImages(images));
            dispatch(setLayouts(layouts));
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (!isAuth) {
            return;
        }

        loadFromDatabase();
        setIsFirstTime(false);
    }, []);

    useEffect(() => {
        if (!isAuth) {
            return;
        }

        if (isFirstTime) {
            return;
        }

        localStorage.setItem("images", JSON.stringify(images));
        saveToDatabase();
    }, [images]);

    return (
        <section className="relative grid grid-cols-12 bg-white bg-opacity-20 h-[700px]">
            <div className="lg:col-start-2 col-span-full lg:col-span-10 grid grid-cols-12 mx-5 lg:mx-0 my-auto p-2 border-4 border-solid border-black border-opacity-[33%] rounded-2xl bg-white bg-opacity-[85%] h-[550px] overflow-y-scroll">
                <ResponsiveGridLayout
                    className="layout col-span-full"
                    layouts={layouts}
                    breakpoints={{
                        lg: 0,
                    }}
                    cols={{ lg: 6 }}
                    resizeHandles={[]}
                    margin={[20, 50]}
                    containerPadding={[20, 20]}
                    rowHeight={140}
                    draggableCancel=".not-draggable"
                    onLayoutChange={(layout, layouts) => {
                        dispatch(setLayout(layout));
                        saveCurrLayout(layouts);
                    }}
                >
                    {images?.map((image) => {
                        const { id } = image;

                        return (
                            <div
                                key={id}
                                className="group relative p-3 border-2 border-solid border-black border-opacity-50 rounded-3xl shadow-lg bg-white cursor-grab active:cursor-grabbing"
                            >
                                <BoardItem image={image} />
                            </div>
                        );
                    })}
                </ResponsiveGridLayout>
            </div>

            {/* btns */}
            <div className="absolute z-10 bottom-[13%] sm:bottom-[15%] right-[10%] sm:right-[5%] lg:right-[12%] flex gap-x-2 sm:gap-x-4">
                <button
                    title="Upload Image"
                    className="w-12 h-12 text-white bg-black rounded-full scale-75 sm:scale-90 lg:scale-100 hover:opacity-75"
                    onClick={() => {
                        dispatch(setIsUploadingImage(true));
                    }}
                >
                    <FaPlus className="mx-auto scale-150" />
                </button>
                <button
                    title="Save"
                    className="w-12 h-12 text-white bg-black rounded-full scale-75 sm:scale-90 lg:scale-100 hover:opacity-75"
                    onClick={(e) => {
                        saveToDatabase(e);
                    }}
                >
                    <FaSave className="mx-auto scale-150" />
                </button>
            </div>
        </section>
    );
};

export default Board;
