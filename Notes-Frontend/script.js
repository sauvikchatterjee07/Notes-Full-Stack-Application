import React from "react";
import ReactDOM from "react-dom/client";
import Signin from "./src/Componets/Signin";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./src/Componets/Login";

const AppLayout = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Signin />} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </Router>
    );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<AppLayout />);
