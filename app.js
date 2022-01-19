require("dotenv").config();
require("express-async-errors");

const connetDB = require("./database/connect")
const notFound = require("./middleware/notFound");
const errorHandler = require("./middleware/errorHandler");
const userRouter = require("./routers/user");

const express = require('express');
const app = express();

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

app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(xss());

app.use(express.static("public"))

app.use("/api/users", userRouter);

app.get("/login", (req, res) => {
	res.redirect("/login.html");
})
app.get("/register", (req, res) => {
	res.redirect("/register.html");
})

app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 3000;


const startapp = async () => {
	try {
		await connetDB(process.env.MONGO_URI);
		app.listen(port, () => console.log(`app listens on port ${port}...`))
	} catch (error) {
		console.error(error);
	}
}

startapp();