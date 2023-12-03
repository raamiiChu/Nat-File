import React from "react";
import { Routes, Route } from "react-router-dom";

import { Header, Signin } from "./components";
import { HomePage, Edit, View, Profile, Test } from "./pages";

const App = () => {
    return (
        <>
            <Header />
            <Signin />

            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/edit" element={<Edit />} />
                <Route path="/view" element={<View />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/test" element={<Test />} />
            </Routes>
        </>
    );
};

export default App;
