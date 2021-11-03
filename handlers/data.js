const fs = require("fs");
const path = require("path");
const dataJson = require("./../Data/products.json");
const autocomplete = require("./../handlers/autocomplete.js");
//function that checks if the searched input is in the products.json
function buildResponse(value) {
  value = decodeURI(value);
  const found = dataJson.find(
    (element) => element.title.toLowerCase() == value
  );
  //if its found then we return and object
  if (found) {
    autocomplete.incrementValue(found.title);
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

//takes in the request and runs the buildResponse function
function dataHandler(request, response) {
  const url = request.url;
  const urlArray = url.split("/");
  const value = urlArray[2];
  response.writeHead(200, { "content-type": "application/json" });
  response.end(JSON.stringify(buildResponse(value.toLowerCase())));
}

module.exports = dataHandler;
