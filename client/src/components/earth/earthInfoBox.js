import React from "react";

const EarthInfoBox = ({ name, preferredCommonName, user, url, mainImage }) => {
    return (
        <div className="w-64 h-64 p-2 absolute z-20 bottom-full right-1/2 translate-x-1/2 text-black bg-white bg-opacity-95 border-2 border-solid border-white rounded-lg cursor-default">
            <a
                href={url}
                target="_blank"
                rel="noreferrer"
                className="block my-1"
            >
                <div className="h-36 flex items-center">
                    <img
                        src={mainImage}
                        alt="test"
                        className="h-full w-full object-center object-cover m-auto rounded-xl bg-black bg-opacity-10 overflow-hidden hover:scale-95 transition-all duration-300"
                    />
                </div>
            </a>
            <div className="px-4 py-2">
                <h2
                    title={preferredCommonName}
                    className="font-bold whitespace-nowrap overflow-hidden text-ellipsis"
                >
                    {preferredCommonName || "Unknown"}
                </h2>
                <p
                    title={name}
                    className="text-xs overflow-hidden text-ellipsis"
                >
                    {name || "Unknown"}
                </p>
                <p
                    title={`Photo By: ${user}`}
                    className="mt-3 text-xs text-right overflow-hidden text-ellipsis"
                >
                    Photo: {user}
                </p>
            </div>
        </div>
    );
};

export default EarthInfoBox;
