const fs = require("fs");

//Creating a Test middleware.
function logReqRes(filename) {
  return (req, res, next) => {
    fs.appendFile(
      filename,
      `\n${Date.now()}:${req.ip} ${req.method}: ${req.path}`,
      (err, data) => {
        next();
      }
    );
  };
}

module.exports = { logReqRes };
