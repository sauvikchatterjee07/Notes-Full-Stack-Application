const express = require("express");
const {
    createNote,
    getAllNotes,
    getNoteByUserId,
    getNoteByNoteId,
    updateNote,
    deleteNote,
    deleteNotesByUserId,
} = require("../controllers/notesController");
const auth = require("../middlewares/auth");
const router = express.Router();

router.get("/", getAllNotes);
router.post("/:userId", auth, createNote);
router.get("/:uid", auth, getNoteByUserId);
router.get("/id/:nid", auth, getNoteByNoteId);
router.put("/:nid", auth, updateNote);
router.delete("/:nid", auth, deleteNote);
router.delete("/user/:userId", deleteNotesByUserId);

module.exports = router;
