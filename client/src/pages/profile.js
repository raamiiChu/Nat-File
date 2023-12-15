import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { setPortfolioId } from "../features/portfolioSlice";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import Swal from "sweetalert2";

import {
    CreateNewPortfolio,
    PortfolioItem,
    Skeleton,
} from "../components/profile";

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
                return portfolios;
            }
        } catch (error) {
            console.log(error);
        }
    };

    const {
        data: portfolios,
        isLoading,
        isSuccess,
        refetch,
        isFetching,
    } = useQuery({
        queryFn: getAllPortfolio,
        queryKey: ["getAllPortfolio"],
        staleTime: Infinity,
    });

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

                refetch();

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
        refetch();
    }, []);

    return (
        <main className="grid grid-col-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12 px-6 pt-24 pb-16 bg-black lg:px-12 sm:px-16">
            <CreateNewPortfolio toEditPage={toEditPage} />

            {(isLoading || isFetching) &&
                [1, 2, 3, 4, 5, 6, 7, 8].map((index) => {
                    return <Skeleton key={index} />;
                })}

            {isSuccess &&
                portfolios?.map((portfolio) => {
                    return (
                        <PortfolioItem
                            userId={userId}
                            portfolio={portfolio}
                            toEditPage={toEditPage}
                            deletePortfolio={deletePortfolio}
                        />
                    );
                })}
        </main>
    );
};

export default Profile;
