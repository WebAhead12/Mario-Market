const http = require("http");
const router = require("./router");
const fs = require("fs");
const path = require("path");

const server = http.createServer(router);

server.listen(process.env.PORT || 3000, () =>
  console.log(`Listening at http://localhost:3000`)
);

let priorityJson = require("./Data/priority.json");
const dataJson = require("./Data/products.json");

//Runs once on server start up and updates/removes priority list with any missing/extra values.
function updatePriorityList() {
  let tempObj = {};
  for (const val of dataJson) {
    tempObj[val["title"]] = priorityJson[val["title"]] || 0;
  }
  priorityJson = tempObj;
  fs.writeFileSync(
    "./Data/priority.json",
    JSON.stringify(priorityJson, undefined, 2)
  );
}
updatePriorityList();