import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { setLayouts, setImages } from "../../features/portfolioSlice";

import axios from "axios";

import Swal from "sweetalert2";

import { LuRectangleVertical, LuRectangleHorizontal } from "react-icons/lu";
import { IoSquareOutline } from "react-icons/io5";
import { GoSquare } from "react-icons/go";
import { FaRegTrashAlt } from "react-icons/fa";

const boardStyles = ["board-small", "board-long", "board-tall", "board-big"];

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

const BoardItem = ({ image }) => {
    const { id, title, species, time, s3Key } = image;

    // reducer
    const dispatch = useDispatch();

    // redux
    const { backendUrl } = useSelector((state) => state.urlSlice);

    const { layouts, images } = useSelector((state) => state.portfolioSlice);

    // state
    const [boardIndex, setBoardIndex] = useState(0);

    // trigger by delete btn
    const deleteImage = async (e, id, s3Key) => {
        e.stopPropagation();
        e.preventDefault();

        const result = await Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showConfirmButton: false,
            showCancelButton: true,
            showDenyButton: true,
            denyButtonText: "Delete",
        });

        if (result.isDenied) {
            await axios.delete(`${backendUrl}/images/${s3Key}`);

            Toast.fire({
                icon: "success",
                title: "Your image has been deleted",
            });

            dispatch(
                setImages(
                    images.filter((image) => {
                        return image.id !== id;
                    })
                )
            );
        }
    };

    // trigger by scale btns
    const scale = (e, key, width = 1, height = 1) => {
        e.preventDefault();
        e.stopPropagation();

        // Create a deep copy of the layouts
        const updatedLayouts = JSON.parse(JSON.stringify(layouts));
        const layoutIndex = layouts.lg.findIndex(
            (item) => item.i === String(key)
        );

        if (layoutIndex !== -1) {
            // Update the specific layout item's width
            if (updatedLayouts.lg) {
                updatedLayouts.lg[layoutIndex] = {
                    ...updatedLayouts.lg[layoutIndex],
                    w: width,
                    h: height,
                };
            }

            dispatch(setLayouts(updatedLayouts));
            localStorage.setItem("layouts", JSON.stringify(layouts));
        }
    };

    const determineIndex = () => {
        if (!layouts) {
            return 0;
        }

        const foundLayout = layouts["lg"].filter((layout) => {
            return layout.i === id;
        });

        if (!foundLayout) {
            return 0;
        }

        try {
            const { w, h } = foundLayout[0];

            if (w === 1 && h === 1) {
                return 0;
            } else if (w === 2 && h === 1) {
                return 1;
            } else if (w === 1 && h === 2) {
                return 2;
            } else if (w === 2 && h === 2) {
                return 3;
            }
        } catch (error) {
            // first time upload image
            return 0;
        }
    };

    useEffect(() => {
        const index = determineIndex();
        setBoardIndex(index);
    }, [layouts]);

    return (
        <div className={`${boardStyles[boardIndex]}`}>
            <div>
                <img
                    src={`https://stylish-images-storage.s3.ap-northeast-1.amazonaws.com/${s3Key}`}
                    alt={title}
                />
            </div>
            <article>
                <h2>{title}</h2>
                <p>{time}</p>
                <h3>{species}</h3>
            </article>

            <button
                className="absolute z-10 -left-5 -top-5 w-10 h-10 border border-solid border-black border-opacity-30 rounded-full shadow-2xl bg-white text-black opacity-0 group-hover:opacity-100 hover:bg-black hover:text-white transition-all"
                onClick={(e) => {
                    deleteImage(e, id, s3Key);
                }}
            >
                <FaRegTrashAlt className="mx-auto" />
            </button>

            <nav className="opacity-0 group-hover:opacity-100 absolute -bottom-8 left-1/2 -translate-x-1/2 flex justify-center gap-x-2 px-4 py-1.5 rounded-lg bg-black bg-opacity-50 text-white transition-all hover:opacity-100 cursor-default">
                {scaleBtns.map((scaleBtn, index) => {
                    const { icon, w, h } = scaleBtn;

                    return (
                        <button
                            key={index}
                            className={`${
                                index === boardIndex
                                    ? "bg-white text-black"
                                    : "bg-black text-white"
                            } w-7 h-7 flex justify-center items-center rounded-lg hover:bg-white hover:text-black`}
                            onClick={(e) => {
                                scale(e, id, w, h);
                                setBoardIndex(index);
                            }}
                        >
                            {icon}
                        </button>
                    );
                })}
            </nav>
        </div>
    );
};

export default BoardItem;
