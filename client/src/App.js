import React from "react";
import { Routes, Route } from "react-router-dom";

import { Header } from "./components";
import { HomePage, Edit, View, Test } from "./pages";

const App = () => {
    return (
        <>
            <Header />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/edit" element={<Edit />} />
                <Route path="/view" element={<View />} />
                <Route path="/test" element={<Test />} />
            </Routes>
        </>
    );
};

export default App;
