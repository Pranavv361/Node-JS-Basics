const express = require("express");

const {
  handleGetAllUsers,
  handleGetUserById,
  handleUpdateUserById,
  handleDeleteUserById,
  handleCreateNewUser,
} = require("../controllers/user");

const router = express.Router();

//Routes
// router.get("/users", async (req, res) => {
//   const AllDbUsers = await User.find({});
//   const html = `<ul>
//         ${AllDbUsers.map(
//           (user) => `<li>${user.firstName} - ${user.email}</li>`
//         ).join("")}
//         </ul>`;
//   res.send(html);
// });

//Rest API endpoint for getting all users in JSON format
router.route("/").get(handleGetAllUsers).post(handleCreateNewUser);

// The following code can be grouped as following.
// router.get("/api/users/:id", (req, res) => {
//   const id = Number(req.params.id);
//   const user = users.find((user) => user.id === id);
//   return res.json(user);
// });

// router.patch("/api/users/:id", (req, res) => {
//   //TODO: Edit the user with given ID
//   return res.json({ status: " Pending " });
// });

// router.delete("/api/users/:id", (req, res) => {
//   //TODO: Delete the user with given ID
//   return res.json({ status: " Pending " });
// });

router
  .route("/:id")
  .get(handleGetUserById)
  .patch(handleUpdateUserById)
  .delete(handleDeleteUserById);

module.exports = router;
