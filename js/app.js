(function() {
    console.log('My Project has been loaded!');

    function moveOn() {
        var answer = confirm('Sure Ready to Move on!');
        console.log(answer);
        if (!answer) {
            window.location = 'http://ebay.com';
        }
    }

    function _id(id) {
        return document.getElementById(id);
    }

    function _class(cls) {
        return document.getElementsByClassName(cls);
    }

    function _quSeAll(x) {
        return document.querySelectorAll(x);
    }

    var headingOne = _id('headingOne');
    console.log(headingOne);

    var heading = document.getElementsByTagName('h1'),
        paraOne = _class('paraOne'),
        divTwo = _quSeAll('.divTwo');
    console.log(heading); // heading is an array
    console.log(heading.length);
    for (var i = 0; i < heading.length; i++) {
        heading[i].style.color = '#FF983A';
    }

    console.log(paraOne);
    console.log(paraOne.length);


    console.log(divTwo);

    for (var i = 0; i < divTwo.length; ++i) {
        divTwo[i].style.backgroundColor = '#494DFF';
        divTwo[i].style.border = '1px solid #292929';
        divTwo[i].style.padding = '10px 5px';
    }





    // 1000 ms  = 1 sec;
    //setTimeout(moveOn, 5000);


})();
