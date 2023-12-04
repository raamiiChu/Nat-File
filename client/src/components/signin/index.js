import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { setIsSign } from "../../features/triggerSlice";
import { setIsAuth } from "../../features/userSlice";

import axios from "axios";

const Signin = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [formAction, setFormAction] = useState("");

    const { isSign } = useSelector((state) => state.triggerSlice);
    const { backendUrl } = useSelector((state) => state.urlSlice);

    const signIn = async (email, password) => {
        const url = `${backendUrl}/user/signin`;

        try {
            const { data, status } = await axios.post(url, {
                email,
                password,
            });

            if (status === 200) {
                const { token } = data;
                localStorage.setItem("token", token);
                localStorage.setItem("user", email);

                alert("Login !!!");
                dispatch(setIsSign(false));
                dispatch(setIsAuth(true));
                navigate("/profile");
            }
        } catch (error) {
            const { status } = error.response;

            // wrong email or password
            if (status === 403) {
                alert("email or password is not correct");
            }

            // user no found
            if (status === 404) {
                alert("Please sign up first");
            }
        }
    };

    const formHandler = async (e) => {
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
                url = `${backendUrl}/user/signup`;
                await axios.post(url, { email, password });
            }

            signIn(email, password);
        } catch (error) {
            const { status, data } = error.response;

            // user no found
            if (status === 404) {
                alert(data);
            }

            // wrong email or password
            if (status === 403) {
                alert(data);
            }

            // user exists
            if (status === 409) {
                // sign in directly
                signIn(email, password);
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
                        formHandler(e);
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
