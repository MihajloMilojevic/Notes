const { StatusCodes } = require('http-status-codes')

module.exports = (err, req, res, next) => {
	let customError = {
		// set default
		statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
		msg: err.message || "An error occurred. Please try again later.",
	  }
	
	  if (err.name === 'ValidationError') {
		customError.msg = Object.values(err.errors)
		  .map((item) => item.message)
		  .join(', ')
		customError.statusCode = StatusCodes.BAD_REQUEST;
	  }
	  if (err.code && err.code === 11000) {
		customError.msg = "An account with this email address already exists";
		customError.statusCode = StatusCodes.BAD_REQUEST;
	  }
	  if (err.name === 'CastError') {
		customError.msg = `Invalid id: ${err.value}`
		customError.statusCode = StatusCodes.NOT_FOUND;
	  }
	
	  return res.status(customError.statusCode).json({ ok: false, message: customError.msg })
  }