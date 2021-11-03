const fs = require("fs");
const path = require("path");
//function for missing images and ads a missing image
function sendMissing(response) {
  const filePath = path.join(__dirname, "../Data/assets/images/404.jpg");
  fs.readFile(filePath, (error, file) => {
    response.writeHead(200, { "content-type": "image/jpeg" });
    response.end(file);
  });
}
//takes the image url and reads the file and returns the file with a content-type of image
function imageHandler(request, response) {
  const url = request.url;
  const filePath = path.join(__dirname, `../Data${url}`);
  fs.readFile(filePath, (error, file) => {
    if (error) {
      console.log(error);
      sendMissing(response);
    } else {
      response.writeHead(200, { "content-type": "image/jpeg" });
      response.end(file);
    }
  });
}

module.exports = imageHandler;
