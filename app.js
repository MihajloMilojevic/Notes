require("dotenv").config();  // ENABLES ENV VARIABLES
require("express-async-errors"); // ERROR WRAPPER
const path = require('path');
const cookieParser = require('cookie-parser');

const connetDB = require("./database/connect") // FUNCTION TO CONNECT TO DATABASE
const notFound = require("./middleware/notFound"); // FOR NOT EXISTING ROUTS
const errorHandler = require("./middleware/errorHandler"); //HANDLES ALL ERRORS
const userRouter = require("./routers/user"); // ROUTS FOR USER INTERACTION
const notesRouter = require("./routers/notes"); // ROUTS FOR NOTES MANIPULATION
const auth = require("./middleware/authentication") // AUTHENTICATION MIDDLEWARE

/* NOT NEEDED WITH REACT */
//const protect = require("./middleware/protect");

const express = require('express'); 
const app = express(); //CREATES SERVER

/********** ONLINE SECURITY **********/
const helmet = require('helmet');
const cors = require('cors');
const xss = require('xss-clean');
const rateLimiter = require('express-rate-limit');


app.set('trust proxy', 1);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 500, // limit each IP to 100 requests per windowMs
  })
);

app.use(express.json()); // CONVERTS REQUEST BODY TO JS OBJECT AND ADDS IT TO REQ OBJECT
app.use(helmet()); // SECURITY
app.use(cors()); // SECURITY
app.use(xss()); // SECURITY
app.use(cookieParser());
app.use(express.static("public")) //USE ASSETS FROM PUBLIC FOLDER - FRONT END

app.use((req, res, next) => {
	console.log(req.url);
	next();
})
app.use("/api/users", userRouter); // USES ROUTS FOR USER INTERACTION
app.use("/api/notes", notesRouter); // USES ROUTS FOR MANIPULATION OF NOTES

app.post("/auth", auth, (req, res) => {
	res.json({ok: true})
})
/* NOT NEEDED WITH REACT */
/********** REDIRECTION TO EXACT PAGE **********/
/*app.get("/login", (req, res) => {
	res.redirect("/login.html");
})
app.get("/register", (req, res) => {
	res.redirect("/register.html");
})
app.get("/home", (req, res) => {
	res.redirect("/home.html");
})*/

/* NOT NEEDED WITH REACT */
/*app.use(protect, express.static("./private"));*/


app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 5000;


const startapp = async () => { // CONNECTS TO DATABASE AND STARTS SERVER ONLY IF SUCCESFULL
	try {
		await connetDB(process.env.MONGO_URI);
		app.listen(port, () => console.log(`Server listens on port ${port}...`))
	} catch (error) {
		console.error(error);
	}
}

startapp();