import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { setIsSign } from "../features/triggerSlice";

import { Earth, About, EndNav } from "../components/homepage";

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

            <About />

            <EndNav goToPortfolio={goToPortfolio} />
        </main>
    );
};

export default HomePage;
