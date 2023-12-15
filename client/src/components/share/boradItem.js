import React, { useEffect, useState } from "react";

import { useDispatch } from "react-redux";
import {
    setIsOpeningImage,
    setImageUrl,
    setInfo,
} from "../../features/shareSlice";

import { format } from "date-fns";

const boardStyles = ["board-small", "board-long", "board-tall", "board-big"];

const BoardItem = ({ image, layouts }) => {
    const {
        id,
        title,
        species,
        time,
        aperture,
        shutter,
        iso,
        focalLength,
        s3Key,
    } = image;
    const imageUrl = `https://stylish-images-storage.s3.ap-northeast-1.amazonaws.com/${s3Key}`;

    //redux
    const dispatch = useDispatch();

    // state
    const [boardIndex, setBoardIndex] = useState(0);

    const openImageHandler = (e) => {
        e.preventDefault();
        e.stopPropagation();

        dispatch(setIsOpeningImage(true));
        dispatch(setImageUrl(imageUrl));
        dispatch(
            setInfo({
                title,
                species,
                time: format(new Date(time), "yyyy/hh/mm"),
                aperture,
                shutter,
                iso,
                focalLength,
            })
        );
    };

    const determineIndex = () => {
        if (!layouts) {
            return 0;
        }

        const foundLayout = layouts["lg"]?.filter((layout) => {
            return layout.i === id;
        });

        if (!foundLayout) {
            return 0;
        }

        try {
            const { w, h } = foundLayout[0];

            if (w === 1 && h === 1) {
                return 0;
            } else if (w === 2 && h === 1) {
                return 1;
            } else if (w === 1 && h === 2) {
                return 2;
            } else if (w === 2 && h === 2) {
                return 3;
            }
        } catch (error) {
            // first time upload image
            return 0;
        }
    };

    useEffect(() => {
        const index = determineIndex();
        setBoardIndex(index);
    }, [layouts]);

    return (
        <div className={`${boardStyles[boardIndex]}`}>
            <div
                className="cursor-pointer hover:scale-95 transition-all duration-300"
                onClick={(e) => {
                    openImageHandler(e);
                }}
            >
                <img src={imageUrl} alt={title} />
            </div>
            <article>
                <h2>{title}</h2>
                <p>{format(new Date(time), "yyyy / hh / mm")}</p>
                <h3>{species}</h3>
            </article>

            <hr />

            <ul className="grid gap-y-1 text-sm">
                <li>
                    光圈 <br /> {aperture}
                </li>
                <li>
                    快門 <br /> 1/{shutter}
                </li>
                <li>
                    ISO <br /> {iso}
                </li>
            </ul>
        </div>
    );
};

export default BoardItem;
