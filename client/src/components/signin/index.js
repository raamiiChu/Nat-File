import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { setIsSign } from "../../features/triggerSlice";

import axios from "axios";

const Signin = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [formAction, setFormAction] = useState("");

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
            let url;
            if (formAction === "Sign Up") {
                url = "http://localhost:3001/user/signup";
            } else {
                url = "http://localhost:3001/user/signin";
            }

            let { data, status } = await axios.post(url, {
                email,
                password,
            });

            if (formAction === "Sign Up") {
                let res = await axios.post(url, {
                    email,
                    password,
                });

                data = res.data;
                status = res.status;
            }

            if (status === 200) {
                const { token } = data;
                localStorage.setItem("token", token);
                localStorage.setItem("user", email);

                alert("Login !!!");
                dispatch(setIsSign(false));
                navigate("/profile");
            }
        } catch (error) {
            const { status, data } = error.response;

            if (status === 404) {
                alert(data);
            }

            if (status === 409) {
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
                    localStorage.setItem("user", email);

                    console.log(token);
                    alert("Login !!!");
                    dispatch(setIsSign(false));
                    navigate("/profile");
                }
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
                <h2>Sign In</h2>
                <form
                    className="grid gap-y-2 text-left"
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
                            defaultValue={"jane23@fake.com"}
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
                            defaultValue={"123ASDspdo$"}
                            className="form-input border border-solid border-black focus:outline-none"
                        />
                    </section>

                    <div className="w-full grid grid-cols-12">
                        <button
                            type="submit"
                            className="form-input col-start-3 col-span-3 p-1 border border-solid border-black rounded-lg bg-white text-black hover:bg-black hover:text-white transition-all duration-300"
                            onClick={(e) => {
                                setFormAction("Sign Up");
                            }}
                        >
                            Sign Up
                        </button>

                        <button
                            type="submit"
                            className="form-input col-start-8 col-span-3 p-1 border border-solid border-black rounded-lg bg-white text-black hover:bg-black hover:text-white transition-all duration-300"
                            onClick={(e) => {
                                setFormAction("Sign In");
                            }}
                        >
                            Sign In
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Signin;
