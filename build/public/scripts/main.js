"use strict";

var buttons = document.querySelectorAll('.equipment_item');
var items_list = document.querySelectorAll('.equipment_list_items');
console.log(buttons, items_list);
var Character1 = items_list[0];
var Character2 = items_list[1];
var Character3 = items_list[2];
buttons[0].addEventListener('click', function (e) {
  if (items_list[0].style.display != 'none') {
    items_list[0].style.display = 'none';
  } else {
    items_list[0].style.display = 'flex';
  }
});
buttons[1].addEventListener('click', function (e) {
  if (items_list[1].style.display != 'none') {
    items_list[1].style.display = 'none';
  } else {
    items_list[1].style.display = 'flex';
  }
});
buttons[2].addEventListener('click', function (e) {
  if (items_list[2].style.display != 'none') {
    items_list[2].style.display = 'none';
  } else {
    items_list[2].style.display = 'flex';
  }
});
//# sourceMappingURL=main.js.map