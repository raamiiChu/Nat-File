import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";

import { Board, UploadImage } from "../components/edit";
import { ChartContainer } from "../components/chart";

import axios from "axios";

const Edit = () => {
    const navigate = useNavigate();
    const { backendUrl } = useSelector((state) => state.urlSlice);

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

    useEffect(() => {
        checkUser();
    }, []);

    return (
        <main className="pt-16 relative bg-fixed bg-[url('../images/edit-bg.jpg')] bg-cover bg-no-repeat bg-top">
            <Board />

            <UploadImage />

            <ChartContainer />
        </main>
    );
};

export default Edit;
