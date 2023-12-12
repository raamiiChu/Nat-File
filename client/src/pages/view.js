import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import Globe from "react-globe.gl";

import { EarthInfoBox } from "../components/earth";

import axios from "axios";

import Swal from "sweetalert2";

const View = () => {
    const globeDiv = useRef(null);

    const [perPage, setPerPage] = useState(100);
    const [locationData, setLocationData] = useState([]);

    const getNatData = async () => {
        Swal.fire({
            icon: "info",
            title: "Fetching Data Now",
            text: "Please wait...",
            showConfirmButton: false,
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            },
        });

        try {
            const { status, data } = await axios.get(
                `https://api.inaturalist.org/v1/observations?photos=true&sounds=false&licensed=true&photo_licensed=true&license=cc-by-nc&photo_license=cc-by-nc&per_page=${perPage}&order=desc&order_by=created_at`
            );

            if (status === 200) {
                const locations = [];
                const { results } = data;

                for (const result of results) {
                    try {
                        const { uri, user, taxon, observation_photos } = result;

                        const { coordinates } = result.geojson;
                        const { name, preferred_common_name } = taxon;
                        const mainImage =
                            observation_photos[0].photo.url.replace(
                                "square",
                                "medium"
                            );

                        locations.push({
                            name,
                            preferredCommonName: preferred_common_name,
                            user: user.login,
                            lat: coordinates[1],
                            lng: coordinates[0],
                            size: 30,
                            color: ["red", "white", "blue", "green"][
                                Math.round(Math.random() * 3)
                            ],
                            url: uri,
                            mainImage,
                        });
                    } catch (error) {}
                }
                console.log(locations);
                setLocationData(locations);
            }
        } catch (error) {}

        Swal.close();
    };

    useEffect(() => {
        getNatData();
    }, []);

    return (
        <main className="group grid grid-cols-12 pt-16">
            <form
                className="group-hover:opacity-100 opacity-0 fixed w-[30%] bottom-7 left-5 z-30 grid grid-cols-12 p-3 bg-white border border-solid border-black rounded-xl transition-all duration-300"
                onSubmit={(e) => {
                    e.preventDefault();
                    getNatData();
                }}
            >
                <div className="col-start-4 col-span-6 grid grid-cols-2 gap-5 px-4">
                    <div className="col-span-full flex justify-around">
                        <label htmlFor="perPage">per page: </label>
                        <input
                            type="number"
                            name="perPage"
                            id="perPage"
                            min={1}
                            max={200}
                            value={perPage}
                            className="text-center border border-solid border-black"
                            onChange={(e) => {
                                let newPage;
                                newPage = Math.max(1, e.target.value);
                                newPage = Math.min(e.target.value, 200);

                                setPerPage(newPage);
                            }}
                        />
                    </div>

                    <button
                        type="reset"
                        className="p-0.5 rounded-full bg-gray bg-opacity-30 hover:bg-black hover:text-primary transition-all duration-300"
                    >
                        Reset
                    </button>
                    <button
                        type="submit"
                        className="p-0.5 border-2 border-solid border-black rounded-full hover:bg-black hover:text-primary transition-all duration-300"
                    >
                        Submit
                    </button>
                </div>
            </form>

            <div
                ref={globeDiv}
                className="col-span-full max-h-[650px] cursor-grab active:cursor-grabbing"
            >
                <Globe
                    width={globeDiv.current?.offsetWidth}
                    height={globeDiv.current?.offsetHeight}
                    globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
                    bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
                    atmosphereAltitude={0.3}
                    htmlElementsData={locationData}
                    htmlElement={(data) => {
                        const {
                            name,
                            preferredCommonName,
                            user,
                            color,
                            size,
                            url,
                            mainImage,
                        } = data;

                        const el = document.createElement("div");

                        const markerSvg = `
                    <svg viewBox="-4 0 36 36">
                        <path fill="currentColor" d="M14,0 C21.732,0 28,5.641 28,12.6 C28,23.963 14,36 14,36 C14,36 0,24.064 0,12.6 C0,5.641 6.268,0 14,0 Z"></path>
                        <circle fill="black" cx="14" cy="14" r="7"></circle>
                    </svg>
                `;
                        el.innerHTML = markerSvg;
                        el.style.color = color;
                        el.style.width = `${size}px`;
                        el.style.position = "relative";

                        el.style["pointer-events"] = "auto";
                        el.style.cursor = "pointer";

                        el.onmouseenter = () => {
                            const infoBox = document.createElement("div");
                            ReactDOM.render(
                                <EarthInfoBox
                                    name={name}
                                    preferredCommonName={preferredCommonName}
                                    user={user}
                                    url={url}
                                    mainImage={mainImage}
                                />,
                                infoBox
                            );
                            el.appendChild(infoBox);
                        };

                        el.onmouseleave = () => {
                            el.removeChild(el.lastChild);
                        };

                        return el;
                    }}
                />
            </div>
        </main>
    );
};

export default View;
