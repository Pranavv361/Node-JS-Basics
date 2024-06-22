const express = require("express");
const fs = require("fs");
const users = require("./MOCK_DATA.json");
const mongoose = require("mongoose");

const app = express();
const PORT = 8000;

// Middleware
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

//Routes
app.get("/users", (req, res) => {
  const html = `<ul>
      ${users.map((user) => `<li>${user.first_name}</li>`).join("")}
      </ul>`;
  res.send(html);
});

//Rest API endpoint for getting all users in JSON format
app.get("/api/users", (req, res) => {
  res.setHeader("X-MyName", "User Created Header"); // Custom Header in response header
  //always add X- to the custom header.
  console.log(req.headers);
  return res.json(users);
});

// The following code can be grouped as following.
// app.get("/api/users/:id", (req, res) => {
//   const id = Number(req.params.id);
//   const user = users.find((user) => user.id === id);
//   return res.json(user);
// });

// app.patch("/api/users/:id", (req, res) => {
//   //TODO: Edit the user with given ID
//   return res.json({ status: " Pending " });
// });

// app.delete("/api/users/:id", (req, res) => {
//   //TODO: Delete the user with given ID
//   return res.json({ status: " Pending " });
// });

app
  .route("/api/users/:id")
  .get((req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    if (!user) return res.status(404).json({ error: "User not found" });
    return res.json(user);
  })
  .patch((req, res) => {
    const id = Number(req.params.id);
    const index = users.findIndex((user) => user.id === id);

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
  .delete((req, res) => {
    const id = Number(req.params.id);
    const index = users.findIndex((user) => user.id === id);

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

app.post("/api/users", (req, res) => {
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
  users.push({ ...body, id: users.length + 1 });
  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
    return res.status(201).json({ status: " Success ", id: users.length });
  });
});

app.listen(PORT, () => console.log("Server is running on port " + PORT));
