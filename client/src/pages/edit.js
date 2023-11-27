import React, { useState, useEffect } from "react";

const Edit = () => {
    return (
        <main className="bg-[url('../images/edit-bg.jpg')] bg-cover bg-no-repeat bg-top">
            <section className="bg-white bg-opacity-20 h-[1100px]"></section>

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
