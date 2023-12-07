import React, { useState, useEffect, useRef } from "react";

import { useSelector } from "react-redux";

import { PieChart, Pie, Sector, ResponsiveContainer, Cell } from "recharts";

import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#F1092A",
    "#c4ffe4",
];

const renderActiveShape = (props) => {
    const RADIAN = Math.PI / 180;
    const {
        cx,
        cy,
        midAngle,
        innerRadius,
        outerRadius,
        startAngle,
        endAngle,
        fill,
        payload,
        percent,
        value,
    } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? "start" : "end";

    return (
        <g>
            <text x={cx} y={cy} dy={8} textAnchor="middle" fill={"#FFEAA1"}>
                {payload.name}
            </text>
            <Sector
                cx={cx}
                cy={cy}
                innerRadius={innerRadius}
                outerRadius={outerRadius}
                startAngle={startAngle}
                endAngle={endAngle}
                fill={fill}
            />
            <Sector
                cx={cx}
                cy={cy}
                startAngle={startAngle}
                endAngle={endAngle}
                innerRadius={outerRadius + 6}
                outerRadius={outerRadius + 10}
                fill={fill}
            />
            <path
                d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
                stroke={fill}
                fill="none"
            />
            <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
            <text
                x={ex + (cos >= 0 ? 1 : -1) * 12}
                y={ey}
                textAnchor={textAnchor}
                fill="#FFF"
            >{`${payload.name}: ${value}`}</text>
            <text
                x={ex + (cos >= 0 ? 1 : -1) * 12}
                y={ey}
                dy={18}
                textAnchor={textAnchor}
                fill="#999"
            >
                {`(${(percent * 100).toFixed(1)}%)`}
            </text>
        </g>
    );
};

const ChartContainer = () => {
    const { images } = useSelector((state) => state.portfolioSlice);

    const [showPie, setShowPie] = useState(true);
    const [scrollY, setScrollY] = useState(0);
    const [dataTime, setDataTime] = useState([]);
    const [dataSpecies, setDataSpecies] = useState([]);

    const pieRef = useRef(null);

    const [activeIndex, setActiveIndex] = useState(0);
    const [activeIndex2, setActiveIndex2] = useState(0);

    const onPieEnter = (_, index) => {
        setActiveIndex(index);
    };

    const onPieEnter2 = (_, index) => {
        setActiveIndex2(index);
    };
    const handleScroll = () => {
        setScrollY(window.scrollY);
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    useEffect(() => {
        const allTimes = {};
        const allSpecies = {};

        for (const image of images) {
            const { time, species } = image;

            const date = new Date(time);
            const formattedDate = `${date.getFullYear()} / ${
                date.getMonth() + 1
            } / ${date.getDate()}`;
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
        }

        const newDataTime = Object.entries(allTimes).map(([key, value]) => {
            return { name: key, value };
        });

        const newDataSpecies = Object.entries(allSpecies).map(
            ([key, value]) => {
                return { name: key, value };
            }
        );

        setDataTime(newDataTime);
        setDataSpecies(newDataSpecies);
    }, [images]);

    useEffect(() => {
        const height = pieRef.current?.current?.offsetHeight;
        setShowPie(height < scrollY / 2 + 50);
    }, [scrollY]);

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

                        <div className="col-start-2 col-span-10 flex justify-center h-[350px] ">
                            <ResponsiveContainer
                                ref={pieRef}
                                width={"100%"}
                                height={"100%"}
                            >
                                {showPie && (
                                    <PieChart>
                                        <Pie
                                            activeIndex={activeIndex}
                                            activeShape={renderActiveShape}
                                            data={dataTime}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={75}
                                            outerRadius={100}
                                            fill="#8884d8"
                                            dataKey="value"
                                            onMouseEnter={(e, index) => {
                                                onPieEnter(e, index);
                                            }}
                                        >
                                            {dataTime.map((entry, index) => (
                                                <Cell
                                                    key={`cell-${index}`}
                                                    fill={
                                                        COLORS[
                                                            index %
                                                                COLORS.length
                                                        ]
                                                    }
                                                />
                                            ))}
                                        </Pie>
                                    </PieChart>
                                )}
                            </ResponsiveContainer>
                        </div>
                    </section>

                    <section className="hidden lg:grid grid-cols-12 gap-y-6">
                        <p className="col-span-full">
                            Lorem ipsum dolor sit amet consectetur, adipisicing
                            elit. Eligendi eveniet labore repellendus
                            perspiciatis ad dignissimos, non dicta quisquam modi
                            itaque nisi quibusdam quod,
                        </p>

                        <div className="col-start-2 col-span-10 flex justify-center h-[350px] ">
                            <ResponsiveContainer width={"100%"} height={"100%"}>
                                {showPie && (
                                    <PieChart>
                                        <Pie
                                            activeIndex={activeIndex2}
                                            activeShape={renderActiveShape}
                                            data={dataSpecies}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={75}
                                            outerRadius={100}
                                            fill="#8884d8"
                                            dataKey="value"
                                            onMouseEnter={(e, index) => {
                                                onPieEnter2(e, index);
                                            }}
                                        >
                                            {dataSpecies.map((entry, index) => (
                                                <Cell
                                                    key={`cell-${index}`}
                                                    fill={
                                                        COLORS[
                                                            index %
                                                                COLORS.length
                                                        ]
                                                    }
                                                />
                                            ))}
                                        </Pie>
                                    </PieChart>
                                )}
                            </ResponsiveContainer>
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
