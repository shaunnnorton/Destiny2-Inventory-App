"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _api_calls = _interopRequireDefault(require("./api_calls.js"));
// Imports

/**
 * Translates the role type and lastOnline date of a clan to human readable formats
 * @param {object} clan - clan object to be translated 
 * @returns {boolean} returns true when finished
 */
var translate_clan_members = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(clan) {
    var roles, i, lastOnDateMS, LOD;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          roles = {
            "5": "Founder",
            "4": "Founder",
            "3": "Admin",
            "2": "Member",
            "1": "Beginner"
          };
          for (i = 0; i < clan.members.length; i++) {
            clan.members[i].memType = roles[clan.members[i].memType];
            lastOnDateMS = Date.now().valueOf() - Number(clan.members[i].lastOnline);
            LOD = new Date(lastOnDateMS);
            clan.members[i].lastOnline = LOD.toLocaleString();
          }
          return _context.abrupt("return", true);
        case 3:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function translate_clan_members(_x) {
    return _ref.apply(this, arguments);
  };
}();

/**
 * Translates teh inventory items and character items of a player object to human readable formats
 * @param {object} player - Player object to translate inventory of 
 * @returns {object[]} Array of objects containing characters and their items, class and lights
 */
var translate_inventory_items = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(player) {
    var inventory, _char, char_number, player_info, t_items, i, item, call;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          inventory = [];
          _context2.t0 = _regenerator["default"].keys(player.characterEquipment.data);
        case 2:
          if ((_context2.t1 = _context2.t0()).done) {
            _context2.next = 22;
            break;
          }
          _char = _context2.t1.value;
          char_number = _char;
          _context2.next = 7;
          return _api_calls["default"].character_info(char_number, player.profile.data.userInfo.membershipType, player.profile.data.userInfo.membershipId);
        case 7:
          player_info = _context2.sent;
          t_items = [];
          _context2.t2 = _regenerator["default"].keys(player.characterEquipment.data[_char].items);
        case 10:
          if ((_context2.t3 = _context2.t2()).done) {
            _context2.next = 19;
            break;
          }
          i = _context2.t3.value;
          item = player.characterEquipment.data[_char].items[i];
          _context2.next = 15;
          return _api_calls["default"].manifest_call(item.itemHash, "equipment");
        case 15:
          call = _context2.sent;
          t_items.push(call);
          _context2.next = 10;
          break;
        case 19:
          inventory.push({
            items: t_items,
            "class": player_info["class"],
            light: player_info.light
          });
          _context2.next = 2;
          break;
        case 22:
          return _context2.abrupt("return", inventory);
        case 23:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return function translate_inventory_items(_x2) {
    return _ref2.apply(this, arguments);
  };
}();
module.exports = {
  translate_clan_members: translate_clan_members,
  translate_inventory_items: translate_inventory_items
}; //Export Functions
//# sourceMappingURL=translate.js.map