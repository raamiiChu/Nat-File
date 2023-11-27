import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
const Header = () => {
    const [showMenu, setShowMenu] = useState(false);
    const navLinks = [
        ["About", "/about"],
        ["Edit", "/edit"],
        ["View", "/view"],
        ["Profile", "/profile"],
    ];

    return (
        <header className="sticky top-0 w-full grid grid-cols-12 max-h-[100px] sm:max-h-[150px] px-0 sm:px-4 bg-black bg-opacity-75 text-white text-center font-bold tracking-widest shadow-md shadow-black">
            {/* homepage link */}
            <Link
                to="/"
                className="col-start-4 sm:col-start-1 col-span-6 sm:col-span-3 py-5 text-4xl lg:text-5xl text-primary hover:opacity-75"
            >
                <h1 className="">Nat File</h1>
            </Link>

            {/* laptop links */}
            <ul className="col-span-6 lg:col-span-4 hidden sm:grid grid-cols-4 items-center text:xl lg:text-2xl">
                {navLinks.map((navLink, index) => {
                    return (
                        <Link
                            key={index}
                            to={navLink[1]}
                            className="hover:opacity-75"
                        >
                            <li className="block py-5">{navLink[0]}</li>
                        </Link>
                    );
                })}
            </ul>

            <button className="col-start-10 xl:col-start-11 col-span-3 xl:col-span-2 hidden sm:grid items-center text-2xl lg:text-3xl hover:opacity-75">
                Sign In / Up
            </button>

            {/* mobile links */}
            <button
                className="block sm:hidden col-span-3 m-auto hover:opacity-75"
                onClick={() => {
                    setShowMenu(!showMenu);
                }}
            >
                <FontAwesomeIcon className="p-5" icon={faBars} size="2xl" />
            </button>

            <ul
                className={`${
                    showMenu ? "h-auto opacity-100" : "-h-10 opacity-0"
                } absolute w-full top-full col-span-full grid sm:hidden py-4 bg-black bg-opacity-75 text-2xl shadow-md shadow-black transition-all duration-300 ease-in-out`}
            >
                {navLinks.map((navLink, index) => {
                    return (
                        <Link
                            key={index}
                            to={navLink[1]}
                            className="hover:opacity-75"
                        >
                            <li className="py-3" key={index}>
                                {navLink[0]}
                            </li>
                        </Link>
                    );
                })}
                <button className="py-3 hover:opacity-75">Sign In / Up</button>
            </ul>
        </header>
    );
};

export default Header;
