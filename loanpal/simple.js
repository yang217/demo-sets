/**
 * Created by leonard on 2017/2/10.
 */

// chat
var simpleChat = document.getElementsByClassName('contact-us-simple')[0];
var complexChat = document.getElementsByClassName('contact-us-complex')[0];
var closeChat = complexChat.getElementsByClassName('fa-close')[0];

simpleChat.onclick = function (event) {
  simpleChat.style.visibility = 'hidden';
  complexChat.style.visibility = 'visible';
};

closeChat.onclick = function (even) {
  simpleChat.style.visibility = 'visible';
  complexChat.style.visibility = 'hidden';
};

// navbar on mobile
// use white-top  as tag
var navBtn = document.getElementsByClassName('navbar-toggle')[0];
var nav = document.getElementsByClassName('navbar')[0];
navBtn.onclick = function () {
  if (!nav.classList.contains('affix') && !nav.classList.contains('white-top')) {
    nav.classList.add('affix');
    nav.classList.add('white-top');
  }
  else if (nav.classList.contains('affix') && nav.classList.contains('white-top')) {
    nav.classList.remove('affix');
    nav.classList.remove('white-top');
  }
};
