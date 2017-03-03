(function() {
    'use strict';

    var photoString = `photo.jpg, Warsaw, 2013-09-05 14:08:15
john.png, London, 2015-06-20 15:13:22
myFriends.png, Warsaw, 2013-09-05 14:07:13
Eiffel.jpg, Paris, 2015-07-23 08:03:02
pisatower.jpg, Paris, 2015-07-22 23:59:59
BOB.jpg, London, 2015-08-05 00:02:03
notredame.png, Paris, 2015-09-01 12:00:00
me.jpg, Warsaw, 2013-09-06 15:40:22
a.png, Warsaw, 2016-02-13 13:33:50
b.jpg, Warsaw, 2016-01-02 15:12:22
c.jpg, Warsaw, 2016-01-02 14:34:30
d.jpg, Warsaw, 2016-01-02 15:15:01
e.png, Warsaw, 2016-01-02 09:49:09
f.png, Warsaw, 2016-01-02 10:55:32
g.jpg, Warsaw, 2016-02-29 22:13:11`;
    // console.log(photoString);
    var photoArrayFromString = photoString.split('\n');
    var newDataStr = photoArrayFromString[0];
    // var newDataArray = newDataStr.split(', ');
    // console.log(moment(newDataArray[2]))
    var initialValue = {}
    var reducerFunc = function reducerFunc(initObj, line) {
    	var city = (line.split(',')[1]).trim();
        if (!initObj[city]) {
            initObj[city] = [];
        } else {
            // initObj[city] += 1
        }
        return initObj
    }
    var finalResult = {};
    finalResult = photoArrayFromString.reduce(reducerFunc, initialValue);
    


    // console.log(photoArrayFromString);
    for (var i = 0; i < photoArrayFromString.length; i++) {
        var line = photoArrayFromString[i];
        var city = (line.split(',')[1]).trim();
        if (city in finalResult) {
        	finalResult[city].push(line);
        }
        
    }
    // console.log(finalResult);
    var finalString = '';
    for (var city in finalResult) {
    	for (var i = 0; i < finalResult[city].length; i++) {
    		var value = (finalResult[city][i].split(',')[1]).trim();
    		var extension = finalResult[city][i].substring(finalResult[city][i].indexOf('.'), finalResult[city][i].indexOf(','))
    		var postFix = (finalResult[city].length >= 10 && finalResult[city].length < 100) ? '0' : ''; 
    		finalString += (value + postFix + i + extension + '\n');
    	}
    }
    console.log(finalString);

})();
