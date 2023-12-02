import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import {
    setLayout,
    setLayouts,
    setImages,
} from "../../features/portfolioSlice";

import {
    setIsUploadingImage,
    setIsConnectingS3,
} from "../../features/triggerSlice";

import { v4 as uuidv4 } from "uuid";
import axios from "axios";

import { Responsive, WidthProvider } from "react-grid-layout";
import "../../css/react-grid-layout.css";

import { LuRectangleVertical, LuRectangleHorizontal } from "react-icons/lu";
import { IoSquareOutline } from "react-icons/io5";
import { GoSquare } from "react-icons/go";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaPlus, FaSave } from "react-icons/fa";

import Swal from "sweetalert2";

import fox from "../../images/fox.jpg";

const ResponsiveGridLayout = WidthProvider(Responsive);

const scaleBtns = [
    { icon: <GoSquare />, w: 1, h: 1 },
    { icon: <LuRectangleHorizontal />, w: 2, h: 1 },
    { icon: <LuRectangleVertical />, w: 1, h: 2 },
    { icon: <IoSquareOutline />, w: 2, h: 2 },
];

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
    const backendUrl = "http://localhost:3001";

    // reducer
    const dispatch = useDispatch();

    // redux
    const { layout, layouts, images } = useSelector(
        (state) => state.portfolioSlice
    );

    const { isUploadingImage, isConnectingS3 } = useSelector(
        (state) => state.triggerSlice
    );

    // trigger on layout change
    const saveCurrLayout = (layouts) => {
        dispatch(setLayouts(layouts));
        localStorage.setItem("layouts", JSON.stringify(layouts));
    };

    // trigger by delete btn
    const deleteImage = async (e, id, s3Key) => {
        e.stopPropagation();
        e.preventDefault();

        await axios.delete(`${backendUrl}/images/${s3Key}`);

        dispatch(
            setImages(
                images.filter((image) => {
                    return image.id !== id;
                })
            )
        );
    };

    // trigger by scale btns
    const scale = (e, key, width = 1, height = 1) => {
        e.preventDefault();
        e.stopPropagation();

        // Create a deep copy of the layouts
        const updatedLayouts = JSON.parse(JSON.stringify(layouts));
        const layoutIndex = layout.findIndex((item) => item.i === String(key));

        if (layoutIndex !== -1) {
            // Update the specific layout item's width
            if (updatedLayouts.lg) {
                updatedLayouts.lg[layoutIndex] = {
                    ...updatedLayouts.lg[layoutIndex],
                    w: width,
                    h: height,
                };
            }

            // Assuming there's an 'md' array in your layouts state, update it as well
            if (updatedLayouts.md) {
                updatedLayouts.md[layoutIndex] = {
                    ...updatedLayouts.md[layoutIndex],
                    w: width,
                    h: height,
                };
            }

            // Assuming there's an 'sm' array in your layouts state, update it as well
            if (updatedLayouts.sm) {
                updatedLayouts.sm[layoutIndex] = {
                    ...updatedLayouts.sm[layoutIndex],
                    w: width,
                    h: height,
                };
            }

            saveCurrLayout(updatedLayouts); // Set the updated layouts
        }
    };

    // trigger by save btn
    const saveToDatabase = async (e) => {
        const res = await axios.post(`${backendUrl}/portfolio/save`, {
            email: "jane23@fake.com",
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
    };

    // set layouts & images from db to local storage ( if exist )
    const loadFromDatabase = async () => {
        const res = await axios.get(`${backendUrl}/portfolio/load`);
        const portfolio = res.data.Portfolios;

        if (portfolio.length !== 0) {
            const { images, layouts } = portfolio[0];
            localStorage.setItem("images", JSON.stringify(images));
            localStorage.setItem("layouts", JSON.stringify(layouts));
            dispatch(setImages(images));
            dispatch(setLayouts(layouts));
        }
    };

    useEffect(() => {
        loadFromDatabase();
    }, []);

    useEffect(() => {
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
                        lg: 1280,
                        md: 640,
                        sm: 550,
                    }}
                    cols={{ lg: 8, md: 4, sm: 2 }}
                    resizeHandles={[]}
                    onLayoutChange={(layout, layouts) => {
                        dispatch(setLayout(layout));
                        saveCurrLayout(layouts);
                    }}
                    margin={[20, 50]}
                    containerPadding={[20, 20]}
                    rowHeight={150}
                    draggableCancel=".not-draggable"
                >
                    {[1, 2, 3].map((item) => {
                        return (
                            <div
                                key={item}
                                className="group p-2 border border-solid border-black border-opacity-50 rounded-3xl bg-white cursor-grab active:cursor-grabbing"
                            >
                                <div
                                    className="not-draggable w-1/2 cursor-pointer"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        alert(123);
                                    }}
                                >
                                    <img
                                        src={fox}
                                        alt="fox"
                                        className="block object-cover rounded-xl"
                                    />
                                </div>
                                <article>
                                    <h2>Name: {item}</h2>
                                    <p>Time: {new Date().toDateString()}</p>
                                    <h3>Species: Fox</h3>
                                </article>

                                <button
                                    className="absolute z-10 -left-5 -top-5 w-10 h-10 flex justify-center items-center shadow-2xl rounded-full bg-white text-black opacity-0 group-hover:opacity-100 hover:bg-black hover:text-white transition-all"
                                    onClick={null}
                                >
                                    <FaRegTrashAlt />
                                </button>

                                <nav className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-10/12 opacity-0 group-hover:opacity-100 flex justify-center gap-x-2 py-1.5 rounded-lg bg-black text-white transition-all hover:opacity-100 cursor-default">
                                    {scaleBtns.map((scaleBtn, index) => {
                                        const { icon, w, h } = scaleBtn;

                                        return (
                                            <button
                                                key={index}
                                                className="w-7 h-7 flex justify-center items-center border border-solid border-white rounded-lg text-white hover:bg-white hover:text-black"
                                                onClick={(e) => {
                                                    scale(e, item, w, h);
                                                }}
                                            >
                                                {icon}
                                            </button>
                                        );
                                    })}
                                </nav>
                            </div>
                        );
                    })}
                    {images.map((image) => {
                        const { id, title, species, time, s3Key } = image;

                        return (
                            <div
                                key={id}
                                className="group p-2 border border-solid border-black border-opacity-50 rounded-3xl bg-white cursor-grab active:cursor-grabbing"
                            >
                                <div
                                    className="not-draggable w-1/2 cursor-pointer"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        alert(123);
                                    }}
                                >
                                    <img
                                        src={`${backendUrl}/images/${s3Key}`}
                                        alt={title}
                                        className="block object-cover rounded-xl"
                                    />
                                </div>
                                <article>
                                    <h2>Name: {title}</h2>
                                    <p>Time: {time}</p>
                                    <h3>Species: {species}</h3>
                                </article>

                                <button
                                    className="absolute z-10 -left-5 -top-5 w-10 h-10 border border-solid border-black border-opacity-30 rounded-full shadow-2xl bg-white text-black opacity-0 group-hover:opacity-100 hover:bg-black hover:text-white transition-all"
                                    onClick={(e) => {
                                        deleteImage(e, id, s3Key);
                                    }}
                                >
                                    <FaRegTrashAlt className="mx-auto" />
                                </button>

                                <nav className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-10/12 opacity-0 group-hover:opacity-100 flex justify-center gap-x-2 py-1.5 rounded-lg bg-black text-white transition-all hover:opacity-100 cursor-default">
                                    {scaleBtns.map((scaleBtn, index) => {
                                        const { icon, w, h } = scaleBtn;

                                        return (
                                            <button
                                                key={index}
                                                className="w-7 h-7 flex justify-center items-center border border-solid border-white rounded-lg text-white hover:bg-white hover:text-black"
                                                onClick={(e) => {
                                                    scale(e, id, w, h);
                                                }}
                                            >
                                                {icon}
                                            </button>
                                        );
                                    })}
                                </nav>
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
