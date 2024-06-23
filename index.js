const express = require("express");
// const users = require("./MOCK_DATA.json");
const { logReqRes } = require("./middlewares");
const userRouter = require("./routes/user");
const { connectMongoDB } = require("./connection");

const app = express();
const PORT = 8000;

//Connection
connectMongoDB("mongodb://localhost:27017/Nodejs-app");

// Middleware - Plugin
app.use(express.urlencoded({ extended: false }));

//Calling a Test middleware.
app.use(logReqRes("log.txt"));

// Routes
app.use("/api/users", userRouter);

app.listen(PORT, () => console.log("Server is running on port " + PORT));
