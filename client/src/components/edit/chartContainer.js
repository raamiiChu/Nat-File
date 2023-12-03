import React, { useState, useEffect, useRef } from "react";

import { Chart } from "react-google-charts";
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from "recharts";

import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const ChartContainer = () => {
    const data = [
        { name: "Page A", uv: 400, pv: 2400, amt: 2400 },
        { name: "Page B", uv: 800, pv: 2000, amt: 5000 },
    ];

    const divRef = useRef(null);
    const [dimensions, setDimensions] = useState({
        width: 0,
        height: 0,
    });

    useEffect(() => {
        if (divRef.current?.offsetHeight && divRef.current?.offsetWidth) {
            setDimensions({
                width: divRef.current.offsetWidth,
                height: divRef.current.offsetHeight,
            });
        }
    }, []);

    return (
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
                            Lorem ipsum dolor sit amet consectetur, adipisicing
                            elit. Eligendi eveniet labore repellendus
                            perspiciatis ad dignissimos, non dicta quisquam modi
                            itaque nisi quibusdam quod,
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
                            Lorem ipsum dolor sit amet consectetur, adipisicing
                            elit. Eligendi eveniet labore repellendus
                            perspiciatis ad dignissimos, non dicta quisquam modi
                            itaque nisi quibusdam quod,
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
                    className="absolute hidden group-hover:block left-4 w-12 h-12 mx-auto text-black bg-primary rounded-full scale-75 sm:scale-90 lg:scale-100 opacity-50 hover:opacity-100 transition-all duration-300"
                >
                    <FaArrowLeft className="mx-auto scale-150" />
                </button>
                <button
                    title="Next"
                    className="absolute hidden group-hover:block right-4 w-12 h-12 mx-auto text-black bg-primary rounded-full scale-75 sm:scale-90 lg:scale-100 opacity-50 hover:opacity-100 transition-all duration-300"
                >
                    <FaArrowRight className="mx-auto scale-150" />
                </button>
            </div>
        </section>
    );
};

export default ChartContainer;
