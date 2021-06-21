"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _express = _interopRequireDefault(require("express"));

var _expressHandlebars = _interopRequireDefault(require("express-handlebars"));

var _index = _interopRequireDefault(require("./routes/index.js"));

require("dotenv").config();

var app = (0, _express["default"])();
app.use(_express["default"]["static"](__dirname + "/public"));
app.use(_express["default"].json());
app.use(_express["default"].urlencoded({
  extended: false
}));
app.engine('handlebars', (0, _expressHandlebars["default"])({
  defaultLayout: 'main'
}));
app.set("view engine", 'handlebars');
app.set("views", "./src/views");
var port = process.env.PORT;
app.use("/", _index["default"].main);
app.use("/", _index["default"].data);
app.listen(port, function () {
  console.log("Destiny app listening on port ".concat(port));
});
//# sourceMappingURL=server.js.map