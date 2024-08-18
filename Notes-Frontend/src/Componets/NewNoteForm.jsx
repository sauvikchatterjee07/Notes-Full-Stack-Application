import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_NOTES_URL } from "../constants/constants";

const NewNoteForm = ({ setNotes, editNoteVars, setEditNoteVars }) => {
    const [note, setNote] = useState({
        title: "",
        content: "",
    });

    const userID = localStorage.getItem("userID");
    const token = localStorage.getItem("token");

    useEffect(() => {
        if (editNoteVars.noteId) {
            setNote({
                title: editNoteVars.title,
                content: editNoteVars.content,
            });
        } else {
            setNote({
                title: "",
                content: "",
            });
        }
    }, [editNoteVars]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(
                `${BASE_NOTES_URL}/${editNoteVars.noteId}`,
                note,
                {
                    headers: {
                        Authorization: `${token}`,
                    },
                }
            );
            // console.log(response.data);

            setNotes((prevNotes) =>
                prevNotes.map((n) =>
                    n._id === editNoteVars.noteId ? response.data : n
                )
            );
            setEditNoteVars({
                noteId: null,
                title: "",
                content: "",
            });
        } catch (error) {
            console.error("Error:", error);
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

    return (
        <div className="bg-white shadow-md rounded-lg p-4 border border-gray-200 my-6 mx-auto max-w-3xl">
            <h2 className="text-xl font-semibold mb-4">
                {editNoteVars.noteId ? "Update Note" : "Add New Note"}
            </h2>
            <form onSubmit={editNoteVars.noteId ? handleUpdate : handleSubmit}>
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
                        rows="4"
                        required
                    ></textarea>
                </div>
                <button
                    type="submit"
                    className="bg-blue-800 text-white rounded-full px-4 py-2 hover:bg-blue-600 transition"
                >
                    {editNoteVars.noteId ? "Edit Note" : "Save Note"}
                </button>
            </form>
        </div>
    );
};

export default NewNoteForm;
