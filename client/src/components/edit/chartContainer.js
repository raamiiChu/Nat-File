import React, { useState, useEffect } from "react";

import { useSelector } from "react-redux";

import { format } from "date-fns";

import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

import Chart from "./chart";

const ChartContainer = () => {
    const { images } = useSelector((state) => state.portfolioSlice);

    const [dataTime, setDataTime] = useState([]);
    const [dataSpecies, setDataSpecies] = useState([]);
    const [dataAperture, setDataAperture] = useState([]);
    const [dataShutter, setDataShutter] = useState([]);
    const [dataIso, setDataIso] = useState([]);
    const [dataFocalLength, setDataFocalLength] = useState([]);

    useEffect(() => {
        const allTimes = {};
        const allSpecies = {};
        const allAperture = {};
        const allShutter = {};
        const allIso = {};
        const allFocalLength = {};

        for (const image of images) {
            const { time, species, aperture, shutter, iso, focalLength } =
                image;

            console.log(time);
            console.log(new Date(time));
            const formattedDate = format(new Date(time), "yyyy / hh / mm");
            if (!allTimes[formattedDate]) {
                allTimes[formattedDate] = 1;
            } else {
                allTimes[formattedDate] += 1;
            }

            if (!allSpecies[species]) {
                allSpecies[species] = 1;
            } else {
                allSpecies[species] += 1;
            }

            const formattedAperture = `f ${aperture}`;
            if (!allAperture[formattedAperture]) {
                allAperture[formattedAperture] = 1;
            } else {
                allAperture[formattedAperture] += 1;
            }

            const formattedShutter = `1 / ${shutter}`;
            if (!allShutter[formattedShutter]) {
                allShutter[formattedShutter] = 1;
            } else {
                allShutter[formattedShutter] += 1;
            }

            if (!allIso[iso]) {
                allIso[iso] = 1;
            } else {
                allIso[iso] += 1;
            }

            const formattedFocalLength = `${focalLength} mm`;
            if (!allFocalLength[formattedFocalLength]) {
                allFocalLength[formattedFocalLength] = 1;
            } else {
                allFocalLength[formattedFocalLength] += 1;
            }
        }

        const newDataTime = Object.entries(allTimes).map(([key, value]) => {
            return { name: key, value };
        });

        const newDataSpecies = Object.entries(allSpecies).map(
            ([key, value]) => {
                return { name: key, value };
            }
        );

        const newDataAperture = Object.entries(allAperture).map(
            ([key, value]) => {
                return { name: key, value };
            }
        );

        const newDataShutter = Object.entries(allShutter).map(
            ([key, value]) => {
                return { name: key, value };
            }
        );

        const newDataIso = Object.entries(allIso).map(([key, value]) => {
            return { name: key, value };
        });

        const newDataFocalLength = Object.entries(allFocalLength).map(
            ([key, value]) => {
                return { name: key, value };
            }
        );

        setDataTime(newDataTime);
        setDataSpecies(newDataSpecies);
        setDataAperture(newDataAperture);
        setDataShutter(newDataShutter);
        setDataIso(newDataIso);
        setDataFocalLength(newDataFocalLength);
    }, [images]);

    return (
        <section className="pt-10 sm:pt-12 lg:pt-16 bg-black text-white">
            <div className="grid grid-cols-12 items-center">
                <hr className="col-start-2 lg:col-start-3 col-span-3 border sm:border-2 border-primary" />
                <h2 className="col-span-4 lg:col-span-2 text-2xl sm:text-3xl lg:text-4xl text-center tracking-wider font-bold text-primary">
                    Chart
                </h2>
                <hr className="col-span-3 border sm:border-2 border-primary" />
            </div>

            <div className="relative group grid grid-cols-12 items-center py-16">
                <div className="col-start-2 col-span-10 grid grid-cols-1 lg:grid-cols-2">
                    <Chart title={"Time"} data={dataTime} />
                    <Chart title={"Species"} data={dataSpecies} />
                    <Chart title={"Aperture"} data={dataAperture} />
                    <Chart title={"Shutter"} data={dataShutter} />
                    <Chart title={"ISO"} data={dataIso} />
                    <Chart title={"Focal Length"} data={dataFocalLength} />
                </div>

                {/* <button
                    title="Previous"
                    className="absolute hidden group-hover:block left-4 w-12 h-12 mx-auto text-black bg-primary rounded-full scale-75 sm:scale-90 lg:scale-100 opacity-50 hover:opacity-100 transition-all duration-300"
                >
                    <FaArrowLeft className="mx-auto scale-150" />
                </button>
                <button
                    title="Next"
                    className="absolute hidden group-hover:block right-4 w-12 h-12 mx-auto text-black bg-primary rounded-full scale-75 sm:scale-90 lg:scale-100 opacity-50 hover:opacity-100 transition-all duration-300"
                >
                    <FaArrowRight className="mx-auto scale-150" />
                </button> */}
            </div>
        </section>
    );
};

export default ChartContainer;
