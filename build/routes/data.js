"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _express = require("express");

var _api_calls = _interopRequireDefault(require("../utils/api_calls.js"));

var _translate = _interopRequireDefault(require("../utils/translate.js"));

//Imports
// Initializes Router
var router = (0, _express.Router)(); //--------------------------------ROUTES---------------------------------------
// Route returning an object containing character information for a player

router.post("/:username/characters", /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var characters;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _translate["default"].translate_inventory_items(req.body.player);

          case 2:
            characters = _context.sent;
            res.send(characters);

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}()); // Route returning an object containing the id information of the username

router.post("/:username/id", /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var id;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _api_calls["default"].get_id(req.params.username)["catch"](function (err) {
              console.log(err);
            });

          case 2:
            id = _context2.sent;
            res.send(id[0]);

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}()); // Route returning an object containing the profile information from the
// type and id prvided

router.post("/:username/profile", /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var type, id, profile;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            type = req.body.type;
            id = req.body.id;
            _context3.next = 4;
            return _api_calls["default"].get_profile(type, id);

          case 4:
            profile = _context3.sent;
            res.send(profile);

          case 6:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}()); // Route returning an object containing the clan information from memberid
// provided

router.post("/:username/clan", /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var clan_raw, clan;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return _api_calls["default"].get_clan(req.body.member_id);

          case 2:
            clan_raw = _context4.sent;
            _context4.next = 5;
            return _translate["default"].translate_clan_members(clan_raw);

          case 5:
            clan = _context4.sent;
            res.send(clan_raw);

          case 7:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function (_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}()); //-------------------------------END ROUTES-------------------------------------

var _default = router;
exports["default"] = _default;
//# sourceMappingURL=data.js.map