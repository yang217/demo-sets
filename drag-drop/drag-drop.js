/**
 * Created by leonard on 2016/12/5.
 */

var textNode = document.getElementsByClassName("text")[0];

var handleDragText = function (event) {
    "use strict";
    event.dataTransfer.setData("Text", event.target.innerText);
    console.log("begin to drag text");
};

var textAimNode = document.getElementsByClassName("text-aim")[0];

var handleDragEnter = function (event) {
    "use strict";
    event.preventDefault();
};

var handleDragOver = function (event) {
    "use strict";
    event.preventDefault();
};

var handleDropText = function (event) {
    "use strict";
    event.preventDefault();
    event.target.innerText = event.dataTransfer.getData("Text");
};

var imgNode = document.getElementById("avatar");

var handleDragImg = function (event) {
    "use strict";
    event.dataTransfer.setData("Text", event.target.id);
    console.log("begin to drag img:", event.target.id);
};

var imgAimNode = document.getElementsByClassName("avatar-aim")[0];

var handleDropImg = function (event) {
    "use strict";
    console.log("hhh");
    event.preventDefault();
    console.log("hhh");
    var id = event.dataTransfer.getData("Text");
    if (id === "avatar") {
        event.target.appendChild(document.getElementById(id));
    }
};

textNode.addEventListener("dragstart", handleDragText, false);
textAimNode.addEventListener("dragenter", handleDragEnter, false);
textAimNode.addEventListener("dragover", handleDragOver, false);
textAimNode.addEventListener("drop", handleDropText, false);

imgNode.addEventListener("dragstart", handleDragImg, false);
imgAimNode.addEventListener("dragenter", handleDragEnter, false);
imgAimNode.addEventListener("dragover", handleDragOver, false);
imgAimNode.addEventListener("drop", handleDropImg, false);
