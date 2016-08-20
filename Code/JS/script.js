var app = angular.module('Harvest', ['ngRoute']);
app.controller('selectCropType', function($scope) {
	$scope.cropType = [
	{"Type" : "Avocado", "Soil" : "Base"},
	{"Type" : "Mango", "Soil" : "Sour"},
	{"Type" : "Macadamia", "Soil" : "Dry"}
];
});

app.config(function($routeProvider/*, $locationProvider*/) {	
	$routeProvider
		.when('/CropType', {
			templateUrl: "./viewCropType.html",
			controller: "selectCropType"
		})
		.when('/Create', {
			templateUrl: "./createCroptype.html",
			controller: "Log"
		})
		.when("/Edit", {
			templateUrl: "./editCropType.html",
			controller: "selectCropType"
		})
		/*.otherwise({redirectTo: "/"})*/;
		//$locationProvider.html5Mode({enabled: true, requireBase: false});
});