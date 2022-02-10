"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _express = _interopRequireDefault(require("express"));

var _expressHandlebars = _interopRequireDefault(require("express-handlebars"));

var _index = _interopRequireDefault(require("./routes/index.js"));

// Import and Set Enviornment Variables
require("dotenv").config(); // Imports


// Imports the routes for the server
// Initialize App
var app = (0, _express["default"])();
app.use(_express["default"]["static"](__dirname + "/public")); //Set Route for static files
//Set middleware

app.use(_express["default"].json());
app.use(_express["default"].urlencoded({
  extended: false
}));
app.engine('handlebars', (0, _expressHandlebars["default"])({
  defaultLayout: 'main'
}));
app.set("view engine", 'handlebars');
app.set("views", "./src/views"); // Sets the routes from the routes files.

app.use("/", _index["default"].main);
app.use("/", _index["default"].data);
var port = process.env.PORT; //Sets the port the server will listen to

app.listen(port, function () {
  console.log("Destiny app listening on port ".concat(port));
});
//# sourceMappingURL=server.js.map