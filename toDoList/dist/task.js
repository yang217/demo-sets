'use strict';

/**
 * Created by leonard on 2017/1/16.
 */

var toDoList = function () {
  var input = void 0;
  var addBtn = void 0;
  var list = void 0;
  var init = function init(inputId, addBtnId, listId) {
    input = document.getElementById(inputId);
    addBtn = document.getElementById(addBtnId);
    list = document.getElementById(listId);
    addBtn.addEventListener('click', addTask);
    var length = list.children.length;
    for (var i = 0; i < length; i++) {
      // listen click event on close button
      var task = list.children[i];
      task.firstElementChild.addEventListener('click', removeTask);
      // listen click event on task to tick off
      task.addEventListener('click', tickTask);
      console.log('fuck!');
    }
  };
  var addTask = function addTask(event) {
    event.preventDefault();
    var inputText = input.value;
    if (inputText === '') {
      alert('Please input task first!');
      return;
    }
    input.value = '';
    var li = document.createElement("li");
    li.className = 'toDo-item"';
    var t = document.createTextNode(inputText);
    li.appendChild(t);
    var close = document.createElement("span");
    close.className = 'close';
    close.innerHTML = '&times';
    close.addEventListener('click', removeTask);
    li.appendChild(close);
    li.addEventListener('click', tickTask);
    list.appendChild(li);
  };
  var removeTask = function removeTask(event) {
    list.removeChild(event.target.parentNode);
  };
  var tickTask = function tickTask(event) {
    var target = event.target;
    if (target.className.includes('checked') === true) {
      target.className = target.className.substr(0, target.className.length - ' checked'.length);
    } else {
      event.target.className += ' checked';
    }
  };
  return {
    init: init
  };
}();

toDoList.init('toDo-input', 'addBtn', 'toDo-list');
//# sourceMappingURL=task.js.map