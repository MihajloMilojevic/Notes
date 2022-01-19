const Note = require("../models/note")
const StatusCodes = require("http-status-codes");
const { BadRequestError, UnauthenticatedError, NotFoundError } = require('../errors');
const res = require("express/lib/response");

const createNote = async (req, res) => {
	const {title, text} = req.body;
	const author = req.user.userId;
	const note = await Note.create({title, text, author})
	res.status(StatusCodes.CREATED).json({ok: true, note});
}

const allNotes = async (req, res) => {
	const author = req.user.userId;
	const notes = await Note.find({author}).sort("-updatedAt");
	res.status(StatusCodes.OK).json({ok: true, notes}) 
}

const editNote = async (req, res) => {
	const author = req.user.userId;
	const _id = req.params.id;
	const note = await Note.findOneAndUpdate({author, _id}, req.body, {new: true});
	res.status(StatusCodes.OK).json({ok: true, note});
}

const deleteNote = async (req, res) => {
	const _id = req.params.id;
	const author = req.user.userId;
	await Note.findOneAndDelete({_id, author});
	res.status(StatusCodes.OK).json({ok: true});
}

module.exports = {
	createNote,
	allNotes,
	editNote,
	deleteNote
}