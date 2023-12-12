import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { setIsOpeningImage } from "../../features/shareSlice";

import { TbCategory } from "react-icons/tb";
import { MdOutlineCenterFocusWeak } from "react-icons/md";
import { BsCalendar2Date } from "react-icons/bs";
import { PiApertureLight, PiTimer, PiArticle } from "react-icons/pi";

const OpenImage = () => {
    // redux
    const dispatch = useDispatch();

    const { info, imageUrl } = useSelector((state) => state.shareSlice);

    const { title, species, time, aperture, shutter, iso, focalLength } = info;

    const close = (e) => {
        e.preventDefault();
        e.stopPropagation();

        dispatch(setIsOpeningImage(false));
    };

    return (
        <section
            className="absolute top-0 left-0 w-full h-full z-30 bg-black bg-opacity-75"
            onClick={(e) => {
                close(e);
            }}
        >
            <div
                className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11/12 sm:w-8/12 lg:w-6/12 grid grid-cols-12 gap-y-2 mx-auto py-5 px-10 bg-white rounded-lg"
                onClick={(e) => {
                    e.stopPropagation();
                }}
            >
                <img
                    src={imageUrl}
                    alt={title}
                    className="col-span-full max-h-[45vh] mx-auto bg-gray bg-opacity-50 object-contain rounded-2xl"
                />

                <article className="col-span-full text-center">
                    <h2 className="text-3xl">{title}</h2>
                </article>

                <hr className="col-span-full border-2 border-gray border-opacity-30" />

                <article className="col-span-full grid grid-cols-2 sm:grid-cols-3 gap-x-3 gap-y-2">
                    <div
                        className="flex items-center justify-center gap-x-2"
                        title="species"
                    >
                        <TbCategory className="text-lg sm:text-xl" />
                        <p className="text-base sm:text-lg">{species}</p>
                    </div>
                    <div
                        className="flex items-center justify-center gap-x-2"
                        title="time"
                    >
                        <BsCalendar2Date className="text-lg sm:text-xl" />
                        <p className="text-base sm:text-lg">{time}</p>
                    </div>
                    <div
                        className="flex items-center justify-center gap-x-2"
                        title="focal length"
                    >
                        <MdOutlineCenterFocusWeak className="text-lg sm:text-xl" />
                        <p className="text-base sm:text-lg">{focalLength}mm</p>
                    </div>
                    <div
                        className="flex items-center justify-center gap-x-2"
                        title="aperture"
                    >
                        <PiApertureLight className="text-lg sm:text-xl" />
                        <p className="text-base sm:text-lg">f/{aperture}</p>
                    </div>
                    <div
                        className="flex items-center justify-center gap-x-2"
                        title="shutter speed"
                    >
                        <PiTimer className="text-lg sm:text-xl" />
                        <p className="text-base sm:text-lg">1/{shutter}</p>
                    </div>
                    <div
                        className="flex items-center justify-center gap-x-2"
                        title="iso"
                    >
                        <PiArticle className="text-lg sm:text-xl" />
                        <p className="text-base sm:text-lg">{iso}</p>
                    </div>
                </article>
            </div>
        </section>
    );
};

export default OpenImage;
