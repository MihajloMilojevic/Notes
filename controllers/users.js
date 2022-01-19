const User = require("../models/user")
const StatusCodes = require("http-status-codes");
const { BadRequestError, UnauthenticatedError, NotFoundError } = require('../errors')

const login = async (req, res) => {
	const { email, password } = req.body;

  if (!email ) {
    throw new BadRequestError("Email is required")
  }

  if (!password) {
    throw new BadRequestError("Password is required")
  }
  const user = await User.findOne({ email })
  if (!user) {
    throw new UnauthenticatedError('Invalid email')
  }
  const isPasswordCorrect = await user.comparePassword(password)
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError('Invalid password')
  }
  const token = user.createJWT();
  res.status(StatusCodes.OK).json({ ok: true, user: { username: user.username,email: user.email, _id: user["_id"],  }, token })
}

const register = async (req, res) => {
	let user = await User.create(req.body);
	const {_id, email} = user;
  const token = user.createJWT();
  res.status(StatusCodes.CREATED).json({ ok: true, user: { email: user.email, _id: user["_id"],  }, token })
}

const deleteUser = async (req, res) => {
  const deleted = await User.findByIdAndRemove({_id: req.user.userId});
  if (!deleted) {
    throw new NotFoundError(`Korisnik ne postoji`)
  }
  res.status(StatusCodes.OK).json({ok: true});
}

module.exports = {
  register,
  login,
  deleteUser
}