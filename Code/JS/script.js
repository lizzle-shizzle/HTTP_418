var app = angular.module('Harvest', []);
app.controller('selectCultivationFrequency', function($scope) {
$scope.cultivationFrequency = [
	{"Name" : "Monthly", "Description" : "Collect crop on a monthly basis."},
	{"Name" : "Weekly", "Description" : "Collect crop on a weekly basis."},
	{"Name" : "Daily", "Description" : "Collect crop on a daily basis."},
	{"Name" : "Annually", "Description" : "Collect crop on an annual basis."}
];
});