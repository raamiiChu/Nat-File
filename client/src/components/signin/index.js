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
            } fixed top-0 left-0 z-50 w-full h-full flex justify-center items-center bg-black bg-opacity-50`}
            onClick={() => {
                dispatch(setIsSign(false));
            }}
        >
            <div
                className="w-11/12 sm:w-9/12 lg:w-4/12 mx-auto py-4 text-center bg-white rounded-lg shadow-lg"
                onClick={(e) => {
                    e.stopPropagation();
                }}
            >
                <div className="p-4">
                    <h2 className="text-xl font-bold">Welcome!</h2>
                    <p className="text-base">
                        Sign in to access your account or sign up to join.
                    </p>
                </div>

                <form
                    className="grid gap-y-3 my-1.5 text-left"
                    onSubmit={(e) => {
                        formHandler(e);
                    }}
                >
                    <section className="grid grid-cols-12 justify-around items-center">
                        <label
                            htmlFor="email"
                            className="col-start-2 col-span-3 text-base"
                        >
                            email:
                        </label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            required
                            defaultValue={"jane23@fake.com"}
                            placeholder="email"
                            className="form-input col-start-6 col-span-6 py-1 indent-4 border-2 border-solid border-black rounded-xl focus:outline-none"
                        />
                    </section>

                    <section className="grid grid-cols-12 justify-around items-center">
                        <label
                            htmlFor="password"
                            className="col-start-2 col-span-3 text-base"
                        >
                            password:
                        </label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            required
                            defaultValue={"123ASDspdo$"}
                            placeholder="password"
                            className="form-input col-start-6 col-span-6 py-1 indent-4 border-2 border-solid border-black rounded-xl focus:outline-none"
                            onFocus={(e) => {
                                e.target.type = "text";
                            }}
                            onBlur={(e) => {
                                e.target.type = "password";
                            }}
                        />
                    </section>

                    <div className="grid grid-cols-12 mt-2">
                        <button
                            type="submit"
                            className="form-input col-start-3 col-span-3 p-1 border border-solid border-black rounded-3xl text-base bg-white text-black hover:bg-black hover:text-white transition-all duration-300"
                            onClick={(e) => {
                                setFormAction("Sign Up");
                            }}
                        >
                            Sign Up
                        </button>

                        <button
                            type="submit"
                            className="form-input col-start-8 col-span-3 p-1 border border-solid border-black rounded-3xl text-base bg-white text-black hover:bg-black hover:text-white transition-all duration-300"
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
