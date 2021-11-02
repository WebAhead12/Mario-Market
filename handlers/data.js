const fs = require("fs");
const { json } = require("node:stream/consumers");
const path = require("path");

const types = {
  jpg: "image/jpeg",
};

function dataHandler(request, response) {
  const url = request.url;
  const urlArray = url.split(".");
  const extension = urlArray[1];
  const type = types[extension];
  const filePath = path.join(__dirname, "..", url);

  fs.readFile(filePath, (error, file) => {
    if (error) {
      console.log(error);
      response.writeHead(404, { "content-type": "application/json" });
      response.end();
    } else {
      response.writeHead(200, { "content-type": type });
      response.end(file);
    }
  });
}

module.exports = dataHandler;
