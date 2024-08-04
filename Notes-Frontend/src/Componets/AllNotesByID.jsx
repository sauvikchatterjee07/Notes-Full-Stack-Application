import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_NOTES_URL } from "../constants/constants";
import "@fortawesome/fontawesome-free/css/all.min.css";

const AllNotesByID = () => {
    const [notes, setNotes] = useState([]);
    const [note, setNote] = useState({
        title: "",
        content: "",
    });

    const userID = localStorage.getItem("userID");
    const token = localStorage.getItem("token");

    const fetchNotes = async () => {
        try {
            const response = await axios.get(`${BASE_NOTES_URL}/${userID}`, {
                headers: {
                    Authorization: `${token}`,
                },
            });
            setNotes(response.data);
        } catch (error) {
            console.error("Error fetching notes:", error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                `${BASE_NOTES_URL}/${userID}`,
                note,
                {
                    headers: {
                        Authorization: `${token}`,
                    },
                }
            );
            console.log(response.data);

            // Add the new note to the existing notes
            //the first argument of setXyz() function is always the current state of the state variable
            setNotes((prevNotes) => [...prevNotes, response.data]);

            // Clear the input fields
            setNote({
                title: "",
                content: "",
            });
        } catch (error) {
            console.error("Error:", error);
            //setMessage("An error occurred during registration.");
        }
    };

    useEffect(() => {
        if (userID && token) {
            fetchNotes();
        }
    }, [userID, token]);

    return (
        <>
            <div className="bg-white shadow-md rounded-lg p-4 border border-gray-200 my-6 mx-auto max-w-3xl">
                <h2 className="text-xl font-semibold mb-4">Add New Note</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label
                            htmlFor="title"
                            className="block text-sm font-medium text-gray-700 mb-2"
                        >
                            Title
                        </label>
                        <input
                            id="title"
                            type="text"
                            name="title"
                            value={note.title}
                            onChange={(e) =>
                                setNote({
                                    ...note,
                                    [e.target.name]: e.target.value,
                                })
                            }
                            className="block w-full border border-gray-300 rounded-md p-2"
                            placeholder="Enter note title"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="content"
                            className="block text-sm font-medium text-gray-700 mb-2"
                        >
                            Content
                        </label>
                        <textarea
                            id="content"
                            value={note.content}
                            name="content"
                            onChange={(e) =>
                                setNote({
                                    ...note,
                                    [e.target.name]: e.target.value,
                                })
                            }
                            className="block w-full border border-gray-300 rounded-md p-2"
                            placeholder="Enter note content"
                            rows="4"
                            required
                        ></textarea>
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-800 text-white rounded-full px-4 py-2 hover:bg-blue-600 transition"
                    >
                        Save Note
                    </button>
                </form>
            </div>

            <div className="container mx-auto p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {notes.map((note) => (
                        <div
                            key={note.id}
                            className="bg-white shadow-md rounded-lg p-4 border border-gray-200 relative transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
                        >
                            <h2 className="text-xl font-semibold mb-2">
                                {note.title}
                            </h2>
                            <p className="text-gray-700">{note.content}</p>
                            <div className="absolute top-2 right-2 flex space-x-2">
                                <button className=" p-2 ">
                                    <i className="fas fa-edit"></i>
                                </button>
                                <button className=" p-2 ">
                                    <i className="fa-solid fa-trash"></i>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default AllNotesByID;
