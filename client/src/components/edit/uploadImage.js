import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { setImages } from "../../features/portfolioSlice";

import {
    setIsUploadingImage,
    setIsConnectingS3,
} from "../../features/triggerSlice";

import { v4 as uuidv4 } from "uuid";
import axios from "axios";

import Swal from "sweetalert2";

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

const UploadImage = () => {
    // reducer
    const dispatch = useDispatch();

    // redux
    const { backendUrl } = useSelector((state) => state.urlSlice);

    const { images } = useSelector((state) => state.portfolioSlice);

    const { isUploadingImage, isConnectingS3 } = useSelector(
        (state) => state.triggerSlice
    );

    // form data
    const [title, setTitle] = useState("");
    const [species, setSpecies] = useState("");
    const [file, setFile] = useState("");
    const [time, setTime] = useState("");

    // trigger after form been submitted
    const addImage = async (e) => {
        // check the form
        if (!title || !species || !file) {
            return;
        }

        e.preventDefault();

        dispatch(setIsConnectingS3(true));

        const formData = new FormData();
        formData.append("image", file);

        try {
            const { data: s3Key } = await axios.post(
                `${backendUrl}/images/upload`,
                formData,
                {
                    Headers: { "Content-Type": "multipart/form-data" },
                }
            );

            Toast.fire({
                icon: "success",
                title: "Your image has been updated",
            });

            // reset form input
            e.target.reset();

            dispatch(setIsUploadingImage(false));
            dispatch(
                setImages([
                    ...images,
                    { id: uuidv4(), title, species, time, s3Key },
                ])
            );
        } catch (error) {
            console.log(error);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Please upload an image, and the size should less than 10MB!",
            });
        }

        dispatch(setIsConnectingS3(false));
    };

    return (
        <section
            className={`${
                isUploadingImage ? "block" : "hidden"
            } absolute top-0 left-0 z-30 w-full h-full flex justify-center items-center bg-black bg-opacity-50`}
            onClick={() => {
                dispatch(setIsUploadingImage(false));
            }}
        >
            <div
                className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11/12 sm:w-9/12 lg:w-4/12 mx-auto py-4 bg-white text-center"
                onClick={(e) => {
                    e.stopPropagation();
                }}
            >
                <h2 className="text-xl py-3">Upload Your Image</h2>
                <form
                    action="POST"
                    className="w-11/12 lg:w-9/12 mx-auto flex flex-col justify-center gap-y-2"
                    onSubmit={(e) => {
                        addImage(e);
                    }}
                >
                    <div className="flex justify-between">
                        <label htmlFor="title">Title</label>
                        <input
                            type="text"
                            name="title"
                            id="title"
                            className="form-input border-2 border-black rounded-md focus:outline-none"
                            required
                            onChange={(e) => {
                                setTitle(e.target.value);
                            }}
                        />
                    </div>

                    <div className="flex justify-between">
                        <label htmlFor="species">Species</label>
                        <input
                            type="text"
                            name="species"
                            id="species"
                            className="form-input border-2 border-black rounded-md focus:outline-none"
                            required
                            onChange={(e) => {
                                setSpecies(e.target.value);
                            }}
                        />
                    </div>

                    <div className="flex justify-between">
                        <label htmlFor="image">Image</label>
                        <input
                            type="file"
                            name="image"
                            id="image"
                            className="form-input border-2 border-black rounded-md focus:outline-none"
                            required
                            onChange={(e) => {
                                setTime(
                                    e.target.files[0]?.lastModifiedDate.toDateString()
                                );

                                setFile(e.target.files[0]);
                            }}
                        />
                    </div>

                    <button
                        type="submit"
                        className={`px-3 py-1 border border-solid border-black rounded-full hover:bg-black hover:text-white disabled:cursor-progress disabled:opacity-20 disabled:bg-black disabled:text-white`}
                        disabled={isConnectingS3}
                    >
                        Submit
                    </button>
                </form>
            </div>
        </section>
    );
};

export default UploadImage;
