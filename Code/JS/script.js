var app = angular.module('Harvest', []);
	app.controller('selectForeman', function($scope) {
    $scope.foremen = ["Samuel", "Josef", "Thabo"];
});