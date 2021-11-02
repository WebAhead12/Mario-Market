const fs = require("fs");
const path = require("path");

const types = {
  css: "text/css",
  js: "application/javascript",
  jpg: "image/x-icon",
};

function publicHandler(request, response) {
  console.log();

  const type = types[request.url.split(".")[1]];
  let filePath = "";
  console.log(type);
  switch (type) {
    case types.css:
      filePath = path.join(__dirname, "..", "public", "style.css");
      break;
    case types.js:
      filePath = path.join(__dirname, "..", "public", "script.js");
      break;
    case types.jpg:
      filePath = path.join(__dirname, "..", "public", "network.jpg");
      break;
  }
  fs.readFile(filePath, (error, file) => {
    if (error) {
      console.log(error);
      response.writeHead(404, { "content-type": "text/html" });
      response.end("<h1>Not found</h1>");
    } else {
      response.writeHead(200, { "content-type": type });
      response.end(file);
    }
  });
}

module.exports = publicHandler;
