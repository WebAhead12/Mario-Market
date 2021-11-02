const homeHandler = require("./handlers/home");
const publicHandler = require("./handlers/public");
const autocompleteHandler = require("./handlers/autocomplete");
const dataHandler = require("./handlers/data");
const missingHandler = require("./handlers/missing");

function router(request, response) {
  const url = request.url;
  if (url === "/") {
    homeHandler(request, response);
  } else if (url.includes("public")) {
    publicHandler(request, response);
  } else if (url.includes("autocomplete")) {
    autocompleteHandler.autocompleteHandler(request, response);
  } else if (url.includes("data")) {
    dataHandler(request, response);
  } else {
    missingHandler(request, response);
  }
}

module.exports = router;
