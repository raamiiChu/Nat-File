import React from "react";
import { Link } from "react-router-dom";

import { format, formatDistance } from "date-fns";

import { PiImagesSquareThin } from "react-icons/pi";
import { MdOutlineModeEdit } from "react-icons/md";
import { FaRegTrashAlt } from "react-icons/fa";
import { FiLink } from "react-icons/fi";
import imageNotFound from "../../images/image-not-found.jpg";

import Swal from "sweetalert2";

const PortfolioItem = ({ userId, portfolio, toEditPage, deletePortfolio }) => {
    const { id: portfolioId, publicId, images, updatedAt } = portfolio;

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
            className="relative grid grid-cols-12 gap-y-3.5 px-2 py-5 text-gray bg-white border-2 border-solid border-white border-opacity-50 rounded-3xl shadow-blur shadow-slate-500"
        >
            <section className="relative col-start-2 col-span-10">
                <Link
                    title="Edit"
                    onClick={(e) => {
                        toEditPage(e, portfolioId);
                    }}
                >
                    <img
                        src={s3Url || imageNotFound}
                        alt={title}
                        className="block h-60 w-full object-center object-cover mx-auto rounded-xl hover:scale-105 transition-all duration-300"
                    />
                </Link>
                <h3 className="absolute bottom-2 left-2 flex items-center gap-x-1 px-1.5 py-1 bg-black bg-opacity-40 text-primary rounded-lg">
                    <PiImagesSquareThin className="text-xl" />
                    <span className="text-lg">{images.length}</span>
                </h3>
            </section>

            <nav className="col-start-2 col-span-10 flex justify-around">
                <Link
                    className="w-10 h-10 flex justify-center items-center border-2 border-solid border-black rounded-full bg-white text-black hover:bg-black hover:text-primary hover:scale-110 transition-all duration-300"
                    title="Edit"
                    onClick={(e) => {
                        toEditPage(e, portfolioId);
                    }}
                >
                    <MdOutlineModeEdit className="text-2xl" />
                </Link>

                <Link
                    className="w-10 h-10 flex justify-center items-center border-2 border-solid border-black rounded-full bg-white text-black hover:bg-black hover:text-primary hover:scale-110 transition-all duration-300"
                    title="Share"
                    onClick={(e) => {
                        getPublicUrl(e, publicId);
                    }}
                >
                    <FiLink className="text-xl" />
                </Link>

                <Link
                    className="w-10 h-10 flex justify-center items-center border-2 border-solid border-black rounded-full bg-white text-black hover:bg-red-500 hover:text-white hover:scale-110 transition-all duration-300"
                    title="Delete"
                    onClick={(e) => {
                        deletePortfolio(e, portfolioId, images);
                    }}
                >
                    <FaRegTrashAlt className="text-xl" />
                </Link>
            </nav>

            <article className="col-start-2 col-span-10">
                <p
                    title={`Updated At ${format(
                        new Date(updatedAt),
                        "yyyy / MM / dd hh:mm"
                    )}`}
                    className="flex items-center justify-end gap-x-2 text-sm"
                >
                    {formatDistance(new Date(updatedAt), new Date(), {
                        addSuffix: true,
                    })}
                </p>
            </article>
        </div>
    );
};

export default PortfolioItem;
