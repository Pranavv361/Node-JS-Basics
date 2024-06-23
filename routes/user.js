const express = require("express");
const User = require("./models/User");

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
router.get("/", async (req, res) => {
  const AllDbUsers = await User.find({});
  res.setHeader("X-MyName", "User Created Header"); // Custom Header in response header
  //always add X- to the custom header.
  console.log(req.headers);
  return res.json(AllDbUsers);
});

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
  .get(async (req, res) => {
    // const id = Number(req.params.id);
    // const user = users.find((user) => user.id === id);
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });
    return res.json(user);
  })
  .patch(async (req, res) => {
    const id = Number(req.params.id);
    const index = users.findIndex((user) => user.id === id);

    await User.findByIdAndUpdate(req.params.id, { lastName: "Changed" });
    if (index === -1) {
      return res.status(404).json({ error: "User not found" });
    }

    const updatedUser = { ...users[index], ...req.body };
    users[index] = updatedUser;

    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err) => {
      if (err) {
        return res.status(500).json({ error: "Failed to update user" });
      }
      return res.json(updatedUser);
    });
  })
  .delete(async (req, res) => {
    const id = Number(req.params.id);
    const index = users.findIndex((user) => user.id === id);
    await User.findByIdAndDelete(req.params.id);
    users.splice(index, 1);

    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err) => {
      if (err) {
        return res.status(500).json({ error: "Failed to delete user" });
      }
      return res.json({ status: "Success", message: "User deleted" });
    });

    if (index === -1) {
      return res.status(404).json({ error: "User not found" });
    }
  });

router.post("/", async (req, res) => {
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
  // Code to write in to a JSON file
  // users.push({ ...body, id: users.length + 1 });
  // fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
  //   return res.status(201).json({ status: " Success ", id: users.length });
  // });
  const result = await User.create({
    firstName: body.first_name,
    lastName: body.last_name,
    email: body.email,
    job_title: body.job_title,
    gender: body.gender,
  });
  // console.log(result);
  return res.status(201).json({ status: "Success", id: result.id });
});

module.exports = router;
