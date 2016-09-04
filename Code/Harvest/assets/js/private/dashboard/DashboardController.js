angular.module('DashboardModule').controller('DashboardController', ['$scope', function($scope){	
	$scope.orchardBlock = [
		{"Name":"Field 1"},
		{"Name":"Field 2"},
		{"Name":"Field 3"},
		{"Name":"Field 4"}
	];

	$scope.farm = [
		{"Size":20},
		{"Size":30}
	];/*
	dashboard: function(req, res){
		res.view('dashboard', {layout: 'layout'})*/
		
}]);
