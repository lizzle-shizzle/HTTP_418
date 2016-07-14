var app = angular.module('Harvest', ['ngRoute']);
app.controller('selectOrchardBlock', function($scope) {
	$scope.orchardBlock = [
	{"Name":"Field 1", "CropYield":20, "Hectares":21.5, "RevenueGenerated":20124, "BlockDimentions":"12m X 16m", "CropType":"Mango", "IrrigationType":"Sprinkler", "DatePlanted":"2016-02-03", "CultivationFrequency":"Monthly", "YieldMeasurementType":"Basket"/*, "GPSCoordinates":"-26.158518, 28.257179"*/},
	{"Name":"Field 2", "CropYield":23, "Hectares":12, "RevenueGenerated":1512, "BlockDimentions":"4m X 3m", "CropType":"Mango", "IrrigationType":"Sprinkler", "DatePlanted":"2016-02-04", "CultivationFrequency":"Monthly", "YieldMeasurementType":"Basket"/*, "GPSCoordinates":"-26.158518, 28.257179"*/},
	{"Name":"Field 3", "CropYield":30, "Hectares":23.6, "RevenueGenerated":6262, "BlockDimentions":"12.2m X 16m", "CropType":"Mango", "IrrigationType":"Sprinkler", "DatePlanted":"2016-02-05", "CultivationFrequency":"Monthly", "YieldMeasurementType":"Basket"/*, "GPSCoordinates":"-26.158518, 28.257179"*/},
	{"Name":"Field 4", "CropYield":78, "Hectares":50, "RevenueGenerated":1515115, "BlockDimentions":"20m X 16m", "CropType":"Mango", "IrrigationType":"Sprinkler", "DatePlanted":"2016-02-06", "CultivationFrequency":"Monthly", "YieldMeasurementType":"Basket"/*, "GPSCoordinates":"-26.158518, 28.257179"*/}
];
});

app.config(function($routeProvider/*, $locationProvider*/) {	
	$routeProvider
		.when('/OrchardBlock', {
			templateUrl: "./viewOrchardBlock.html",
			controller: "selectOrchardBlock"
		})
		.when('/Create', {
			templateUrl: "./createOrchardBlock.html",
			controller: "selectOrchardBlock"
		})
		.when("/Edit", {
			templateUrl: "./editOrchardBlock.html",
			controller: "selectOrchardBlock"
		})
		.when("/", {
			templateUrl: ".",
			controller: "selectOrchardBlock"
		})
		.otherwise({redirectTo: "/"});
		//$locationProvider.html5Mode({enabled: true, requireBase: false});
});