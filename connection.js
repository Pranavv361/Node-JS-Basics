const mongoose = require("mongoose");

//Connection to MongoDB
async function connectMongoDB(url) {
  return mongoose
    .connect(url)
    .then(() => console.log("MongoDB connected..."))
    .catch((err) => console.log("MongoDB connection failed:", err));
}

module.exports = { connectMongoDB };
