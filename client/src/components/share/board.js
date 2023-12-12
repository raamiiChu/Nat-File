import React from "react";
import BoardItem from "./boradItem";

import { Responsive, WidthProvider } from "react-grid-layout";

const ResponsiveGridLayout = WidthProvider(Responsive);

const Board = ({ images, layouts }) => {
    return (
        <section className="relative grid grid-cols-12 my-12 min-h-[700px]">
            <div className="lg:col-start-2 col-span-full lg:col-span-10 grid grid-cols-12 mx-5 lg:mx-0 my-auto p-2 border-4 border-solid border-black border-opacity-[33%] rounded-2xl bg-white bg-opacity-[85%] min-h-[550px] overflow-x-scroll">
                <ResponsiveGridLayout
                    className="layout col-span-full min-w-[1200px] "
                    layouts={layouts}
                    breakpoints={{
                        lg: 0,
                    }}
                    cols={{ lg: 6 }}
                    resizeHandles={[]}
                    margin={[20, 50]}
                    containerPadding={[20, 20]}
                    rowHeight={140}
                    draggableCancel=".not-draggable"
                >
                    {images?.map((image) => {
                        const { id } = image;

                        return (
                            <div
                                key={id}
                                className="group not-draggable relative p-3 border-2 border-solid border-black border-opacity-50 rounded-3xl shadow-lg bg-white"
                            >
                                <BoardItem image={image} layouts={layouts} />
                            </div>
                        );
                    })}
                </ResponsiveGridLayout>
            </div>
        </section>
    );
};

export default Board;
