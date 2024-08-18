import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_NOTES_URL } from "../constants/constants";
import "@fortawesome/fontawesome-free/css/all.min.css";
import NewNoteForm from "./NewNoteForm";

const AllNotesByID = () => {
    const [notes, setNotes] = useState([]);
    const [editNoteVars, setEditNoteVars] = useState({
        noteId: null,
        title: "",
        content: "",
    });

    const userID = localStorage.getItem("userID");
    const token = localStorage.getItem("token");

    const editNote = async (note) => {
        setEditNoteVars({
            noteId: note._id,
            title: note.title,
            content: note.content,
        });
    };

    const deleteNote = async (nid) => {
        try {
            await axios.delete(`${BASE_NOTES_URL}/${nid}`, {
                headers: {
                    Authorization: `${token}`,
                },
            });
            //filter method returns a new array with the data which meets the specified condition of the existing array
            setNotes((prevNotes) =>
                prevNotes.filter((note) => note._id !== nid)
            );
        } catch (error) {
            console.error("Error fetching notes:", error);
        }
    };

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

    useEffect(() => {
        if (userID && token) {
            fetchNotes();
        }
    }, [userID, token]);

    return (
        <>
            <NewNoteForm
                setNotes={setNotes}
                editNoteVars={editNoteVars}
                setEditNoteVars={setEditNoteVars}
            />

            <div className="container mx-auto p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {notes.map((note) => (
                        <div
                            key={note._id}
                            className="bg-white shadow-md rounded-lg p-4 border border-gray-200 relative transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
                        >
                            <h2 className="text-xl font-semibold mb-2">
                                {note.title}
                            </h2>
                            <p className="text-gray-700">{note.content}</p>
                            <div className="absolute top-2 right-2 flex space-x-2">
                                <button
                                    className=" p-2 "
                                    onClick={() => editNote(note)}
                                >
                                    <i className="fas fa-edit"></i>
                                </button>
                                <button
                                    className=" p-2 "
                                    onClick={() => deleteNote(note._id)}
                                >
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
