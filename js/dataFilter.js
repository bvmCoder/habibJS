(function() {
    'use strict';

    angular.module('dummyApp', []);
    console.log(angular.module('dummyApp'));

    var dataController = function dataController() {
        var self = this;
        self.airLineData = ['Chekced Bags', 'Overweight / Oversize baggage Fees', 'In-flight Refreshments', 'Flight-changes fees', 'Airport Lounge day-passes', 'Phone reservation fees', 'Pet-kennel fees'];
        console.log(self);
    };

   angular.module('dummyApp')
          .controller('dataController', dataController);

})();
