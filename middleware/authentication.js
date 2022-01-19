const User = require('../models/user')
const jwt = require('jsonwebtoken')
const { UnauthenticatedError } = require('../errors')

const auth = async (req, res, next) => {
  // check header
  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith('Bearer ')) { // HEADER MUST START WITH Bearer AND MUST HAVE A SPACE
    throw new UnauthenticatedError('Authentication error')
  }
  const token = authHeader.split(' ')[1] // TOKEN FROM A HEADER (Bearer <token> => ["Bearer", "<token>"])

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET) // VERIFY TOKEN
    req.user = { userId: payload.userId, username: payload.username, email: payload.email }
    next()
  } catch (error) {
    throw new UnauthenticatedError('Authentication error')
  }
}

module.exports = auth