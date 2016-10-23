angular.module('OrchardBlockModule').controller('OrchardBlockController', ['$scope', '$http', function($scope, $http){
	changeOrchardBlock = function(){
		$http.get('/orchardBlock/populate').then(function onSuccess(sailsResponse){	
					console.log("Scope: " + $scope.frmViewOrchardBlock.orchardBlock);		
					$scope.data = sailsResponse.data.block;					
					for(i in $scope.data) {
						console.log("Scope for: " + $scope.data[i].id);	
						if ($scope.data[i].id == $scope.frmViewOrchardBlock.orchardBlock) {
							document.getElementById("orchName").innerHTML = $scope.data[i].name;
							document.getElementById("orchHect").innerHTML = $scope.data[i].hectares;
							document.getElementById("orchIrrigate").innerHTML = $scope.data[i].irrigationType[0];
							document.getElementById("orchCrop").innerHTML = $scope.data[i].cropType[0];
							document.getElementById("orchCult").innerHTML = $scope.data[i].cultivationFrequency[0];
							document.getElementById("orchYield").innerHTML = $scope.data[i].yieldMeasurementType[0];
							document.getElementById("orchDate").innerHTML = $scope.data[i].datePlanted;
						}
					}
				});
	}
}]);