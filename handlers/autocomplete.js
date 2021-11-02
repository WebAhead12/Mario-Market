const fs = require("fs");
const path = require("path");

const AUTOCOMPLETE_NUM = 5;

let priorityJson = require(__dirname + "/../Data/priority.json");
const dataJson = require(__dirname + "/../Data/products.json");

//Runs once on server start up and updates/removes priority list with any missing/extra values.
function updatePriorityList() {
  let tempObj = {};
  for (const val of dataJson) {
    tempObj[val["title"]] = priorityJson[val["title"]] || 0;
  }
  priorityJson = tempObj;
  fs.writeFileSync(__dirname + "/../Data/priority.json", JSON.stringify(priorityJson, undefined, 2));
}
updatePriorityList();

//Increment the priority of an item.
function incrementValue(val) {
  priorityJson[val] = priorityJson[val] + 1;
  fs.writeFileSync(__dirname + "/../Data/priority.json", JSON.stringify(priorityJson, undefined, 2));
}

function buildResponse(value) {
  const priorityJsonClone = Object.assign({}, priorityJson);
  value = decodeURI(value);
  let tempObj = {};

  for (const priorityVal in priorityJson) {
    if (priorityVal.slice(0, value.length).toLowerCase() == value) tempObj[priorityVal] = priorityJsonClone[priorityVal];
    // if (priorityVal.toLowerCase().indexOf(value) === 0) tempObj[priorityVal] = priorityJson[priorityVal];
  }
  //Check if value is complete
  delete tempObj[value];

  //Get sorted array of the objects.
  let tempArr = Object.entries(tempObj).sort((a, b) => b[1] - a[1]);
  //convert first 5 entries into an object
  return tempArr.slice(0, Math.min(AUTOCOMPLETE_NUM, tempArr.length)).map((val) => val[0]);
}

function autocompleteHandler(request, response) {
  const url = request.url;
  const urlArray = url.split("/");
  const value = urlArray[2];

  response.writeHead(200, { "content-type": "application/json" });
  response.end(JSON.stringify(buildResponse(value.toLowerCase())));
}

module.exports = { autocompleteHandler, incrementValue };
