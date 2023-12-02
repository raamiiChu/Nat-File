import React, { useState } from "react";
import { Link } from "react-router-dom";

import { FaBars } from "react-icons/fa";

const Header = () => {
    const [showMenu, setShowMenu] = useState(false);
    const navLinks = [
        ["About", "/about"],
        ["Edit", "/edit"],
        ["View", "/view"],
        ["Profile", "/profile"],
    ];

    return (
        <header className="sticky top-0 z-50 w-full grid grid-cols-12 items-center px-0 sm:px-4 bg-black text-white text-center tracking-widest shadow-md shadow-black">
            {/* homepage link */}
            <Link
                to="/"
                className="col-start-4 sm:col-start-1 col-span-6 sm:col-span-3 text-2xl lg:text-3xl font-bold text-primary hover:opacity-75"
            >
                <h1 className="py-3">Nat File</h1>
            </Link>

            {/* laptop links */}
            <ul className="col-span-6 lg:col-span-4 hidden sm:grid grid-cols-4 items-center text:lg lg:text-xl">
                {navLinks.map((navLink, index) => {
                    return (
                        <Link
                            key={index}
                            to={navLink[1]}
                            className="hover:opacity-75"
                        >
                            <li className="block py-3.5">{navLink[0]}</li>
                        </Link>
                    );
                })}
            </ul>

            <Link className="col-start-10 xl:col-start-11 col-span-3 xl:col-span-2 hidden sm:grid items-center py-3.5 text-lg lg:text-xl font-bold hover:opacity-75">
                Sign In / Up
            </Link>

            {/* mobile toggle */}
            <button
                className="block sm:hidden col-span-3 m-auto p-5 hover:opacity-75"
                onClick={() => {
                    setShowMenu(!showMenu);
                }}
            >
                <FaBars className="scale-150" />
            </button>

            {/* mobile links */}
            <ul
                className={`${
                    showMenu
                        ? "grid h-auto opacity-100"
                        : "hidden -h-10 opacity-0"
                } absolute w-full top-full col-span-full sm:hidden py-1 bg-black bg-opacity-75 text-lg tracking-[0.125rem] shadow-md shadow-black transition-all duration-300 ease-in-out`}
            >
                {navLinks.map((navLink, index) => {
                    return (
                        <Link
                            key={index}
                            to={navLink[1]}
                            className="hover:opacity-75"
                        >
                            <li className="py-2.5" key={index}>
                                {navLink[0]}
                            </li>
                        </Link>
                    );
                })}
                <Link className="py-2.5 hover:opacity-75">Sign In / Up</Link>
            </ul>
        </header>
    );
};

export default Header;
