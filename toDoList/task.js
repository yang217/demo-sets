/**
 * Created by leonard on 2017/1/16.
 */

let toDoList = (() => {
  let input;
  let addBtn;
  let list;
  let init = (inputId, addBtnId, listId) => {
    input = document.getElementById(inputId);
    addBtn = document.getElementById(addBtnId);
    list = document.getElementById(listId);
    addBtn.addEventListener('click', addTask);
    for (let task of list.children) {
      // listen click event on close button
      task.firstElementChild.addEventListener('click', removeTask);
      // listen click event on task to tick off
      task.addEventListener('click', tickTask);
    }
};
  let addTask = (event) => {
    event.preventDefault();
    let inputText = input.value;
    if (inputText === '') {
      alert('Please input task first!');
      return;
    }
    input.value = '';
    let li = document.createElement("li");
    li.className = 'toDo-item"';
    let t = document.createTextNode(inputText);
    li.appendChild(t);
    let close = document.createElement("span");
    close.className = 'close';
    close.innerHTML= '&times';
    close.addEventListener('click', removeTask);
    li.appendChild(close);
    li.addEventListener('click', tickTask);
    list.appendChild(li);
  };
  let removeTask = (event) => {
    list.removeChild(event.target.parentNode);
  };
  let tickTask = (event) => {
    let target = event.target;
    if (target.className.includes('checked') === true) {
      target.className = target.className.substr(0, target.className.length - ' checked'.length);
    }
    else {
      event.target.className += ' checked';
    }
  };
  return {
    init: init
  }
})();

toDoList.init('toDo-input', 'addBtn', 'toDo-list');
