const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
	title: {
		type: String,
		required: [true, "Title is required"],
		trim: true
	},
	text: {
		type: String,
		required: [true, "Title is required"],
		trim: true
	},
	author: {
		type: mongoose.Types.ObjectId,
		ref: "User"
	}
}, {timestamps: true})

module.exports = mongoose.model("Note", noteSchema);