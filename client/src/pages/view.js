import React, { useState, useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import ReactDOM from "react-dom";

import Globe from "react-globe.gl";

import { EarthInfoBox } from "../components/earth";
import { Panel } from "../components/view";

import axios from "axios";

import Swal from "sweetalert2";

const iNatApiUrl =
    "https://api.inaturalist.org/v1/observations?geo=true&photos=true&sounds=false&licensed=true&photo_licensed=true&license=cc-by-nc&photo_license=cc-by-nc&order=desc&order_by=created_at";

const View = () => {
    const globeDiv = useRef(null);
    const [width, setWidth] = useState(window.innerWidth);
    const [height, setHeight] = useState(700);

    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(100);
    const [taxonName, setTaxonName] = useState("");
    const [userId, setUserId] = useState("");

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
                `${iNatApiUrl}&user_id=${userId}&taxon_name=${taxonName}&page=${page}&per_page=${perPage}`
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

                Swal.close();
                return locations;
            }
        } catch (error) {
            Swal.close();
        }
    };

    const { data: locations, refetch } = useQuery({
        queryFn: getNatData,
        queryKey: ["iNatData"],
        staleTime: Infinity,
    });

    const handleResize = () => {
        const newWidth = globeDiv.current?.offsetWidth;
        const newHeight = globeDiv.current?.offsetHeight;
        setWidth(newWidth);
        setHeight(newHeight);
    };

    useEffect(() => {
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <main className="group grid grid-cols-12 pt-16 overflow-hidden">
            <Panel
                page={page}
                setPage={setPage}
                perPage={perPage}
                setPerPage={setPerPage}
                setTaxonName={setTaxonName}
                setUserId={setUserId}
                refetch={refetch}
            />

            <div
                ref={globeDiv}
                className="col-span-full max-h-[95vh] cursor-grab active:cursor-grabbing"
            >
                <Globe
                    width={width}
                    height={height}
                    globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
                    bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
                    backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
                    atmosphereAltitude={0.3}
                    htmlElementsData={locations}
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

                        console.log(preferredCommonName);
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
