'use strict';

angular.module('sher.auth')

.controller('LoginController',
    ['$scope', '$rootScope', '$state', 'AuthenticationService',
    function ($scope, $rootScope, $state, AuthenticationService) {
        // reset login status
        AuthenticationService.ClearCredentials();

        $scope.login = function () {
            $scope.dataLoading = true;
            AuthenticationService.Login($scope.username, $scope.password, function (response) {
                if (response.success) {
                    AuthenticationService.SetCredentials($scope.username, $scope.password);
                    $state.go('navbar.overview');
                } else {
                    $scope.error = response.message;
                    $scope.dataLoading = false;
                }
            });
        };
    }]);
