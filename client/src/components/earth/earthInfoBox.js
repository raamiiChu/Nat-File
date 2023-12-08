import React from "react";

const EarthInfoBox = ({ uri, mainImage }) => {
    return (
        <a href={uri} target="_blank" rel="noreferrer">
            <div className="absolute -bottom-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 text-black bg-white border-2 border-solid border-white rounded-lg">
                <img
                    src={mainImage}
                    alt="test"
                    className="object-contain rounded-2xl"
                />
            </div>
        </a>
    );
};

export default EarthInfoBox;
