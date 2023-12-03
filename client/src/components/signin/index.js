import React from "react";
import { useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { setIsSign } from "../../features/triggerSlice";

import axios from "axios";

const Signin = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { isSign } = useSelector((state) => state.triggerSlice);

    const userSignin = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const formObject = {};

        formData.forEach(function (value, key) {
            formObject[key] = value;
        });

        const { email, password } = formObject;

        try {
            const { data, status } = await axios.post(
                "http://localhost:3001/user/signin",
                {
                    email,
                    password,
                }
            );

            if (status === 200) {
                const { token } = data;
                localStorage.setItem("token", token);
                alert("Login !!!");
                dispatch(setIsSign(false));
                navigate("/profile");
            }
        } catch (error) {
            const { status, data } = error.response;

            if (status === 404) {
                alert(data);
            }
        }
    };

    return (
        <div
            className={`${
                isSign ? "block" : "hidden"
            } fixed top-0 left-0 z-20 w-full h-full flex justify-center items-center bg-black bg-opacity-50`}
            onClick={() => {
                dispatch(setIsSign(false));
            }}
        >
            <div
                className="w-11/12 sm:w-9/12 lg:w-4/12 mx-auto py-4 bg-white text-center"
                onClick={(e) => {
                    e.stopPropagation();
                }}
            >
                <form
                    className="text-left"
                    onSubmit={(e) => {
                        userSignin(e);
                    }}
                >
                    <section className="flex justify-around">
                        <label htmlFor="email" className="w-1/4">
                            email:
                        </label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            required
                            value={"jane23@fake.com"}
                            className="form-input border border-solid border-black focus:outline-none"
                        />
                    </section>

                    <section className="flex justify-around">
                        <label htmlFor="password" className="w-1/4">
                            password:
                        </label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            required
                            value={"123ASDspdo$"}
                            className="form-input border border-solid border-black focus:outline-none"
                        />
                    </section>

                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default Signin;
