import React, { useState, useEffect, useRef } from "react";

import { PieChart, Pie, Sector, ResponsiveContainer, Cell } from "recharts";

import {
    LineChart,
    Line,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
} from "recharts";

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
            <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
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
                fill="#333"
            >{`PV ${value}`}</text>
            <text
                x={ex + (cos >= 0 ? 1 : -1) * 12}
                y={ey}
                dy={18}
                textAnchor={textAnchor}
                fill="#999"
            >
                {`(Rate ${(percent * 100).toFixed(2)}%)`}
            </text>
        </g>
    );
};

const Test = () => {
    const COLORS = [
        "#0088FE",
        "#00C49F",
        "#FFBB28",
        "#FF8042",
        "#F1092A",
        "#c4ffe4",
    ];
    const data = [
        { name: "Page A", uv: 400, pv: 2400, amt: 2400 },
        { name: "Page B", uv: 800, pv: 1200, amt: 5000 },
        { name: "Page C", uv: 490, pv: 390, amt: 2500 },
        { name: "Page D", uv: 30, pv: 780, amt: 5430 },
        { name: "Page E", uv: 960, pv: 1200, amt: 3480 },
    ];

    const data2 = [
        { name: "Group A", value: 321 },
        { name: "Group B", value: 921 },
        { name: "Group C", value: 549 },
        { name: "Group D", value: 329 },
        { name: "Group E", value: 321 },
        { name: "Group F", value: 574 },
    ];

    const [showPie, setShowPie] = useState(false);
    const [scrollY, setScrollY] = useState(0);

    const divRef = useRef(null);
    const pieRef = useRef(null);
    const [dimensions, setDimensions] = useState({
        width: 0,
        height: 0,
    });

    const handleScroll = () => {
        setScrollY(window.scrollY);
    };

    useEffect(() => {
        if (divRef.current?.offsetHeight && divRef.current?.offsetWidth) {
            setDimensions({
                width: divRef.current.offsetWidth,
                height: divRef.current.offsetHeight,
            });
        }

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const [activeIndex, setActiveIndex] = useState(0);

    const onPieEnter = (_, index) => {
        setActiveIndex(index);
    };

    useEffect(() => {
        const top = pieRef.current?.current?.offsetTop;
        const height = pieRef.current?.current?.offsetHeight;

        setShowPie(top - height + 100 < scrollY);
    }, [scrollY]);

    return (
        <div className="h-[500px] w-10/12 mx-auto mt-10">
            <ResponsiveContainer ref={divRef} width="100%" height="100%">
                <LineChart data={data}>
                    <Line type="monotone" dataKey="uv" stroke="#8884d8" />
                    <CartesianGrid stroke="#ccc" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                </LineChart>
            </ResponsiveContainer>

            <button
                className="border border-solid border-black"
                onClick={() => {
                    setShowPie(!showPie);
                }}
            >
                Show Pie
            </button>
            <ResponsiveContainer ref={pieRef} width="100%" height="100%">
                {showPie && (
                    <PieChart>
                        <Pie
                            activeIndex={activeIndex}
                            activeShape={renderActiveShape}
                            data={data2}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                            onMouseEnter={(e, index) => {
                                onPieEnter(e, index);
                            }}
                        >
                            {data.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={COLORS[index % COLORS.length]}
                                />
                            ))}
                        </Pie>
                    </PieChart>
                )}
            </ResponsiveContainer>
        </div>
    );
};

export default Test;
