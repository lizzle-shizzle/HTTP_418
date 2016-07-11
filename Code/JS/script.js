var app = angular.module('Harvest', []);
	app.controller("checkOrch", function($scope) {
    $scope.orchards = ["A", "B", "C", "D"];
});
	app.controller('selectForeman', function($scope) {
    $scope.foremen = ["Sam", "Fred", "Lionel", "Simon"];
});