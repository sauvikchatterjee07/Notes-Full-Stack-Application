import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BASE_AUTH_URL } from "../constants/constants";
import axios from "axios";

const Login = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const getUserAndToken = await axios.post(`${BASE_AUTH_URL}/login`, {
                email: formData.email,
                password: formData.password,
            });
            console.log("User Details:", getUserAndToken.data.user);
            console.log("User Token Details:", getUserAndToken.data.token);
        } catch (error) {
            if (error.response && error.response.status === 400) {
                if (error.response.data.message === "User not found") {
                    setMessage("User not found");
                    setTimeout(() => {
                        navigate("/");
                    }, 2000);
                } else if (
                    error.response.data.message === "Incorrect Password"
                ) {
                    setMessage("Incorrect Password");
                }
            } else {
                setMessage("An error occurred during login");
                setTimeout(() => {
                    navigate("/");
                }, 2000);
            }
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-center">Log In</h2>
                {message && (
                    <div className="text-center text-green-500">{message}</div>
                )}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full p-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            required
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full p-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            required
                        />
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="w-full px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                            Log In
                        </button>
                    </div>
                    <Link
                        className="block mt-4 text-blue-700 underline underline-offset-2 text-center hover:text-blue-900 focus:outline-none"
                        to="/"
                    >
                        New to our App? Sign In
                    </Link>
                </form>
            </div>
        </div>
    );
};

export default Login;
