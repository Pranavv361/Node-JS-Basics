const mongoose = require("mongoose");

// Schema
const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: false },
    email: { type: String, required: true, unique: true },
    job_title: { type: String },
    gender: { type: String },
  },
  { timestamps: true }
);

//Model - User class
const User = mongoose.model("user", userSchema);

module.exports = User;
