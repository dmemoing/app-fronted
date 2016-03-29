'use strict';

// Declare app level module which depends on views, and components
angular.module('sher', [
  'ui.router',
  'sher.task',
  'sher.detail',
  'sher.overview'
]).
config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/task');

  $stateProvider
      .state("task", {
        url: "/task?query",
        templateUrl: "/app/js/templates/task.html",
        controller: 'TaskCtrl'
      }).state("detail", {
        url: "/task/:taskID",
        templateUrl: "/app/js/templates/task.detail.html",
        controller: ''
      }).state("overview", {
        url: "/overview",
        templateUrl: "/app/js/templates/overview.html",
        controller: ''
      });
}]);
