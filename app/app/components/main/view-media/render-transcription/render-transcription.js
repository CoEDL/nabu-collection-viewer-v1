'use strict';

angular.module('pdsc')
  .directive('renderTranscription', [ 
    '$location', 
    '$anchorScroll', 
    '_',
    '$timeout',
    '$routeParams',
    function ($location, $anchorScroll, _, $timeout, $routeParams) {
    return {
      templateUrl: 'app/components/main/view-media/render-transcription/render-transcription.html',
      restrict: 'E',
      scope: {
          transcription: '=',
          eopas: '=',
          currentTime: '=',
          name: '@',
          play: '&'
      },
      link: function postLink(scope) {
          scope.highlight = {};
          scope.st = false;
          scope.se = false;
          scope.selected = {};
          scope.available = {};

          scope.set = function() {
              if ($routeParams.type && $routeParams.segment && $routeParams.selected) {
                  if ($routeParams.type === 'transcript') {
                      scope.st = true;
                      scope.selected.transcript = $routeParams.selected; 
                  } else if ($routeParams.type === 'interlinear') {
                      scope.se = true;
                      scope.selected.interlinear = $routeParams.selected;
                  }
                  scope.currentTime = $routeParams.segment;
              } else {
                  try {
                      scope.selected.transcript = scope.available.transcripts[0];
                      scope.selected.interlinear = scope.available.interlinear[0];
                  } catch (e) {
                  }
              }
          };

          scope.$watch('transcription', function() {
              if (scope.transcription === undefined) { 
                  return;
              }
              scope.available.transcripts = _.keys(scope.transcription).sort();
              scope.set()
              scope.load('transcript');
              if (scope.available.transcripts.length > 1) {
                  scope.transcriptsSelector = true;
              }
          }, true);

          scope.$watch('eopas', function() {
              if (scope.eopas === undefined) {
                  return;
              }
              scope.available.interlinear = _.keys(scope.eopas).sort();
              scope.set();
              scope.load('interlinear');
              if (scope.available.interlinear.length > 1) {
                  scope.interlinearTextsSelector = true;
              }
          }, true);

          scope.load = function(what) {
              $timeout(function() {
                  if (what === 'transcript') {
                    scope.transcript = scope.transcription[scope.selected.transcript];
                  } else if (what === 'interlinear') {
                    scope.interlinearText = scope.eopas[scope.selected.interlinear];
                  }
              }, 100);
          };

      }
    };
  }]);
