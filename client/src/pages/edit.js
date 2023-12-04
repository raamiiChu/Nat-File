import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { ChartContainer, Board, UploadImage } from "../components/edit";

import axios from "axios";

const Edit = () => {
    const navigate = useNavigate();

    const checkUser = async () => {
        const token = localStorage.getItem("token");

        try {
            await axios.get("http://localhost:3001/auth", {
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
        <main className="relative bg-[url('../images/edit-bg.jpg')] bg-cover bg-no-repeat bg-top">
            <Board />

            <UploadImage />

            <ChartContainer />
        </main>
    );
};

export default Edit;
