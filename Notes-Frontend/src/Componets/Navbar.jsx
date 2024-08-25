import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "./Spinner";

function Navbar({ isLoading, setIsLoading }) {
    const navigate = useNavigate();

    username = localStorage.getItem("username").substring(0, 2).toUpperCase();

    async function handleLogout() {
        setIsLoading(true);
        //clear the localstorage
        localStorage.clear();

        //redirect to login page
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setIsLoading(false);
        navigate("/login");
    }

    return isLoading ? (
        <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
            <Spinner />
        </div>
    ) : (
        <nav className="bg-blue-800 p-4 flex justify-between items-center">
            <h1 className="text-white text-lg font-bold">Keep-My-Notes</h1>
            <div className="m-1 flex justify-between items-center rounded ">
                <div className="pr-4">
                    <div className="bg-white text-black px-4 py-2 rounded-full font-bold">
                        {username}
                    </div>
                </div>
                <button
                    className="text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded"
                    onClick={handleLogout}
                >
                    Logout
                </button>
            </div>
        </nav>
    );
}

export default Navbar;
