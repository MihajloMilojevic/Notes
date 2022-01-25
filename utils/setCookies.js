const User = require("../models/user");

const attachCookies = ( res, user ) => {
	const token = user.createJWT();
  
	res.cookie('token', token, {
	  httpOnly: true,
	});
  };

module.exports = attachCookies;