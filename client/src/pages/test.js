import React, { useState } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import "../css/react-grid-layout.css";

const ResponsiveGridLayout = WidthProvider(Responsive);
const Test = () => {
    const [layouts, setLayouts] = useState(() => {
        const savedLayouts = JSON.parse(localStorage.getItem("layouts"));
        if (savedLayouts) {
            return savedLayouts;
        } else {
            return [
                { i: "1", x: 0, y: 0, w: 1, h: 2 },
                { i: "2", x: 1, y: 0, w: 3, h: 2 },
                { i: "3", x: 4, y: 0, w: 1, h: 2 },
            ];
        }
    });

    const saveCurrLayout = (layout) => {
        setLayouts(layout);
        localStorage.setItem("layouts", JSON.stringify(layout));
    };

    return (
        <>
            <ResponsiveGridLayout
                className="layout"
                layouts={{ lg: layouts }}
                breakpoints={{
                    lg: 1200,
                    md: 996,
                    sm: 768,
                    xs: 480,
                    xxs: 0,
                }}
                cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
                onLayoutChange={(layout) => {
                    saveCurrLayout(layout);
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
                    2
                </div>
                <div
                    key="3"
                    className="border border-solid border-black cursor-grab active:cursor-grabbing"
                >
                    3
                </div>
            </ResponsiveGridLayout>
        </>
    );
};

export default Test;
