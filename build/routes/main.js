"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var router = (0, _express.Router)();
router.get("/", function (req, res) {
  var gamertag = null;
  res.render("home", {
    gamertag: gamertag
  });
});
router.get("/:username", function (req, res) {
  res.render("home", {
    gamertag: req.params.username
  });
});
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=main.js.map