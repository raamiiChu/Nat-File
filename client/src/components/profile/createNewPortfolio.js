import React from "react";
import { Link } from "react-router-dom";

const CreateNewPortfolio = ({ toEditPage }) => {
    return (
        <h2 className="col-span-full my-3 text-center text-xl font-bold tracking-wider">
            <Link
                className="px-2 sm:px-6 py-1.5 sm:py-2.5 border-2 border-black border-solid rounded-xl bg-white text-black hover:text-white hover:bg-black transition-all duration-300"
                onClick={(e) => {
                    toEditPage(e, null);
                }}
            >
                Create New Portfolio
            </Link>
        </h2>
    );
};

export default CreateNewPortfolio;
