import React from "react";
import { Link } from "react-router-dom";

import { format } from "date-fns";

import { MdOutlineModeEdit } from "react-icons/md";
import { FaRegTrashAlt } from "react-icons/fa";
import imageNotFound from "../../images/image-not-found.jpg";

const PortfolioItem = ({ userId, portfolio, toEditPage, deletePortfolio }) => {
    const { id: portfolioId, images, createdAt, updatedAt } = portfolio;

    let title, s3Url;
    if (images[0]) {
        let s3Key = images[0].s3Key;
        s3Url = `https://stylish-images-storage.s3.ap-northeast-1.amazonaws.com/${s3Key}`;
        title = images[0].title;
    }

    return (
        <div
            key={`user-${userId}_portfolio-${portfolioId}`}
            className="group relative grid grid-cols-12 gap-y-3 px-3 py-5 border-2 border-solid border-black border-opacity-50 rounded-3xl shadow-lg"
        >
            <section className="col-start-2 col-span-10">
                <img
                    src={s3Url || imageNotFound}
                    alt={title}
                    className="block object-contain mx-auto max-h-40 rounded-lg"
                />
            </section>

            <article className="col-span-full">
                <h3 className="text-lg">Images: {images.length}</h3>
                <p className="flex items-center justify-end gap-x-2 mt-2 text-sm">
                    <span>Created At</span>
                    <span>
                        {format(new Date(createdAt), "yyyy / MM / dd hh:mm")}
                    </span>
                </p>
                <p className="flex items-center justify-end gap-x-2 text-sm">
                    <span>Updated At</span>
                    <span>
                        {format(new Date(updatedAt), "yyyy / MM / dd hh:mm")}
                    </span>
                </p>
            </article>

            <Link
                className="opacity-0 group-hover:opacity-100 absolute -top-3 -left-3 w-12 h-12 flex justify-center items-center border-2 border-solid border-black border-opacity-40 rounded-full bg-white text-black hover:bg-black hover:text-primary transition-all duration-300"
                title="Edit"
                onClick={(e) => {
                    toEditPage(e, portfolioId);
                }}
            >
                <MdOutlineModeEdit className="w-6 h-6" />
            </Link>

            <Link
                className="opacity-0 group-hover:opacity-100 absolute -top-3 -right-3 w-12 h-12 flex justify-center items-center border-2 border-solid border-black border-opacity-40 rounded-full bg-white text-black hover:bg-black hover:text-primary transition-all duration-300"
                title="Delete"
                onClick={(e) => {
                    deletePortfolio(e, portfolioId, images);
                }}
            >
                <FaRegTrashAlt className="w-6 h-6" />
            </Link>
        </div>
    );
};

export default PortfolioItem;
