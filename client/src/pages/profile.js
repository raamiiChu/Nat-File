import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { setPortfolioId } from "../features/portfolioSlice";

import axios from "axios";

import Swal from "sweetalert2";

import { CreateNewPortfolio, PortfolioItem } from "../components/profile";

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

        const result = await Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showConfirmButton: false,
            showCancelButton: true,
            showDenyButton: true,
            denyButtonText: "Delete",
        });

        if (result.isDenied) {
            try {
                await axios.delete(
                    `${backendUrl}/portfolio/delete/${portfolioId}`
                );

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
        }
    };

    useEffect(() => {
        checkUser();
        getAllPortfolio();
    }, []);

    return (
        <div className="grid grid-col-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-8 mx-6 lg:mx-12 sm:mx-16 my-5">
            <CreateNewPortfolio toEditPage={toEditPage} />

            {portfolios?.map((portfolio) => {
                return (
                    <PortfolioItem
                        userId={userId}
                        portfolio={portfolio}
                        toEditPage={toEditPage}
                        deletePortfolio={deletePortfolio}
                    />
                );
            })}
        </div>
    );
};

export default Profile;
