import React from "react";

import { Link } from "react-router-dom";

import { FaArrowRight } from "react-icons/fa6";

const EndNav = ({ goToPortfolio }) => {
    return (
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
    );
};

export default EndNav;
