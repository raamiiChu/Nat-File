import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import axios from "axios";

import { Board, OpenImage } from "../components/share";

import { ChartContainer } from "../components/chart";

const Share = () => {
    // redux
    const { backendUrl } = useSelector((state) => state.urlSlice);
    const { isOpeningImage } = useSelector((state) => state.shareSlice);

    // params
    const { publicId } = useParams();

    // state
    const [images, setImages] = useState([]);
    const [layouts, setLayouts] = useState({});

    const getPortfolio = async () => {
        try {
            const { status, data } = await axios.get(
                `${backendUrl}/portfolio/share/${publicId}`
            );

            if (status === 200) {
                const { images, layouts } = data;
                setImages(images);
                setLayouts(layouts);
            }
        } catch (error) {
            const { status } = error.response;

            if (status === 404) {
                console.log("no found");
            }

            if (status === 500) {
                console.log("DB Error");
            }
        }
    };

    useEffect(() => {
        getPortfolio();
    }, []);

    return (
        <main className="pt-16 relative bg-fixed bg-[url('../images/edit-bg.jpg')] bg-cover bg-no-repeat bg-top">
            <Board images={images} layouts={layouts} />

            <ChartContainer images={images} />

            {isOpeningImage && <OpenImage />}
        </main>
    );
};

export default Share;
