const fs = require("fs");
const path = require("path");
const dataJson = require("./../Data/products.json");

function buildResponse(value) {
  value = decodeURI(value);
  const found = dataJson.find(
    (element) => element.title.toLowerCase() == value
  );
  if (found) {
    return {
      name: found.title,
      description: found.description,
      price: found.price,
      image: found.filename,
    };
  } else {
    return {};
  }
}

function dataHandler(request, response) {
  const url = request.url;
  const urlArray = url.split("/");
  const value = urlArray[2];
  response.writeHead(200, { "content-type": "application/json" });
  response.end(JSON.stringify(buildResponse(value.toLowerCase())));
}

module.exports = dataHandler;
