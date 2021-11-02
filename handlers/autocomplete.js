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
  fs.writeFileSync(
    __dirname + "/../Data/priority.json",
    JSON.stringify(priorityJson, undefined, 2)
  );
}
updatePriorityList();

function incrementValue(val) {
  priorityJson[val] = priorityJson[val] + 1;
  fs.writeFileSync(
    __dirname + "/../Data/priority.json",
    JSON.stringify(priorityJson, undefined, 2)
  );
}

function buildResponse(value) {
  //Check if value is complete
  for (const val in priorityJson) {
    if (val == value) return;
  }
  let tempObj = {};
  for (const priorityVal in priorityJson) {
    if (
      priorityVal.slice(0, value.length).toLocaleLowerCase() ==
      value.toLowerCase()
    )
      tempObj[priorityVal] = priorityJson[priorityVal];
  }
  //Get sorted array of the objects.
  let tempArr = Object.entries(tempObj).sort((a, b) => b[1] - a[1]);
  //convert first 5 entries into an object
  tempObj = {};
  for (let i = 0; i < AUTOCOMPLETE_NUM && i < tempArr.length; i++)
    tempObj[i] = tempArr[i][0];
  return tempObj;
}

function autocompleteHandler(request, response) {
  const url = request.url;
  const urlArray = url.split("/");
  const value = urlArray[2];

  response.writeHead(200, { "content-type": "application/json" });
  response.end(JSON.stringify(buildResponse(value)));
}

module.exports = { autocompleteHandler, incrementValue };
