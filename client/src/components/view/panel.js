import React, { useState } from "react";

const Panel = ({
    page,
    setPage,
    perPage,
    setPerPage,
    setTaxonName,
    setUserId,
    refetch,
}) => {
    const [showPrevNext, setShowPrevNext] = useState(false);

    return (
        <form
            className="fixed w-11/12 md:w-7/12 xl:w-4/12 bottom-5 left-1/2 md:left-5 -translate-x-1/2 md:-translate-x-0 z-30 grid grid-cols-12 p-3 bg-white border border-solid border-black rounded-xl opacity-10 hover:opacity-100 transition-all duration-300"
            onSubmit={(e) => {
                e.preventDefault();
                setPage(1);

                refetch();
            }}
        >
            <ul className="col-start-1 sm:col-start-2 col-span-full sm:col-span-10 grid grid-cols-2 gap-5 px-4">
                <li className="col-span-full grid grid-cols-2">
                    <label htmlFor="perPage">Num of Data: </label>
                    <div className="grid grid-cols-12">
                        <button
                            className="col-span-2 md:col-span-3 border border-e-0 border-solid border-black bg-slate-100 hover:bg-slate-300 disabled:bg-red-200 disabled:cursor-not-allowed"
                            onClick={(e) => {
                                e.preventDefault();
                                setPerPage(Math.max(1, perPage - 1));
                            }}
                            disabled={perPage <= 1}
                        >
                            -
                        </button>
                        <input
                            type="number"
                            name="perPage"
                            id="perPage"
                            min={1}
                            max={200}
                            value={perPage}
                            className="form-input col-span-8 md:col-span-6 py-0.5 text-center border-y border-solid border-black focus:outline-none"
                            onChange={(e) => {
                                e.preventDefault();
                                let newPage;
                                newPage = Math.max(1, e.target.value);
                                newPage = Math.min(e.target.value, 200);

                                setPerPage(newPage);
                            }}
                        />
                        <button
                            className="col-span-2 md:col-span-3 border border-s-0 border-solid border-black bg-slate-100 hover:bg-slate-300 disabled:bg-red-200 disabled:cursor-not-allowed"
                            onClick={(e) => {
                                e.preventDefault();
                                setPerPage(Math.min(perPage + 1, 200));
                            }}
                            disabled={perPage >= 200}
                        >
                            +
                        </button>
                    </div>
                </li>

                <li className="col-span-full grid grid-cols-2">
                    <label htmlFor="taxonName">Taxon Name: </label>
                    <input
                        type="text"
                        name="taxonName"
                        id="taxonName"
                        className="form-input py-0.5 indent-2 border border-solid border-black rounded-xl focus:outline-none focus:border-blue-400 focus:shadow-blur focus:shadow-blue-100"
                        onChange={(e) => {
                            e.preventDefault();
                            setTaxonName(e.target.value);
                        }}
                    />
                </li>

                <li className="col-span-full grid grid-cols-2">
                    <label htmlFor="userId">User: </label>
                    <input
                        type="text"
                        name="userId"
                        id="userId"
                        className="form-input py-0.5 indent-2 border border-solid border-black rounded-xl focus:outline-none focus:border-blue-400 focus:shadow-blur focus:shadow-blue-100"
                        onChange={(e) => {
                            e.preventDefault();
                            setUserId(e.target.value);
                        }}
                    />
                </li>

                <nav className="col-span-full gap-3 grid grid-cols-4 text-sm sm:text-base">
                    <button
                        type="reset"
                        className="p-0.5 rounded-full bg-gray bg-opacity-20 hover:bg-black hover:text-white transition-all duration-300"
                        onClick={(e) => {
                            setShowPrevNext(false);
                            setPage(1);
                            setPerPage(100);
                            setTaxonName("");
                            refetch();
                        }}
                    >
                        Reset
                    </button>
                    <button
                        type="submit"
                        className="p-0.5 border border-solid border-black rounded-full hover:bg-black hover:text-primary transition-all duration-300"
                        onClick={(e) => {
                            setShowPrevNext(true);
                        }}
                    >
                        Submit
                    </button>
                    {showPrevNext && (
                        <button
                            className="p-0.5 rounded-full border border-solid border-black hover:border-none hover:bg-indigo-600 hover:text-white transition-all duration-300"
                            onClick={(e) => {
                                e.preventDefault();

                                setPage(Math.max(1, page - 1));
                                refetch();
                            }}
                        >
                            Prev
                        </button>
                    )}
                    {showPrevNext && (
                        <button
                            className="p-0.5 rounded-full border border-solid border-black hover:border-none hover:bg-indigo-600 hover:text-white transition-all duration-300"
                            onClick={(e) => {
                                e.preventDefault();

                                setPage(page + 1);
                                refetch();
                            }}
                        >
                            Next
                        </button>
                    )}
                </nav>
            </ul>
        </form>
    );
};

export default Panel;
