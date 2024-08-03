const express = require("express");
const mongoose = require("mongoose");
const Note = require("../models/Note"); // Adjust the path accordingly

// Create a note
async function createNote(req, res) {
    const userId = req.params.userId;
    try {
        const { title, content } = req.body;
        const note = new Note({
            title,
            content,
            userID: userId, // Correctly reference the userID field here
        });
        await note.save();
        res.status(201).send(note);
    } catch (error) {
        res.status(400).send(error);
    }
}

async function getAllNotes(req, res) {
    try {
        const notes = await Note.find();
        if (notes.length === 0) return res.send({ message: "No Notes found" });
        res.send(notes);
    } catch (error) {
        res.status(500).send(error);
    }
}

async function getNoteByUserId(req, res) {
    try {
        const note = await Note.find({
            userID: req.params.uid,
        });

        if (note.length === 0)
            return res
                .status(404)
                .send({ message: "Note not found based on User ID" });
        res.send(note);
    } catch (error) {
        res.status(500).send(error);
    }
}

async function getNoteByNoteId(req, res) {
    try {
        const note = await Note.find({
            _id: req.params.nid,
        });

        if (note.length === 0)
            return res
                .status(404)
                .send({ message: "Note not found based on the Note ID" });
        res.send(note);
    } catch (error) {
        res.status(500).send(error);
    }
}


async function updateNote(req, res) {
    const { nid } = req.params;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(nid)) {  //This checks if the provided nid is a valid ObjectId. If it's    not valid, it returns a 400 status with a message "Invalid Note ID".
        return res.status(400).send({ message: "Invalid Note ID" });
    }

    try {
        const { title, content } = req.body;
        const updates = {};
        if (title) updates.title = title;
        if (content) updates.content = content;

        // Use findByIdAndUpdate to find and update the note
        const updatedNote = await Note.findByIdAndUpdate(
            nid,
            { $set: updates },
            { new: true, runValidators: true }
        );

        if (!updatedNote) {
            return res.status(404).send({ message: "Note not found" });
        }

        res.send(updatedNote);
    } catch (error) {
        console.error("Error updating note:", error.message);
        res.status(500).send({ message: "Server error" });
    }
}



async function deleteNote(req, res) {
    const { nid } = req.params;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(nid)) {
        return res.status(400).send({ message: "Invalid Note ID" });
    }

    try {
        const deletedNote = await Note.findByIdAndDelete(nid);

        if (!deletedNote) {
            return res.status(404).send({ message: "Note not found" });
        }

        res.send({ message: "Note deleted successfully", note: deletedNote });
    } catch (error) {
        console.error("Error deleting note:", error.message);
        res.status(500).send({ message: "Server error" });
    }
}

async function deleteNotesByUserId(req, res) {
    const { userId } = req.params;

    // Check if the provided user ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).send({ message: "Invalid User ID" });
    }

    try {
        // Find and delete all notes by user ID
        const result = await Note.deleteMany({ userID: userId });

        if (result.deletedCount === 0) {
            return res.status(404).send({ message: "No notes found for this user" });
        }

        res.send({ message: "Notes deleted successfully", deletedCount: result.deletedCount });
    } catch (error) {
        // If there's an error, log it and send a 500 error response
        console.error("Error deleting notes:", error.message);
        res.status(500).send({ message: "Server error" });
    }
}

module.exports = {
    createNote,
    getAllNotes,
    getNoteByUserId,
    getNoteByNoteId,
    updateNote,
    deleteNote,
    deleteNotesByUserId
};





// try {
//     const { title, content } = req.body;
//     const note = await Note.findOneAndUpdate(
//         { _id: req.params.id, userId: req.user._id },
//         { title, content },
//         { new: true }
//     );
//     if (!note) return res.status(404).send("Note not found");
//     res.send(note);
// } catch (error) {
//     res.status(500).send(error);
// }

// try {
//     const note = await Note.findOneAndDelete({
//         _id: req.params.id,
//         userId: req.user._id,
//     });
//     if (!note) return res.status(404).send("Note not found");
//     res.send(note);
// } catch (error) {
//     res.status(500).send(error);
// }

