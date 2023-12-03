import React from "react";

import { ChartContainer, Board, UploadImage } from "../components/edit";

const Edit = () => {
    return (
        <main className="relative bg-[url('../images/edit-bg.jpg')] bg-cover bg-no-repeat bg-top">
            <Board />

            {/* upload image */}
            <UploadImage />

            <ChartContainer />
        </main>
    );
};

export default Edit;
