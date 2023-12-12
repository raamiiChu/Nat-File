import React from "react";
import { Link } from "react-router-dom";

import { format } from "date-fns";

import { MdOutlineModeEdit } from "react-icons/md";
import { FaRegTrashAlt } from "react-icons/fa";
import { FiLink } from "react-icons/fi";
import imageNotFound from "../../images/image-not-found.jpg";

import Swal from "sweetalert2";

const PortfolioItem = ({ userId, portfolio, toEditPage, deletePortfolio }) => {
    const {
        id: portfolioId,
        publicId,
        images,
        createdAt,
        updatedAt,
    } = portfolio;

    let title, s3Url;
    if (images[0]) {
        let s3Key = images[0].s3Key;
        s3Url = `https://stylish-images-storage.s3.ap-northeast-1.amazonaws.com/${s3Key}`;
        title = images[0].title;
    }

    const getPublicUrl = (e, publicId) => {
        e.preventDefault();
        Swal.fire({
            title: "Here's Your Public Link",
            text: `${window.location.origin}/share/${publicId}`,
        });
    };

    return (
        <div
            key={`user-${userId}_portfolio-${portfolioId}`}
            className="group relative grid grid-cols-12 gap-y-3 px-3 py-5 text-gray bg-white border-2 border-solid border-white border-opacity-50 rounded-3xl shadow-blur shadow-slate-500"
        >
            <section className="col-start-2 col-span-10">
                <img
                    src={s3Url || imageNotFound}
                    alt={title}
                    className="block object-contain mx-auto max-h-40 rounded-lg"
                />
            </section>

            <nav className="col-start-2 col-span-10 flex justify-center gap-x-5">
                <Link
                    className="w-10 h-10 flex justify-center items-center border border-solid border-black rounded-full bg-white text-black hover:bg-black hover:text-primary hover:scale-110 transition-all duration-300"
                    title="Edit"
                    onClick={(e) => {
                        toEditPage(e, portfolioId);
                    }}
                >
                    <MdOutlineModeEdit className="text-xl" />
                </Link>

                <Link
                    className="w-10 h-10 flex justify-center items-center border border-solid border-black rounded-full bg-white text-black hover:bg-black hover:text-primary hover:scale-110 transition-all duration-300"
                    title="Share"
                    onClick={(e) => {
                        getPublicUrl(e, publicId);
                    }}
                >
                    <FiLink className="text-xl" />
                </Link>

                <Link
                    className="w-10 h-10 flex justify-center items-center border border-solid border-black rounded-full bg-white text-black hover:bg-red-500 hover:text-primary hover:scale-110 transition-all duration-300"
                    title="Delete"
                    onClick={(e) => {
                        deletePortfolio(e, portfolioId, images);
                    }}
                >
                    <FaRegTrashAlt className="text-xl" />
                </Link>
            </nav>

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
        </div>
    );
};

export default PortfolioItem;
