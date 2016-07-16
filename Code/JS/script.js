var app = angular.module('Harvest', []);
app.controller('selectIrrigation', function($scope) {
$scope.irrigation = [
	{"Name" : "Surface", "Description" : "Water the surface of the orchard."},
	{"Name" : "Sprinkler", "Description" : "Water the orchard with a sprinkler."},
	{"Name" : "Drip/trickle", "Description" : "Trickle water the orchard."},
	{"Name" : "Subsurface", "Description" : "Water the subsurface of the orchard."}
];
});