const fs = require("fs");
const path = require("path");

function imageHandler(request, response) {
  const url = request.url;
  const filePath = path.join(__dirname, "../Data", url);
  fs.readFile(filePath, (error, file) => {
    if (error) {
      response.writeHead(404, { "content-type": "image/jpeg" });
      response.end("missingImage.jpg");
    } else {
      response.writeHead(200, { "content-type": "image/jpeg" });
      response.end(file);
    }
  });
}

module.exports = imageHandler;
