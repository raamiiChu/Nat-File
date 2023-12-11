import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { setImages } from "../../features/portfolioSlice";

import {
    setIsUploadingImage,
    setIsConnectingS3,
} from "../../features/triggerSlice";

import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import EXIF from "exif-js";

import { FaFileUpload } from "react-icons/fa";

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
    const [species, setSpecies] = useState("未知");
    const [file, setFile] = useState("");
    const [time, setTime] = useState("");
    const [aperture, setAperture] = useState("");
    const [shutter, setShutter] = useState("");
    const [iso, setIso] = useState("");
    const [focalLength, setFocalLength] = useState("");

    const fileInputHandler = (e) => {
        // if file exist, get full details
        if (e.target.files[0]) {
            EXIF.getData(e.target.files[0], function (e) {
                const time = EXIF.getTag(this, "DateTimeOriginal");
                const aperture = EXIF.getTag(this, "FNumber");
                const shutter = EXIF.getTag(this, "ExposureTime");
                const iso = EXIF.getTag(this, "ISOSpeedRatings") || "unknown";
                const focalLength = EXIF.getTag(this, "FocalLength");

                setAperture(
                    aperture
                        ? aperture.numerator / aperture.denominator
                        : "unknown"
                );
                setShutter(shutter ? shutter.denominator : "unknown");
                setIso(iso);
                setTime(time ? time.split(" ")[0] : "2001:01:01");
                setFocalLength(focalLength ? focalLength.numerator : "unknown");
            });
        }
        setFile(e.target.files[0]);
    };

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
            Swal.fire({
                icon: "info",
                title: "Uploading Image",
                text: "Please wait...",
                showConfirmButton: false,
                allowOutsideClick: false,
                didOpen: () => {
                    Swal.showLoading();
                },
            });

            const { data: s3Key } = await axios.post(
                `${backendUrl}/images/upload`,
                formData,
                {
                    Headers: { "Content-Type": "multipart/form-data" },
                }
            );

            Swal.close();

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
                    {
                        id: uuidv4(),
                        title,
                        species,
                        time,
                        aperture,
                        shutter,
                        iso,
                        focalLength,
                        s3Key,
                    },
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
                className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11/12 sm:w-9/12 lg:w-4/12 grid gap-y-5 mx-auto py-5 bg-white text-center rounded-3xl"
                onClick={(e) => {
                    e.stopPropagation();
                }}
            >
                <h2 className="text-xl font-bold">Upload Your Image</h2>
                <hr className="w-10/12 mx-auto border-2" />
                <form
                    action="POST"
                    className="w-11/12 lg:w-9/12 mx-auto flex flex-col justify-center gap-y-4"
                    onSubmit={(e) => {
                        addImage(e);
                    }}
                >
                    <div className="flex justify-center">
                        <label
                            htmlFor="image"
                            className="w-8/12 grid gap-y-1.5 p-1.5 border border-solid border-black rounded-2xl cursor-pointer hover:text-primary hover:bg-black transition-all duration-300"
                        >
                            <FaFileUpload className="w-6 h-6 mx-auto" />
                            {file ? file?.name : "Maximum Size: 10 MB"}
                        </label>
                        <input
                            type="file"
                            name="image"
                            id="image"
                            className="form-input inline w-[1px] h-[1px]"
                            required
                            onChange={(e) => {
                                fileInputHandler(e);
                            }}
                        />
                    </div>

                    <div className="flex justify-between">
                        <label htmlFor="title" className="w-full text-left p-1">
                            Title
                        </label>
                        <input
                            type="text"
                            name="title"
                            id="title"
                            className="form-input py-1 border border-black rounded-md indent-2"
                            required
                            maxLength={15}
                            onChange={(e) => {
                                setTitle(e.target.value);
                            }}
                        />
                    </div>

                    <div className="flex justify-between">
                        <label
                            htmlFor="species"
                            className="w-full text-left p-1"
                        >
                            Species
                        </label>
                        <select
                            name="species"
                            id="species"
                            className="form-input p-1 w-1/2 border border-black rounded-md"
                            defaultValue={"未知"}
                            required
                            onChange={(e) => {
                                setSpecies(e.target.value);
                            }}
                        >
                            <option value="大分類" disabled>
                                大分類
                            </option>
                            <hr disabled />
                            <option value="未知">未知</option>
                            <option value="原生動物">原生動物</option>
                            <option value="真菌">真菌</option>
                            <option value="植物">植物</option>

                            <option value="魚類">魚類</option>
                            <option value="兩棲類">兩棲類</option>
                            <option value="爬蟲類">爬蟲類</option>
                            <option value="鳥類">鳥類</option>
                            <option value="哺乳類">哺乳類</option>

                            <option value="藻類">藻類</option>
                            <option value="軟體動物">軟體動物</option>
                            <option value="節肢動物">節肢動物</option>
                            <option value="昆蟲">昆蟲</option>
                            <option value="蛛形綱">蛛形綱</option>

                            <option value="其它動物">其它動物</option>
                        </select>
                    </div>

                    <hr className="border-2" />

                    <div className="grid grid-cols-2 gap-5 px-4">
                        <button
                            type="reset"
                            className="px-3 py-1 rounded-full bg-gray bg-opacity-25 hover:bg-black hover:text-primary disabled:cursor-progress disabled:opacity-20 disabled:bg-black disabled:text-white transition-all duration-300"
                            disabled={isConnectingS3}
                            onClick={() => {
                                setFile(null);
                            }}
                        >
                            Reset
                        </button>

                        <button
                            type="submit"
                            className="px-3 py-1 border-2 border-solid border-black rounded-full hover:bg-black hover:text-primary disabled:cursor-progress disabled:opacity-20 disabled:bg-black disabled:text-white transition-all duration-300"
                            disabled={isConnectingS3}
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default UploadImage;
