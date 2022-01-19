const mongoose = require("mongoose");
const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
	email: {
		type: String,
      required: [true, "Email is required"],
      trim: true,
      match: [
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          "Email invalid",
        ],
      unique: true,
	},
    password: {
        type: String,
        required: [true, "Password is required"],
    }
})

/********** HASHES ALL PASSWORDS BEFORE SAVING IT TO DB **********/
userSchema.pre('save', async function () {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
  })
/********** CREATES A JSON WEB TOKEN FOR A USER **********/
userSchema.methods.createJWT = function () {
    return jwt.sign(
      { userId: this._id, email: this.email },
      process.env.JWT_SECRET
    )
  }
/********** COMPARES HASHED PASSWORDS **********/
userSchema.methods.comparePassword = async function (canditatePassword) {
    const isMatch = await bcrypt.compare(canditatePassword, this.password)
    return isMatch
  }

module.exports = mongoose.model("User", userSchema);