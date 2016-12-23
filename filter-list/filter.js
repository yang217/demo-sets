/**
 * Created by leonard on 2016/12/23.
 */

var filter = function () {
    var input = document.getElementById('name-input');
    var ul = document.getElementById('my-ul');
    var li = ul.getElementsByTagName('li');
    input.addEventListener('keyup', function (e) {
        var a;
        var filter = e.target.value.toUpperCase();
        var header = null; // save header li
        var matched = false; // whether there is a match in one header block
        for (var i = 0; i < li.length; i++) {
            a = li[i].getElementsByTagName('a')[0];
            if (a.className === 'header') {
                console.log(header, matched);
                if(header !== null) {
                    if(!matched) {
                        // no match in the header block
                        header.style.display = 'none';
                    }
                }
                header = a;
                matched = false;
                continue;
            }
            if (a.innerText.toUpperCase().indexOf(filter) === -1) {
                li[i].style.display = 'none'
            }
            else {
                li[i].style.display = 'block';
                matched = true;
            }
        }
    });
}();
