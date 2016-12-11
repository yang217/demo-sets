/**
 * Created by leonard on 2016/12/9.
 */

var imgSlide = (function () {
    var slides = [];
    var dots = [];
    var prev = null;
    var next = null;
    var length = 0;
    var currentIndex = 0;
    var clicked = false;
    var interval = 1500;

    var init = function (slidesClass, dotsClass, prevId, nextId, newInterval) {
        var i;
        // init attributes
        slides = document.getElementsByClassName(slidesClass);
        dots = document.getElementsByClassName(dotsClass);
        prev = document.getElementById(prevId);
        next = document.getElementById(nextId);
        length = slides.length;
        // hide other images and add click listener to dots
        for (i = 0; i < length; i++) {
            slides[i].style.display = 'none';
            dots[i].addEventListener('click', dotHelper(i));
        }
        slides[0].style.display = 'block';
        dots[0].className += ' active';
        // add click listeners to arrays
        prev.addEventListener('click', showPrev);
        next.addEventListener('click', showNext);
        // set loop
        interval = newInterval ? newInterval : interval;
        clicked = true;
        loop();
    };
    var dotHelper = function (i) {
        // used to set event listener to dot
        return function (event) {
            clicked = true;
            showSlide(i);
        };
    };
    var showSlide = function (n) {
        slides[currentIndex].style.display = 'none';
        dots[currentIndex].className = dots[currentIndex].className.replace(' active', '');
        slides[n].style.display = 'block';
        dots[n].className += ' active';
        currentIndex = n;
    };
    var showNext = function (event) {
        clicked = true;
        showSlide(currentIndex === length - 1 ? 0 : currentIndex + 1);
    };
    var showPrev = function (event) {
        clicked = true;
        showSlide(currentIndex === 0 ? length - 1 : currentIndex - 1);
    };
    var loop = function () {
        if (clicked) {
            clicked = false;
        }
        else {
            showNext();
        }
        setTimeout(loop, interval);
    };
    return {
        'init': init
    }
}());

imgSlide.init('slide', 'dot', 'prev', 'next');
