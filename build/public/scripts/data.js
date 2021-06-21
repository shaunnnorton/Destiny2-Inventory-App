"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var axios = window.axios;
var username_input = document.querySelector(".username");
var username_button = document.querySelector(".user_button");
var script_holder = document.querySelector(".script_holder");
var equipment_container = document.querySelector("#Equipment");
var clan_container = document.querySelector("#Clan");
var hidden_tag = document.getElementById("hidden_tag");
var profile = Object();
var member_id = '';
var member_type = '';
var display_name = '';
var clan = Object();
var characters = Object();
console.log(script_holder);
username_button.addEventListener("click", populate_data);

if (hidden_tag.value != null) {
  username_input.value = hidden_tag.value;
  populate_data();
}

function update_equipment() {
  equipment_container.innerHTML = "";
  var equipment_title = document.createElement("h1"); //id_equipment_label

  var equipment_list_contain = document.createElement("div"); //id_equipment_list

  equipment_title.id = "equipment_label";
  equipment_list_contain.id = "equipment_list";
  equipment_title.classList.add("row", "text-center", "font-weight-bold");
  equipment_title.innerHTML = display_name;
  equipment_list_contain.classList.add("list-group", "container");

  for (var _char in characters) {
    var character_button = document.createElement('button');
    character_button.classList.add("equipment_item", "list-group-item", "list-group-item-action", "row", "text-center");
    character_button.innerHTML = "".concat(characters[_char]["class"], " ").concat(characters[_char].light);
    var character_list = document.createElement("ul");
    character_list.classList.add("row", "equipment_list_items", "list-group");
    character_list.style.display = "none";

    for (var item in characters[_char].items) {
      //console.log(characters[char].items[item])
      var list_element = document.createElement("li");
      list_element.classList.add("col", "list-group-item");
      list_element.innerHTML = "<img src=http://www.bungie.net".concat(characters[_char].items[item].icon, ">") + "<strong>".concat(characters[_char].items[item].name, "</strong>");
      character_list.appendChild(list_element);
    }

    equipment_list_contain.appendChild(character_button);
    equipment_list_contain.appendChild(character_list);
  }

  equipment_container.appendChild(equipment_title);
  equipment_container.appendChild(equipment_list_contain);
}

function update_clan() {
  clan_container.innerHTML = "";
  var clan_label = document.createElement("h1");
  clan_label.id = "clan_name";
  clan_label.classList.add("row");
  clan_label.innerHTML = clan.name;
  var clan_div = document.createElement("div");
  clan_div.id = "players";
  clan_div.classList.add("list-group", "row");

  for (var member in clan.members) {
    var member_label = document.createElement("p");
    member_label.classList.add("clan_member", "list-group-item-action", "list-group-item");

    if (clan.members[member].online == true) {
      member_label.innerHTML = "<a href=\"/".concat(clan.members[member].name, "\"><i>[").concat(clan.members[member].memType, "]</i> <strong>").concat(clan.members[member].name, "</strong> is online</a>");
    } else {
      member_label.innerHTML = "<a href=\"/".concat(clan.members[member].name, "\"><i>[").concat(clan.members[member].memType, "]</i> <strong>").concat(clan.members[member].name, "</strong> is Offline (").concat(clan.members[member].lastOnline, ")</a>");
    }

    clan_div.appendChild(member_label);
  }

  clan_container.appendChild(clan_label);
  clan_container.appendChild(clan_div);
}

function populate_data() {
  return _populate_data.apply(this, arguments);
}

function _populate_data() {
  _populate_data = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    var remove_script, username, manage_script;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            remove_script = document.getElementById("MAINSCRIPT");

            if (remove_script) {
              remove_script.remove();
            }

            username = username_input.value;
            _context.next = 5;
            return get_id(username);

          case 5:
            _context.next = 7;
            return get_profile(username);

          case 7:
            _context.next = 9;
            return get_clan(username);

          case 9:
            _context.next = 11;
            return get_characters(username);

          case 11:
            //console.log([member_id,member_type,display_name,characters,clan])
            update_equipment();
            update_clan();
            manage_script = document.createElement("script");
            manage_script.src = "scripts/main.js";
            manage_script.id = "MAINSCRIPT";
            script_holder.insertAdjacentElement("afterend", manage_script);
            return _context.abrupt("return", true);

          case 18:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _populate_data.apply(this, arguments);
}

function get_id(_x) {
  return _get_id.apply(this, arguments);
}

function _get_id() {
  _get_id = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(username) {
    var id;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return axios.post("/".concat(username, "/id"))["catch"](function (err) {
              return console.log(err);
            });

          case 2:
            id = _context2.sent;
            member_id = id.data.membershipId;
            member_type = id.data.membershipType;
            display_name = id.data.displayName; //console.log([member_id,member_type,display_name])

          case 6:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _get_id.apply(this, arguments);
}

function get_profile(_x2) {
  return _get_profile.apply(this, arguments);
}

function _get_profile() {
  _get_profile = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(username) {
    var user;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return axios.post("/".concat(username, "/profile"), {
              type: member_type,
              id: member_id
            });

          case 2:
            user = _context3.sent;
            profile = user.data; //console.log(user.data)

          case 4:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _get_profile.apply(this, arguments);
}

function get_clan(_x3) {
  return _get_clan.apply(this, arguments);
}

function _get_clan() {
  _get_clan = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(username) {
    var response;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return axios.post("/".concat(username, "/clan"), {
              member_id: member_id
            })["catch"](function (err) {
              return console.log(err);
            });

          case 2:
            response = _context4.sent;
            //console.log(response)
            clan = response.data;

          case 4:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));
  return _get_clan.apply(this, arguments);
}

function get_characters(_x4) {
  return _get_characters.apply(this, arguments);
}

function _get_characters() {
  _get_characters = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(username) {
    var response;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return axios.post("/".concat(username, "/characters"), {
              player: profile
            })["catch"](function (err) {
              return console.log(err);
            });

          case 2:
            response = _context5.sent;
            characters = response.data;

          case 4:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));
  return _get_characters.apply(this, arguments);
}
//# sourceMappingURL=data.js.map