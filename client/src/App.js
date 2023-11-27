import React from "react";
import { Routes, Route } from "react-router-dom";

import { Header } from "./components";
import { HomePage, Edit } from "./pages";

const App = () => {
    return (
        <>
            <Header />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/edit" element={<Edit />} />
            </Routes>
        </>
    );
};

export default App;
