const express = require('express');
const {createNote,allNotes, editNote, deleteNote} = require("../controllers/notes");
const auth = require('../middleware/authentication');

const router = express.Router();

router.use(auth)

router.route("/").get(allNotes).post(createNote);
router.route("/:id").patch(editNote).delete(deleteNote);

module.exports = router;
