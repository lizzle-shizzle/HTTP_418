var app = angular.module('Harvest', []);
	app.controller("selectSeason", function($scope) {
    $scope.seasons = ["Summer", "Autumn", "Spring", "Winter"];
});