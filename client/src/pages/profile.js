import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

const Profile = () => {
    const navigate = useNavigate();

    const checkUser = async () => {
        const token = localStorage.getItem("token");

        try {
            const res = await axios.get("http://localhost:3001/auth", {
                headers: { Authorization: token },
            });
            console.log(res);
        } catch (error) {
            console.log(error);
            alert("Please Sign in First");
            navigate("/");
        }
    };

    useEffect(() => {
        checkUser();
    }, []);

    return <div>Profile Page</div>;
};

export default Profile;
