"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
//Imports

// Initializes Router
var router = (0, _express.Router)();

//--------------------------------ROUTES---------------------------------------

// Route to render the page with no gamertag provided
router.get("/", function (req, res) {
  var gamertag = null;
  res.render("home", {
    gamertag: gamertag
  });
});

// Router to render the home page with a gamertag provided
router.get("/:username", function (req, res) {
  res.render("home", {
    gamertag: req.params.username
  });
});

//--------------------------------ROUTES---------------------------------------
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=main.js.map