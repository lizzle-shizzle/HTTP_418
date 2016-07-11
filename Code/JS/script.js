var app = angular.module('Harvest', []);
app.controller('editFarmer', function($scope) {
$scope.farmer = 
	{"FirstName" : "Tony", "LastName" : "Stark", "DOB" : "1970-12-31", "Email" : "tony.stark@gmail.com", "Password" : "Hello123"};
});