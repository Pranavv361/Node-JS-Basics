const http = require("http");
const fs = require("fs");
const url = require("url");

const myServer = http.createServer((req, res) => {
  if (req.url === "/favicon.ico") return res.end();
  const log = `${Date.now()}: ${req.url} New Request Received\n`;
  const parsedUrl = url.parse(req.url, true);
  console.log(parsedUrl);
  fs.appendFile("log.txt", log, (err, data) => {
    switch (parsedUrl.pathname) {
      case "/":
        res.end("Welcome to my Server!");
        break;
      case "/about":
        const username = parsedUrl.query.id;
        res.end(`Hello, ${username}! This is the About Page.`);
        break;
      default:
        res.end("Page not found!");
        break;
    }
  });
});

myServer.listen(8000, () => console.log("Server started!!"));
