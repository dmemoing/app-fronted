'use strict';

var detail = angular.module('sher.detail',['ngMaterial', 'ngMessages', 'material.svgAssetsCache', 'chart.js', 'ui.router']);

detail.controller("mesCtrl", ['$scope', '$http', '$stateParams', 'Tasks',
	function($scope, $http, $stateParams, Tasks){
	//	console.log($stateParams.taskID);
	//	Tasks.refresh();
	//	$scope.data = Tasks.getById($stateParams.taskID);
		$http.get('data/ID.json').success(function(data) {
			$scope.data = data.result;
		});
	}
]);

detail.controller("cpuCtrl", function ($scope, $http) {

	$scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
	$scope.series = ['Series A', 'Series B'];
	$scope.data = [
		[28, 48, 40, 19, 86, 27, 90],
		[30, 49, 40, 9, 86, 27, 90],
	];
	setInterval(function(){
		$http.get('data/status.json').success(function(data) {
			$scope.series = ['Series A', 'Series B'];
            $scope.data = [
                [65, 59, 80, 81, 56, 55, 40],
                [28, 48, 40, 19, 86, 27, 90]
			];
		});
	},10000)
});

detail.controller("memCtrl", function ($scope, $http) {

	$scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
	$scope.series = ['Series A', 'Series B'];
	$scope.data = [
		[28, 42, 41, 19, 86, 27, 90],
		[30, 56, 40, 14, 80, 23, 91],
	];
	setInterval(function(){
		$http.get('data/status.json').success(function(data) {
			$scope.series = ['Series A', 'Series B'];
            $scope.data = [
                [65, 59, 80, 81, 56, 55, 40],
                [22, 44, 49, 12, 81, 22, 94]
			];
		});
	},10000)
});
