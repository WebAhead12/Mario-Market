const fs = require("fs");
const path = require("path");

const priorityJson = require(__dirname + "/../Data/priority.json");
const dataJson = require(__dirname + "/../Data/products.json");

//Runs once each time server starts up and updates priority list with any missing values.
function updatePriorityList() {
  for (const val of dataJson) {
    priorityJson[val["title"]] = priorityJson[val["title"]] || 0;
  }
  fs.writeFileSync(
    __dirname + "/../Data/priority.json",
    JSON.stringify(priorityJson, undefined, 2)
  );
}
updatePriorityList();

function buildResponse(value) {
  //Check if value is complete
  return {};
  for (const val of dataJson) {
    if (val["title"] == value) return;
  }
  //Check if value priority exists and get top 5;
  let tempObj = {};
  for (const priorityVal in priorityJson) {
    console.log(priorityVal);
  }
}
// buildResponse("Test");

function autocompleteHandler(request, response) {
  const url = request.url;
  const urlArray = url.split("/");
  const value = urlArray[1];

  response.writeHead(200, { "content-type": "application/json" });
  response.end(buildResponse(value));
}

module.exports = autocompleteHandler;
