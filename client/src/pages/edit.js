import React, { useEffect, useState, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

import { Responsive, WidthProvider } from "react-grid-layout";
import "../css/react-grid-layout.css";

import { Chart } from "react-google-charts";
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from "recharts";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faPlus,
    faFloppyDisk,
    faArrowRight,
    faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";

import fox from "../images/fox.jpg";

const ResponsiveGridLayout = WidthProvider(Responsive);

const Edit = () => {
    const data = [
        { name: "Page A", uv: 400, pv: 2400, amt: 2400 },
        { name: "Page B", uv: 800, pv: 2000, amt: 5000 },
    ];

    const [title, setTitle] = useState("");
    const [species, setSpecies] = useState("");
    const [file, setFile] = useState("");
    const [time, setTime] = useState("");

    // store div width and height
    const divRef = useRef(null);
    const [dimensions, setDimensions] = useState({
        width: 0,
        height: 0,
    });

    const loadFromDatabase = async () => {
        const res = await axios.get("http://localhost:3001/portfolio/load");
        const portfolio = res.data.Portfolios;

        if (portfolio.length !== 0) {
            const { images, layouts } = portfolio[0];
            localStorage.setItem("images", JSON.stringify(images));
            localStorage.setItem("layouts", JSON.stringify(layouts));
        }
    };

    const [layouts, setLayouts] = useState(() => {
        loadFromDatabase();
        const savedLayouts = JSON.parse(localStorage.getItem("layouts"));
        if (savedLayouts) {
            return savedLayouts;
        } else {
            return {
                lg: [
                    { i: "1", x: 0, y: 0, w: 1, h: 2 },
                    { i: "2", x: 1, y: 0, w: 3, h: 2 },
                    { i: "3", x: 4, y: 0, w: 1, h: 2 },
                ],
            };
        }
    });

    const [images, setImages] = useState(() => {
        const savedImages = JSON.parse(localStorage.getItem("images"));
        if (savedImages) {
            return savedImages;
        } else {
            return [];
        }
    });

    const saveCurrLayout = (layouts) => {
        setLayouts(layouts);
        localStorage.setItem("layouts", JSON.stringify(layouts));
    };

    const [isUploading, setIsUploading] = useState(false);

    const addImage = (e) => {
        // check the form
        if (!title || !species || !file) {
            return;
        }

        e.preventDefault();

        // reset form input
        e.target.reset();

        setIsUploading(false);
        setImages((prev) => {
            return [...prev, { id: uuidv4(), title, species, time, file }];
        });
    };

    const saveToDatabase = async (e) => {
        const res = await axios.post("http://localhost:3001/portfolio/save", {
            email: "jane23@fake.com",
            layouts,
            images,
        });

        if (res.status === 200) {
            alert("Save Successfully");
        }
    };

    useEffect(() => {
        if (divRef.current?.offsetHeight && divRef.current?.offsetWidth) {
            setDimensions({
                width: divRef.current.offsetWidth,
                height: divRef.current.offsetHeight,
            });
        }

        loadFromDatabase();
    }, []);

    useEffect(() => {
        localStorage.setItem("images", JSON.stringify(images));
    }, [images]);

    return (
        <main className="relative bg-[url('../images/edit-bg.jpg')] bg-cover bg-no-repeat bg-top">
            <section className="relative grid grid-cols-12 bg-white bg-opacity-20 h-[700px]">
                <div className="lg:col-start-2 col-span-full lg:col-span-10 grid grid-cols-12 mx-5 lg:mx-0 my-auto p-2 border-4 border-solid border-black border-opacity-[33%] rounded-2xl bg-white bg-opacity-[85%] h-[550px] overflow-y-scroll">
                    <ResponsiveGridLayout
                        className="layout col-span-full"
                        layouts={layouts}
                        breakpoints={{
                            lg: 1280,
                            md: 996,
                            sm: 640,
                            xs: 480,
                            xxs: 0,
                        }}
                        cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
                        onLayoutChange={(layout, layouts) => {
                            saveCurrLayout(layouts);
                        }}
                    >
                        <div
                            key="1"
                            className="border border-solid border-black cursor-grab active:cursor-grabbing"
                        >
                            1
                        </div>
                        <div
                            key="2"
                            className="border border-solid border-black cursor-grab active:cursor-grabbing"
                        >
                            <div className="w-1/2">
                                <img
                                    src={fox}
                                    alt="fox"
                                    className="block object-cover"
                                />
                            </div>
                            <article>
                                <h2>Name: Fox</h2>
                                <p>Time: {new Date().toDateString()}</p>
                                <h3>Species: Fox</h3>
                            </article>
                        </div>
                        <div
                            key="3"
                            className="border border-solid border-black cursor-grab active:cursor-grabbing"
                        >
                            3
                        </div>
                        {images.map((image) => {
                            const { id, title, species, time, file } = image;

                            return (
                                <div
                                    key={id}
                                    className="relative border border-solid border-black cursor-grab active:cursor-grabbing"
                                >
                                    <div className="w-1/2">
                                        <img
                                            src={file}
                                            alt="fox"
                                            className="block object-cover"
                                        />
                                    </div>
                                    <article>
                                        <h2>Name: {title}</h2>
                                        <p>Time: {time}</p>
                                        <h3>Species: {species}</h3>
                                    </article>

                                    <button
                                        className="absolute z-10 -right-5 -top-5 w-8 h-8 border border-solid border-black"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            e.preventDefault();
                                            setImages(
                                                images.filter((image) => {
                                                    return image.id !== id;
                                                })
                                            );
                                        }}
                                    >
                                        X
                                    </button>
                                </div>
                            );
                        })}
                    </ResponsiveGridLayout>
                </div>

                {/* btns */}
                <div className="absolute z-10 bottom-[13%] sm:bottom-[15%] right-[10%] sm:right-[5%] lg:right-[12%] flex gap-x-2 sm:gap-x-4">
                    <button
                        title="Upload Image"
                        className="w-12 h-12 bg-black rounded-full scale-75 sm:scale-90 lg:scale-100 hover:opacity-75"
                        onClick={() => {
                            setIsUploading(true);
                        }}
                    >
                        <FontAwesomeIcon
                            icon={faPlus}
                            style={{ color: "#ffffff" }}
                            size="xl"
                        />
                    </button>
                    <button
                        title="Save"
                        className="w-12 h-12 bg-black rounded-full scale-75 sm:scale-90 lg:scale-100 hover:opacity-75"
                        onClick={(e) => {
                            saveToDatabase(e);
                        }}
                    >
                        <FontAwesomeIcon
                            icon={faFloppyDisk}
                            style={{ color: "#ffffff" }}
                            size="xl"
                        />
                    </button>
                </div>
            </section>

            {/* upload image */}
            <section
                id="test"
                className={`${
                    isUploading ? "block" : "hidden"
                } absolute top-0 left-0 z-30 w-full h-full flex justify-center items-center bg-black bg-opacity-50`}
                onClick={() => {
                    setIsUploading(false);
                }}
            >
                <div
                    className="w-4/12 mx-auto py-4 bg-white text-center"
                    onClick={(e) => {
                        e.stopPropagation();
                    }}
                >
                    <h2 className="text-xl py-3">Upload Your Image</h2>
                    <form
                        className="w-8/12 mx-auto flex flex-col justify-center gap-y-2"
                        onSubmit={(e) => {
                            addImage(e);
                        }}
                    >
                        <div className="flex justify-between">
                            <label htmlFor="title">Title</label>
                            <input
                                type="text"
                                name="title"
                                id="title"
                                className="form-input border-2 border-black rounded-md focus:outline-none"
                                required
                                onChange={(e) => {
                                    setTitle(e.target.value);
                                }}
                            />
                        </div>

                        <div className="flex justify-between">
                            <label htmlFor="species">Species</label>
                            <input
                                type="text"
                                name="species"
                                id="species"
                                className="form-input border-2 border-black rounded-md focus:outline-none"
                                required
                                onChange={(e) => {
                                    setSpecies(e.target.value);
                                }}
                            />
                        </div>

                        <div className="flex justify-between">
                            <label htmlFor="image">Image</label>
                            <input
                                type="file"
                                name="image"
                                id="image"
                                className="form-input border-2 border-black rounded-md focus:outline-none"
                                required
                                onChange={(e) => {
                                    setTime(
                                        e.target.files[0].lastModifiedDate.toDateString()
                                    );
                                    setFile(
                                        URL.createObjectURL(e.target.files[0])
                                    );
                                }}
                            />
                        </div>

                        <button
                            type="submit"
                            className="px-3 py-1 border border-solid border-black rounded-full"
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </section>

            <section className="pt-10 sm:pt-12 lg:pt-16 bg-black text-white">
                <div className="grid grid-cols-12 items-center">
                    <hr className="col-start-2 lg:col-start-3 col-span-3 h-0.5 sm:h-1 bg-primary" />
                    <h2 className="col-span-4 lg:col-span-2 text-2xl sm:text-3xl lg:text-4xl text-center font-bold text-primary">
                        Chart
                    </h2>
                    <hr className="col-span-3 h-0.5 sm:h-1 bg-primary" />
                </div>

                <div className="relative group grid grid-cols-12 items-center py-16">
                    <div className="col-start-2 col-span-10 grid grid-cols-1 lg:grid-cols-2">
                        <section className="grid grid-cols-12 gap-y-6">
                            <p className="col-span-full">
                                Lorem ipsum dolor sit amet consectetur,
                                adipisicing elit. Eligendi eveniet labore
                                repellendus perspiciatis ad dignissimos, non
                                dicta quisquam modi itaque nisi quibusdam quod,
                            </p>

                            <div
                                ref={divRef}
                                className="col-start-2 col-span-10 flex justify-center h-[200px] "
                            >
                                <LineChart
                                    width={dimensions.width}
                                    height={dimensions.height}
                                    data={data}
                                >
                                    <Line
                                        type="monotone"
                                        dataKey="uv"
                                        stroke="#8884d8"
                                    />
                                    <CartesianGrid stroke="#ccc" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                </LineChart>
                            </div>
                        </section>

                        <section className="hidden lg:grid grid-cols-12 gap-y-6">
                            <p className="col-span-full">
                                Lorem ipsum dolor sit amet consectetur,
                                adipisicing elit. Eligendi eveniet labore
                                repellendus perspiciatis ad dignissimos, non
                                dicta quisquam modi itaque nisi quibusdam quod,
                            </p>

                            <div className="col-start-2 col-span-10 border border-solid border-white">
                                <Chart
                                    chartType="PieChart"
                                    data={[
                                        ["Task", "Hours per Day"],
                                        ["Work", 11],
                                        ["Eat", 2],
                                        ["Commute", 2],
                                        ["Watch TV", 2],
                                        ["Sleep", 7],
                                    ]}
                                    options={{
                                        title: "My Daily Activities",
                                    }}
                                    className=""
                                />
                            </div>
                        </section>
                    </div>

                    <button
                        title="Previous"
                        className="absolute hidden group-hover:block left-4 w-12 h-12 mx-auto bg-primary rounded-full scale-75 sm:scale-90 lg:scale-100 opacity-50 hover:opacity-100 transition-all duration-300"
                    >
                        <FontAwesomeIcon
                            icon={faArrowLeft}
                            style={{ color: "#0B1D27" }}
                            size="xl"
                        />
                    </button>
                    <button
                        title="Next"
                        className="absolute hidden group-hover:block right-4 w-12 h-12 mx-auto bg-primary rounded-full scale-75 sm:scale-90 lg:scale-100 opacity-50 hover:opacity-100 transition-all duration-300"
                    >
                        <FontAwesomeIcon
                            icon={faArrowRight}
                            style={{ color: "#0B1D27" }}
                            size="xl"
                        />
                    </button>
                </div>
            </section>
        </main>
    );
};

export default Edit;
