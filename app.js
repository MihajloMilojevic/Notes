require("dotenv").config();  // ENABLES ENV VARIABLES
require("express-async-errors"); // ERROR WRAPPER

const connetDB = require("./database/connect") // FUNCTION TO CONNECT TO DATABASE
const notFound = require("./middleware/notFound"); // FOR NOT EXISTING ROUTS
const errorHandler = require("./middleware/errorHandler"); //HANDLES ALL ERRORS
const userRouter = require("./routers/user"); // ROUTS FOR USER INTERACTION

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
    max: 100, // limit each IP to 100 requests per windowMs
  })
);

app.use(express.json()); // CONVERTS REQUEST BODY TO JS OBJECT AND ADDS IT TO REQ OBJECT
app.use(helmet()); // SECURITY
app.use(cors()); // SECURITY
app.use(xss()); // SECURITY

app.use(express.static("public")) //USE ASSETS FROM PUBLIC FOLDER - FRONT END

app.use("/api/users", userRouter); // USES ROUTS FOR USER INTERACTION

/********** REDIRECTION TO EXACT PAGE **********/
app.get("/login", (req, res) => {
	res.redirect("/login.html");
})
app.get("/register", (req, res) => {
	res.redirect("/register.html");
})

app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 3000;


const startapp = async () => { // CONNECTS TO DATABASE AND STARTS SERVER ONLY IF SUCCESFULL
	try {
		await connetDB(process.env.MONGO_URI);
		app.listen(port, () => console.log(`Server listens on port ${port}...`))
	} catch (error) {
		console.error(error);
	}
}

startapp();