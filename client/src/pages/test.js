import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import Globe from "react-globe.gl";

import { EarthInfoBox } from "../components/earth";

import axios from "axios";

const Test = () => {
    const globeDiv = useRef(null);

    const [locationData, setLocationData] = useState([]);

    // Gen random data
    const N = 30;
    const gData = [...Array(N).keys()].map(() => ({
        lat: (Math.random() - 0.5) * 180,
        lng: (Math.random() - 0.5) * 360,
        size: 7 + Math.random() * 30,
        color: ["red", "white", "blue", "green"][Math.round(Math.random() * 3)],
    }));

    const getNatData = async () => {
        const { status, data } = await axios.get(
            "https://api.inaturalist.org/v1/observations?photos=true&sounds=false&licensed=true&photo_licensed=true&license=cc-by-nc&photo_license=cc-by-nc&per_page=200&order=desc&order_by=created_at"
        );

        if (status === 200) {
            const locations = [];
            const { results } = data;

            for (const result of results) {
                try {
                    const { uri, observation_photos } = result;
                    const { coordinates } = result.geojson;
                    locations.push({
                        lat: coordinates[1],
                        lng: coordinates[0],
                        size: 30,
                        color: ["red", "white", "blue", "green"][
                            Math.round(Math.random() * 3)
                        ],
                        uri,
                        mainImage: observation_photos[0].photo.url,
                    });
                } catch (error) {}
            }
            console.log(locations);
            setLocationData(locations);
        }
    };

    useEffect(() => {
        getNatData();
    }, []);

    return (
        <div>
            <div
                ref={globeDiv}
                className="h-[650px] cursor-grab active:cursor-grabbing"
            >
                <Globe
                    globeImageUrl={
                        "//unpkg.com/three-globe/example/img/earth-night.jpg"
                    }
                    width={globeDiv.current?.offsetWidth}
                    height={globeDiv.current?.offsetHeight}
                    htmlElementsData={locationData}
                    htmlElement={(data) => {
                        const { color, size, uri, mainImage } = data;

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
                                    uri={uri}
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
        </div>
    );
};

export default Test;
