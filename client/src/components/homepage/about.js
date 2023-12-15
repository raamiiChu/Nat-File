import React from "react";

import editImage from "../../images/homepage-edit.png";
import shareImage from "../../images/homepage-share.png";
import viewImage from "../../images/homepage-view.png";

const About = () => {
    return (
        <div className="grid py-32 gap-y-16 bg-fixed bg-left-top bg-[url('../images/homepage-bg.jpg')]">
            <section className="grid grid-cols-1 lg:grid-cols-2 gap-y-10 px-4 sm:px-12 md:px-20 lg:px-0 py-10 text-white bg-black bg-opacity-50">
                <div className="mx-auto lg:mx-0">
                    <img
                        src={editImage}
                        alt="edit panel"
                        className="max-h-[250px] lg:max-h-[350px] object-contain rounded-3xl lg:rounded-e-full"
                    />
                </div>

                <article className="flex flex-col justify-around gap-y-10 px-2 sm:px-10">
                    <div className="grid grid-cols-2 gap-x-5 items-center">
                        <hr className="border-2 border-solid border-primary" />

                        <h3 className="text-2xl sm:text-3xl text-center text-primary font-bold tracking-widest">
                            Edit
                        </h3>
                    </div>

                    <p className="p-2 sm:p-8 text-xl leading-8 indent-8">
                        Upload your photos, drag and zoom to edit your own
                        personal portfolio.
                    </p>

                    <hr className="border-2 border-solid border-primary" />
                </article>
            </section>

            <section className="flex lg:grid flex-col-reverse grid-cols-1 lg:grid-cols-2 gap-y-10 px-4 sm:px-12 md:px-20 lg:px-0 py-10 text-white bg-black">
                <article className="flex flex-col justify-around gap-y-10 px-2 sm:px-10">
                    <div className="grid grid-cols-2 gap-x-5 items-center">
                        <hr className="border-2 border-solid border-primary" />

                        <h3 className="text-lg sm:text-3xl text-center text-primary font-bold tracking-widest">
                            Share
                        </h3>
                    </div>

                    <p className="p-2 sm:p-8 text-xl leading-8 indent-8">
                        Share your portfolio via public link and view details
                        and statistics of photos.
                    </p>

                    <hr className="border-2 border-solid border-primary" />
                </article>

                <div className="mx-auto lg:mx-0 flex justify-end">
                    <img
                        src={shareImage}
                        alt="statistics charts"
                        className="max-h-[250px] lg:max-h-[350px] object-contain rounded-3xl lg:rounded-s-full"
                    />
                </div>
            </section>

            <section className="grid grid-cols-1 lg:grid-cols-2 gap-y-10 px-4 sm:px-12 md:px-20 lg:px-0 py-10 text-white  bg-black bg-opacity-75">
                <div className="mx-auto lg:mx-0">
                    <img
                        src={viewImage}
                        alt="view other's records"
                        className="max-h-[250px] lg:max-h-[350px] object-contain rounded-xl lg:rounded-e-full"
                    />
                </div>

                <article className="flex flex-col justify-around gap-y-10 px-2 sm:px-10">
                    <div className="grid grid-cols-2 gap-x-5 items-center">
                        <hr className="border-2 border-solid border-primary" />

                        <h3 className="text-2xl sm:text-3xl text-center text-primary font-bold tracking-widest">
                            View
                        </h3>
                    </div>

                    <p className="p-2 sm:p-8 text-xl leading-8 indent-8">
                        Fill in the quantity, species name, or user name, and
                        then use the iNaturalist API to view other people's
                        observation records.
                    </p>

                    <hr className="border-2 border-solid border-primary" />
                </article>
            </section>
        </div>
    );
};

export default About;
