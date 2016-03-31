'use strict';

// Declare app level module which depends on views, and components
angular.module('sher', [
  'ui.router',
  'sher.task',
  'sher.detail',
  'sher.overview',
  'sher.auth',
  'ngRoute',
  'ngCookies'
])

.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider) {
  $stateProvider
	  .state("login", {
        url: "/login",
        templateUrl: "/app/js/templates/login.html",
        controller: 'LoginController'
      }).state("navbar", {
        templateUrl: "/app/js/templates/navbar.html"
      })
      .state("navbar.task", {
        url: "/task?query",
        templateUrl: "/app/js/templates/task.html",
        controller: 'TaskCtrl'
      }).state("navbar.detail", {
        url: "/task/:taskID",
        templateUrl: "/app/js/templates/task.detail.html",
        controller: ''
      }).state("navbar.overview", {
        url: "/overview",
        templateUrl: "/app/js/templates/overview.html",
        controller: ''
      });
  //$locationProvider.html5Mode({enabled:true, requireBase:false});
  $locationProvider.html5Mode({enabled:true});
  $urlRouterProvider.otherwise('/login');
}])

.run(['$rootScope', '$state', '$cookieStore', '$http',
		function ($rootScope, $state, $cookieStore, $http) {
			// keep user logged in after page refresh
			$rootScope.globals = $cookieStore.get('globals') || {};
			if ($rootScope.globals.currentUser) {
				//    $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; 
			}

			$rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams, options) {
				// redirect to login page if not logged in
				if (toState.name !== 'login' && !$rootScope.globals.currentUser) {
					event.preventDefault(); 
					$state.go('login');
				}
			});
		}]);
