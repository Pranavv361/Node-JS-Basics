const express = require("express");
const fs = require("fs");
// const users = require("./MOCK_DATA.json");
const userRouter = require("./routes/user");
const { connectMongoDB } = require("./connection");

const app = express();
const PORT = 8000;

//Connection
connectMongoDB("mongodb://localhost:27017/Nodejs-app");

// Middleware - Plugin
app.use(express.urlencoded({ extended: false }));

//Creating a Test middleware.
app.use((req, res, next) => {
  fs.appendFile(
    "log.txt",
    `\n${Date.now()}:${req.ip} ${req.method}: ${req.path}`,
    (err, data) => {
      next();
    }
  );
});

// Routes
app.use("/user", userRouter);

app.listen(PORT, () => console.log("Server is running on port " + PORT));
