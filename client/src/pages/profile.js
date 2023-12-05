import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { setPortfolioId } from "../features/portfolioSlice";

import axios from "axios";

import Swal from "sweetalert2";

import { MdOutlineModeEdit } from "react-icons/md";
import { FaRegTrashAlt } from "react-icons/fa";
import imageNotFound from "../images/image-not-found.jpg";

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

const Profile = () => {
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const { backendUrl } = useSelector((state) => state.urlSlice);
    const { userId } = useSelector((state) => state.userSlice);

    const [portfolios, setPortfolios] = useState([]);

    const checkUser = async () => {
        const token = localStorage.getItem("token");

        try {
            await axios.get(`${backendUrl}/auth`, {
                headers: { Authorization: token },
            });
        } catch (error) {
            console.log(error);
            alert("Please Sign in First");
            navigate("/");
        }
    };

    const getAllPortfolio = async () => {
        try {
            const { data, status } = await axios.get(
                `${backendUrl}/portfolio/loadAll/${userId}`
            );

            if (status === 200) {
                const { Portfolios: portfolios } = data;
                setPortfolios(portfolios);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const toEditPage = (e, portfolioId) => {
        e.preventDefault();

        // set portfolioId, then go to edit page
        localStorage.setItem("portfolioId", portfolioId);
        dispatch(setPortfolioId(portfolioId));
        navigate("/edit");
    };

    const deletePortfolio = async (e, portfolioId, images) => {
        e.preventDefault();

        try {
            await axios.delete(`${backendUrl}/portfolio/delete/${portfolioId}`);

            for (const image of images) {
                const { s3Key } = image;
                await axios.delete(`${backendUrl}/images/${s3Key}`);
            }

            setPortfolios(
                portfolios.filter((portfolio) => {
                    return portfolio.id !== portfolioId;
                })
            );

            Toast.fire({
                icon: "success",
                title: "Delete Successfully!",
            });
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        checkUser();
        getAllPortfolio();
    }, []);

    return (
        <div className="grid grid-col-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-8 mx-6 lg:mx-12 sm:mx-16 my-5">
            <h2 className="col-span-full my-3 text-center text-xl font-bold tracking-wider">
                <Link
                    className="px-2 sm:px-6 py-1.5 sm:py-2.5 border-2 border-black border-solid rounded-3xl bg-white text-black hover:text-white hover:bg-black transition-all duration-300"
                    onClick={(e) => {
                        toEditPage(e, null);
                    }}
                >
                    Create New Portfolio
                </Link>
            </h2>

            {portfolios?.map((portfolio) => {
                const {
                    id: portfolioId,
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
                            <h3>Images: {images.length}</h3>
                            <p>Created At: {createdAt}</p>
                            <p>Update At: {updatedAt}</p>
                        </article>

                        <Link
                            className="opacity-0 group-hover:opacity-100 absolute -top-3 -left-3 w-12 h-12 flex justify-center items-center border-2 border-solid border-black border-opacity-40 rounded-full bg-white text-black hover:bg-black hover:text-primary transition-all duration-300"
                            onClick={(e) => {
                                toEditPage(e, portfolioId);
                            }}
                        >
                            <MdOutlineModeEdit className="w-6 h-6" />
                        </Link>

                        <Link
                            className="opacity-0 group-hover:opacity-100 absolute -top-3 -right-3 w-12 h-12 flex justify-center items-center border-2 border-solid border-black border-opacity-40 rounded-full bg-white text-black hover:bg-black hover:text-primary transition-all duration-300"
                            onClick={(e) => {
                                deletePortfolio(e, portfolioId, images);
                            }}
                        >
                            <FaRegTrashAlt className="w-6 h-6" />
                        </Link>
                    </div>
                );
            })}
        </div>
    );
};

export default Profile;
