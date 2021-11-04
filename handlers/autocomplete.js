const fs = require("fs");
const path = require("path");

const AUTOCOMPLETE_NUM = 5;

let priorityJson = require(path.join("..","Data","priority.json"));

//Increment the priority of an item.
function incrementValue(val) {
  priorityJson[val] = priorityJson[val] + 1;
  fs.writeFileSync(
    __dirname + "/../Data/priority.json",
    JSON.stringify(priorityJson, undefined, 2)
  );
}

function buildResponse(value) {
  value = decodeURI(value);
  let tempObj = {};

  for (const priorityVal in priorityJson) {
    // if (priorityVal.slice(0, value.length).toLowerCase() == value) tempObj[priorityVal] = priorityJsonClone[priorityVal];
    if (priorityVal.toLowerCase().indexOf(value) === 0)
      tempObj[priorityVal] = priorityJson[priorityVal];
  }
  //Remove same word from complete
  for (const tempVal in tempObj)
    if (tempVal.toLowerCase() == value) delete tempObj[tempVal];

  //Get sorted array of the objects.
  let tempArr = Object.entries(tempObj).sort((a, b) => b[1] - a[1]);
  //convert first 5 entries into an object
  return tempArr
    .slice(0, AUTOCOMPLETE_NUM)
    .map((val) => val[0]);
}

function autocompleteHandler(request, response) {
  const url = request.url;
  const urlArray = url.split("/");
  const value = urlArray[2];

  response.writeHead(200, { "content-type": "application/json" });
  response.end(JSON.stringify(buildResponse(value.toLowerCase())));
}

module.exports = { autocompleteHandler, incrementValue };
