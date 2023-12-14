import React from "react";

const Skeleton = () => {
    return (
        <div className="relative grid grid-cols-12 gap-y-3.5 px-2 py-5 bg-white rounded-3xl">
            <section className="animate-pulse relative col-start-2 col-span-10">
                <div className="block h-60 w-full mx-auto rounded-xl bg-slate-200"></div>
                <div className="absolute bottom-2 left-2 w-10 px-1.5 py-1 bg-slate-300 rounded-lg">
                    <span className="text-transparent">1</span>
                </div>
            </section>

            <nav className="animate-pulse col-start-2 col-span-10 flex justify-around">
                <div className="w-10 h-10 rounded-full bg-slate-200"></div>
                <div className="w-10 h-10 rounded-full bg-slate-200"></div>
                <div className="w-10 h-10 rounded-full bg-slate-200"></div>
            </nav>

            <article className="animate-pulse col-start-2 col-span-10 grid grid-col-2">
                <p className="col-start-2 col-span-1 gap-x-2 bg-slate-200 text-transparent text-sm">
                    123
                </p>
            </article>
        </div>
    );
};

export default Skeleton;
