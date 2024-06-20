// const http = require("http");
// const fs = require("fs");
// const url = require("url");
const express = require("express");

//app is the handler function. This function handles all incoming requests.
const app = express();

app.get("/", (req, res) => {
  return res.send("Welcome to my Server!");
});

app.get("/about", (req, res) => {
  res.send(`Hello, ${req.query.id}! This is the About Page.`);
});

//handler without express js
// function myHandler(req, res) {
//   if (req.url === "/favicon.ico") return res.end();
//   const log = `${Date.now()}: ${req.method} ${req.url} New Request Received\n`;
//   const parsedUrl = url.parse(req.url, true);
//   console.log(parsedUrl);
//   fs.appendFile("log.txt", log, (err, data) => {
//     switch (parsedUrl.pathname) {
//       case "/":
//         if (req.method === "GET") res.end("Welcome to my Server!");
//         break;
//       case "/about":
//         const username = parsedUrl.query.id;
//         res.end(`Hello, ${username}! This is the About Page.`);
//         break;
//       case "/signup":
//         if (req.method === "GET") res.end("Welcome to the Signup Page!");
//         else if (req.method === "POST") {
//           res.end("Thank you for signing up!");
//         }
//       default:
//         res.end("Page not found!");
//         break;
//     }
//   });
// }

app.listen(8000, () => console.log("Server Started!!"));

// const myServer = http.createServer(app);

// myServer.listen(8000, () => console.log("Server started!!"));
