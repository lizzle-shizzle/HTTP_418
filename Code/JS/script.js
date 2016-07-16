var app = angular.module('Harvest', []);
	app.controller('selectIrrigation', function($scope) {
    $scope.irrigation = ["Surface", "Sprinkler", "Drip/trickle", "Subsurface"];
});