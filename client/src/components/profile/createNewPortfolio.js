import React from "react";
import { Link } from "react-router-dom";

const CreateNewPortfolio = ({ toEditPage }) => {
    return (
        <h2 className="col-span-full text-center text-xl font-bold tracking-wider">
            <Link
                className="px-4 sm:px-6 py-1.5 sm:py-2.5 rounded-xl bg-white text-black hover:shadow-surrounding hover:shadow-slate-200 transition-all duration-300"
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
