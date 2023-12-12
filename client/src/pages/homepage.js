import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { setIsSign } from "../features/triggerSlice";

import { Earth } from "../components/homepage";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import fox from "../images/fox.jpg";
import { FaArrowRight } from "react-icons/fa6";

gsap.registerPlugin(ScrollTrigger);

const HomePage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { isAuth } = useSelector((state) => state.userSlice);

    const earthContainer = useRef(null);
    const [width, setWidth] = useState(window.innerWidth);
    const [height, setHeight] = useState(700);

    const goToPortfolio = (e) => {
        e.preventDefault();

        if (isAuth) {
            navigate("/profile");
        } else {
            dispatch(setIsSign(true));
        }
    };

    const handleResize = () => {
        const newWidth = earthContainer.current.offsetWidth;
        const newHeight = earthContainer.current.offsetHeight;
        setWidth(newWidth);
        setHeight(newHeight);
    };

    useEffect(() => {
        // gsap.set("#about-item", { y: 150, opacity: 0 });
        // gsap.to("#about-item", {
        //     scrollTrigger: {
        //         trigger: "#about",
        //         scrub: true,
        //     },
        //     y: 0,
        //     opacity: 1,
        // });
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <main className="pt-12">
            <div className="relative h-[95vh] text-white">
                <section className="absolute w-full top-[12%] z-30 left-0 grid grid-cols-12 gap-y-8 md:gap-y-12 text-center">
                    <h2 className="col-span-full text-5xl sm:text-6xl font-bold">
                        Nat File
                    </h2>

                    <hr className="col-start-4 lg:col-start-5 col-span-6 lg:col-span-4 border-2 border-solid border-primary rounded-sm" />

                    <ul className="col-start-3 lg:col-start-4 col-span-8 lg:col-span-6 grid grid-cols-1 md:grid-cols-2 gap-x-20 lg:gap-x-5 gap-y-10">
                        <li className="grid gap-y-5">
                            <p className="text-base">
                                View Other's Observation
                            </p>
                            <Link
                                to={"/view"}
                                className="block w-full lg:w-2/3 mx-auto py-3 sm:p-2 bg-primary text-xl text-black font-bold tracking-wide rounded-3xl hover:shadow-surrounding hover:shadow-slate-400 transition-all duration-300"
                            >
                                View
                            </Link>
                        </li>

                        <li className="grid gap-y-5">
                            <p className="text-base">
                                Create Your Own Portfolio
                            </p>
                            <Link
                                className="block w-full lg:w-2/3 mx-auto py-3 sm:p-2 bg-primary text-xl text-black font-bold tracking-wide rounded-3xl hover:shadow-surrounding hover:shadow-slate-400 transition-all duration-300"
                                onClick={(e) => {
                                    goToPortfolio(e);
                                }}
                            >
                                Portfolio
                            </Link>
                        </li>
                    </ul>
                </section>

                <div
                    ref={earthContainer}
                    className="absolute z-10 w-full h-full overflow-hidden"
                >
                    <Earth width={width} height={height} />
                </div>
            </div>

            <div className="grid py-32 gap-y-16 bg-fixed bg-left-top bg-[url('../images/homepage-bg.jpg')]">
                <section className="grid grid-cols-1 lg:grid-cols-2 gap-y-10 px-4 sm:px-12 md:px-20 lg:px-0 py-10 text-white bg-black bg-opacity-50">
                    <div id="about-item" className="mx-auto lg:mx-0">
                        <img
                            src={fox}
                            alt="fox"
                            className="max-h-[250px] lg:max-h-[350px] object-contain rounded-3xl lg:rounded-e-full"
                        />
                    </div>

                    <article
                        id="about-item"
                        className="flex flex-col justify-around gap-y-10 px-2 sm:px-10"
                    >
                        <div className="grid grid-cols-2 gap-x-5 items-center">
                            <hr className="border-2 border-solid border-primary" />

                            <h3
                                id="about"
                                className="text-2xl sm:text-3xl text-center text-primary font-bold tracking-widest"
                            >
                                About
                            </h3>
                        </div>

                        <p className="text-xl p-2 sm:p-8 indent-8">
                            Lorem ipsum dolor sit amet consectetur. Turpis
                            pharetra sit at leo. Sagittis augue bibendum mi in
                            magna
                        </p>

                        <div className="grid grid-cols-5 gap-x-5 items-center">
                            <hr className="col-span-2 border-2 border-solid border-primary" />

                            <h3 className="col-span-3 text-lg sm:text-xl text-primary indent-8 tracking-wide">
                                More
                            </h3>
                        </div>
                    </article>
                </section>

                <section
                    id=""
                    className="flex lg:grid flex-col-reverse grid-cols-1 lg:grid-cols-2 gap-y-10 px-4 sm:px-12 md:px-20 lg:px-0 py-10 text-white bg-black"
                >
                    <article className="flex flex-col justify-around gap-y-10 px-2 sm:px-10">
                        <div className="grid grid-cols-2 gap-x-5 items-center">
                            <hr className="border-2 border-solid border-primary" />

                            <h3 className="text-lg sm:text-3xl text-center text-primary font-bold tracking-widest">
                                How to Use
                            </h3>
                        </div>

                        <p className="text-xl p-2 sm:p-8 indent-8">
                            Lorem ipsum dolor sit amet consectetur. Turpis
                            pharetra sit at leo. Sagittis augue bibendum mi in
                            magna
                        </p>

                        <div className="grid grid-cols-5 gap-x-5 items-center">
                            <hr className="col-span-2 border-2 border-solid border-primary" />

                            <h3 className="col-span-3 text-lg sm:text-xl text-primary indent-8 tracking-wide">
                                More
                            </h3>
                        </div>
                    </article>

                    <div id="" className="mx-auto lg:mx-0 flex justify-end">
                        <img
                            src={fox}
                            alt="fox"
                            className="max-h-[250px] lg:max-h-[350px] object-contain rounded-3xl lg:rounded-s-full"
                        />
                    </div>
                </section>

                <section className="grid grid-cols-1 lg:grid-cols-2 gap-y-10 px-4 sm:px-12 md:px-20 lg:px-0 py-10 text-white  bg-black bg-opacity-75">
                    <div id="about-item" className="mx-auto lg:mx-0">
                        <img
                            src={fox}
                            alt="fox"
                            className="max-h-[250px] lg:max-h-[350px] object-contain rounded-3xl lg:rounded-e-full"
                        />
                    </div>

                    <article
                        id="about-item"
                        className="flex flex-col justify-around gap-y-10 px-2 sm:px-10"
                    >
                        <div className="grid grid-cols-2 gap-x-5 items-center">
                            <hr className="border-2 border-solid border-primary" />

                            <h3
                                id="about"
                                className="text-2xl sm:text-3xl text-center text-primary font-bold tracking-widest"
                            >
                                Share
                            </h3>
                        </div>

                        <p className="text-xl p-2 sm:p-8 indent-8">
                            Lorem ipsum dolor sit amet consectetur. Turpis
                            pharetra sit at leo. Sagittis augue bibendum mi in
                            magna
                        </p>

                        <div className="grid grid-cols-5 gap-x-5 items-center">
                            <hr className="col-span-2 border-2 border-solid border-primary" />

                            <h3 className="col-span-3 text-lg sm:text-xl text-primary indent-8 tracking-wide">
                                More
                            </h3>
                        </div>
                    </article>
                </section>
            </div>

            <div className="grid grid-cols-12 py-10 bg-black">
                <div className="col-start-1 sm:col-start-2 lg:col-start-3 col-span-full sm:col-span-10 lg:col-span-8 grid grid-cols-8 items-center mx-5">
                    <hr className="col-span-2 border-2 border-solid border-primary" />
                    <h2 className="col-span-4 text-2xl sm:text-3xl text-center text-primary">
                        Ready to Explore?
                    </h2>
                    <hr className="col-span-2 border-2 border-solid border-primary" />
                </div>

                <nav className="col-start-2 lg:col-start-4 col-span-10 lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-y-10 my-10 sm:my-20 text-white">
                    <div className="grid justify-center items-center gap-y-2.5 sm:gap-y-5 text-center">
                        <Link
                            to={"/view"}
                            className="w-14 h-14 flex justify-center items-center p-3 mx-auto border-2 border-solid border-white rounded-full hover:scale-105 hover:text-primary hover:shadow-blur hover:shadow-slate-300 transition-all duration-300"
                        >
                            <FaArrowRight className="text-2xl" />
                        </Link>
                        <h3 className="text-xl sm:text-3xl font-bold tracking-wider">
                            View
                        </h3>
                        <p className="text-base">View Other's Observation</p>
                    </div>

                    <div className="grid justify-center items-center gap-y-2.5 sm:gap-y-5 text-center">
                        <Link
                            className="w-14 h-14 flex justify-center items-center p-3 mx-auto border-2 border-solid border-white rounded-full hover:scale-105 hover:text-primary hover:shadow-blur hover:shadow-slate-300 transition-all duration-300"
                            onClick={(e) => {
                                goToPortfolio(e);
                            }}
                        >
                            <FaArrowRight className="text-2xl" />
                        </Link>
                        <h3 className="text-xl sm:text-3xl font-bold tracking-wider">
                            Portfolio
                        </h3>
                        <p className="text-base">Create Your Own Portfolio</p>
                    </div>
                </nav>
            </div>
        </main>
    );
};

export default HomePage;
