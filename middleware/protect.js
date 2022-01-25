const auth = require("./authentication");

const protect = async (req, res, next) => {
  try {
	  await auth(req, res, next)
  } catch (error) {
	  res.redirect("/");
  }
}

module.exports = protect