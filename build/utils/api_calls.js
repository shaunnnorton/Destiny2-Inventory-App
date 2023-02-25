"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _axios = _interopRequireDefault(require("axios"));
// Imports

require("dotenv").config(); //Initilize ENV 

var API_KEY = process.env.APIKEY; // Get API key

/**
 * Function to make an API call and return player's IDs
 * @param {string} player_string - username of the player to search for
 * @returns {object} Object containing useful information such as "DisplayName", "MemberType", "MembershipID"
 */
var get_id = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(player_string) {
    var id;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return _axios["default"].post("https://www.bungie.net/Platform/Destiny2/SearchDestinyPlayerByBungieName/-1", {
            displayName: "docthunder58",
            displayNameCode: "9451"
          }, {
            headers: {
              "X-API-KEY": API_KEY
            }
          });
        case 2:
          id = _context.sent;
          console.log(id.data);
          return _context.abrupt("return", id.data.Response);
        case 5:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function get_id(_x) {
    return _ref.apply(this, arguments);
  };
}();

/**
 * Function to make and API call and return profile
 * @param {string} mem_type - bungie Membership Type (provided by get_id())
 * @param {string} id - bungie Membership Id (provided by get_id())
 * @returns {object} Contains data from api call including last online and raw character data
 */
function get_profile(_x2, _x3) {
  return _get_profile.apply(this, arguments);
}
function _get_profile() {
  _get_profile = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(mem_type, id) {
    var profile;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _context6.next = 2;
          return _axios["default"].get("https://www.bungie.net/Platform/Destiny2/".concat(String(mem_type), "/Profile/") + "".concat(String(id), "/?components=100,205"), {
            headers: {
              "X-API-KEY": API_KEY
            }
          });
        case 2:
          profile = _context6.sent;
          return _context6.abrupt("return", profile.data);
        case 4:
        case "end":
          return _context6.stop();
      }
    }, _callee6);
  }));
  return _get_profile.apply(this, arguments);
}
;

/**
 * Makes an API call for the clan of a member
 * @param {string} mem_id - Bungie membership Id (provided by get_id()) 
 * @returns {object} - Object containing the members of a clan as well as clan name and desctiption.
 */
var get_clan = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(mem_id) {
    var info, res1, res2, new_info;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          info = {};
          _context2.next = 3;
          return _axios["default"].get("https://www.bungie.net/Platform/GroupV2/User/1/".concat(mem_id, "/0/1/"), {
            headers: {
              "X-API-KEY": API_KEY
            }
          });
        case 3:
          res1 = _context2.sent;
          info["name"] = res1.data.Response.results[0].group.name;
          info["desc"] = res1.data.Response.results[0].group.about;
          info["clan_id"] = res1.data.Response.results[0].group.groupId;
          _context2.next = 9;
          return _axios["default"].get("https://www.bungie.net/Platform//GroupV2/".concat(info.clan_id, "/Members/"), {
            headers: {
              "X-API-KEY": API_KEY
            }
          });
        case 9:
          res2 = _context2.sent;
          _context2.next = 12;
          return grab_members(res2.data.Response.results, info);
        case 12:
          new_info = _context2.sent;
          return _context2.abrupt("return", new_info);
        case 14:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return function get_clan(_x4) {
    return _ref2.apply(this, arguments);
  };
}();
/**
 * Cleans the data from a clan call
 * @param {Array} data - Array of users from clan call
 * @param {Object} info_store - the Object to store the member information
 * @returns {object} returns the data array with members modified to include membertype, name, online, and lastOnline
 */
var grab_members = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(data, info_store) {
    var i;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          info_store.members = [];
          for (i = 0; i < data.length; i++) {
            info_store.members.push({
              memType: data[i].memberType,
              name: data[i].destinyUserInfo.displayName,
              online: data[i].isOnline,
              lastOnline: data[i].lastOnlineStatusChange
            });
          }
          return _context3.abrupt("return", info_store);
        case 3:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return function grab_members(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

/**
 * Makes API call to bungie Manifest
 * @param {string} hash - Hash to query the Manifest for 
 * @param {string} type - Type of to search the Manifest for Class or Equipment
 * @returns {object} Object containing the name and icon of the item matching the hash
 */
var manifest_call = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(hash, type) {
    var types, response;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          types = {
            "class": "DestinyClassDefinition",
            "equipment": "DestinyInventoryItemDefinition"
          };
          _context4.next = 3;
          return _axios["default"].get("https://www.bungie.net/Platform/Destiny2/Manifest/".concat(types[type], "/").concat(hash + "", "/"), {
            headers: {
              "X-API-KEY": API_KEY
            }
          });
        case 3:
          response = _context4.sent;
          return _context4.abrupt("return", {
            "name": response.data.Response.displayProperties.name,
            "icon": response.data.Response.displayProperties.icon
          });
        case 5:
        case "end":
          return _context4.stop();
      }
    }, _callee4);
  }));
  return function manifest_call(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

/**
 * Makes and API call to get the light and class of a character
 * @param {string} char_id - The id of the character to query for
 * @param {string} mem_type - The membership type of the player to query for
 * @param {string} mem_id - The membership id of the player to query for
 * @returns {object} Object containing the character data class and light
 */
var character_info = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(char_id, mem_type, mem_id) {
    var character, response, type;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          character = {};
          _context5.next = 3;
          return _axios["default"].get("https://www.bungie.net/Platform/Destiny2/".concat(mem_type, "/Profile/").concat(mem_id, "/Character/").concat(char_id, "/?components=200"), {
            headers: {
              "X-API-KEY": API_KEY
            }
          });
        case 3:
          response = _context5.sent;
          character["light"] = response.data.Response.character.data.light;
          _context5.next = 7;
          return manifest_call(response.data.Response.character.data.classHash, "class");
        case 7:
          type = _context5.sent;
          character["class"] = type.name;
          return _context5.abrupt("return", character);
        case 10:
        case "end":
          return _context5.stop();
      }
    }, _callee5);
  }));
  return function character_info(_x9, _x10, _x11) {
    return _ref5.apply(this, arguments);
  };
}();
module.exports = {
  get_id: get_id,
  get_profile: get_profile,
  get_clan: get_clan,
  manifest_call: manifest_call,
  character_info: character_info
};
//# sourceMappingURL=api_calls.js.map