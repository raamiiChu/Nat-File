import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { Responsive, WidthProvider } from "react-grid-layout";
import "../css/react-grid-layout.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faFloppyDisk } from "@fortawesome/free-solid-svg-icons";

import fox from "../images/fox.jpg";

const ResponsiveGridLayout = WidthProvider(Responsive);

const Edit = () => {
    const [title, setTitle] = useState("");
    const [species, setSpecies] = useState("");
    const [file, setFile] = useState("");
    const [time, setTime] = useState("");

    const [layouts, setLayouts] = useState(() => {
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

    useEffect(() => {
        localStorage.setItem("images", JSON.stringify(images));
    }, [images]);

    return (
        <main className="relative bg-[url('../images/edit-bg.jpg')] bg-cover bg-no-repeat bg-top">
            <section className="relative grid grid-cols-12 bg-white bg-opacity-20 h-[1100px]">
                <div className="col-start-2 col-span-10 grid grid-cols-12 my-auto bg-white bg-opacity-20 h-[650px] overflow-y-scroll">
                    <ResponsiveGridLayout
                        className="layout col-span-full"
                        layouts={layouts}
                        breakpoints={{
                            lg: 1200,
                        }}
                        cols={{ lg: 12 }}
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
                <div className="absolute z-10 bottom-64 right-40 flex gap-x-4">
                    <button
                        title="Upload Image"
                        className="w-12 h-12 bg-black rounded-full hover:opacity-75"
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
                        className="w-12 h-12 bg-black rounded-full hover:opacity-75"
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

            <section className="pt-16 bg-black text-white">
                <div className="grid grid-cols-12 items-center">
                    <hr className="col-start-3 col-span-3 h-1 bg-primary" />
                    <h2 className="col-span-2 text-6xl text-center font-bold text-primary">
                        Chart
                    </h2>
                    <hr className="col-span-3 h-1 bg-primary" />
                </div>
            </section>
        </main>
    );
};

export default Edit;
