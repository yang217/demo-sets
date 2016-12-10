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

    var dotHelper = function (i) {
        return function () {
            showSlide(i);
        };
    };
    var init = function (slidesClass, dotsClass, prevId, nextId) {
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
        // add click listeners to arrays
        prev.addEventListener('click', showPrev);
        next.addEventListener('click', showNext);
    };
    var showSlide = function (n) {
        slides[currentIndex].style.display = 'none';
        dots[currentIndex].className = dots[currentIndex].className.replace(' active', '');
        slides[n].style.display = 'block';
        dots[n].className += ' active';
        currentIndex = n;
    };
    var showNext = function (event) {
        showSlide(currentIndex === length - 1 ? 0 : currentIndex + 1);
    };
    var showPrev = function (event) {
        showSlide(currentIndex === 0 ? length - 1 : currentIndex - 1);
    };
    return {
        'init': init
    }
}());

imgSlide.init('slide', 'dot', 'prev', 'next');
