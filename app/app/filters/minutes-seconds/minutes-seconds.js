'use strict';

angular.module('pdsc')
  .filter('minutesSeconds', ['moment', function (moment) {
    return function (input) {
        var minutes = Math.floor(parseInt(input) / 60);
        var seconds = input - minutes * 60;
        return minutes + ':' + moment(seconds, 'ss').format('ss');
    };
  }]);