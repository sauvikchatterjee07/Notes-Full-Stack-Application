import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Spinner from "./Spinner";

const Signin = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isEmailExist, setIsEmailExist] = useState(false);

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
            // Check if email is already registered
            const emailCheckResponse = await axios.post(
                "http://localhost:3000/api/auth/check-email",
                { email: formData.email }
            );

            console.log(emailCheckResponse.data.exists); //f

            if (emailCheckResponse.data.exists) {
                //f
                setMessage(
                    "Email is already registered. Redirecting to login page..."
                );
                setIsLoading(true);
                setIsEmailExist(true); //isEmailExist = true
                setTimeout(() => {
                    setIsLoading(false);
                    navigate("/login");
                }, 5000);
            } else {
                // Proceed with registration
                const response = await axios.post(
                    "http://localhost:3000/api/auth/register",
                    formData
                );
                console.log(response.data);
                setMessage("User Registration Successful");
                setIsLoading(true);
                setTimeout(() => {
                    setIsLoading(false);
                    navigate("/login");
                }, 5000);
            }
        } catch (error) {
            console.error("Error:", error);
            setMessage("An error occurred during registration.");
        }
    };

    return isLoading ? (
        <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
            <Spinner isEmailExist={isEmailExist} />
        </div>
    ) : (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-center">Sign In</h2>
                {message && (
                    <div
                        className={`text-center ${
                            message === "User Registration Successful"
                                ? "text-green-500"
                                : "text-red-500"
                        }`}
                    >
                        {message}
                    </div>
                )}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label
                            htmlFor="name"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full p-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            required
                        />
                    </div>
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
                            Sign In
                        </button>
                    </div>
                    <Link
                        className="block mt-4 text-blue-700 underline underline-offset-2 text-center hover:text-blue-900 focus:outline-none"
                        to="/login"
                    >
                        Already a member? Log in
                    </Link>
                </form>
            </div>
        </div>
    );
};

export default Signin;
