'use strict';

var overview = angular.module("sher.overview", ["chart.js"]);

overview.controller("tableCtrl", function ($scope) {
  $scope.data = [{
		"id": 1,
		"name": "task1",
		"docker_image": "1",
		"slave_hostname": "1",
		"cpus": 1,
		"mem": 1
	},{
		"id": 2,
		"name": "task2",
		"docker_image": "2",
		"slave_hostname": "2",
		"cpus": 2,
		"mem": 2
	},{
		"id": 3,
		"name": "task3",
		"docker_image": "3",
		"slave_hostname": "3",
		"cpus": 3,
		"mem": 3
	}]
});

overview.controller("pcpuCtrl", function ($scope) {
  $scope.labels = ["Download Sales", "In-Store Sales", "Mail-Order Sales"];
  $scope.data = [300, 100, 100];
});

overview.controller("pmemCtrl", function ($scope) {
  $scope.labels = ["Download Sales", "In-Store Sales", "Mail-Order Sales"];
  $scope.data = [200, 500, 100];
});

overview.controller("pnetCtrl", function ($scope) {
  $scope.labels = ["Download Sales", "In-Store Sales", "Mail-Order Sales"];
  $scope.data = [300, 500, 400];
});
