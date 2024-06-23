const User = require("../models/user");

async function handleGetAllUsers(req, res) {
  const AllDbUsers = await User.find({});
  res.setHeader("X-MyName", "User Created Header"); // Custom Header in response header
  //always add X- to the custom header.
  console.log(req.headers);
  return res.json(AllDbUsers);
}

async function handleGetUserById(req, res) {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ error: "User not found" });
  return res.json(user);
}

async function handleUpdateUserById(req, res) {
  await User.findByIdAndUpdate(req.params.id, { lastName: "Changed" });

  if (!user) return res.status(404).json({ error: "User not found" });
  else return res.json({ status: "Success", message: "User deleted" });
}

async function handleDeleteUserById(req, res) {
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) return res.status(404).json({ error: "User not found" });
  else return res.json({ status: "Success", message: "User deleted" });
}

async function handleCreateNewUser(req, res) {
  const body = req.body;
  if (
    !body.first_name ||
    !body.last_name ||
    !body.gender ||
    !body.email ||
    !body.job_title
  ) {
    return res.status(400).json({ error: "All fields are required" });
  }
  const result = await User.create({
    firstName: body.first_name,
    lastName: body.last_name,
    email: body.email,
    job_title: body.job_title,
    gender: body.gender,
  });
  // console.log(result);
  return res.status(201).json({ status: "Success", id: result._id });
}

module.exports = {
  handleGetAllUsers,
  handleGetUserById,
  handleUpdateUserById,
  handleDeleteUserById,
  handleCreateNewUser,
};
