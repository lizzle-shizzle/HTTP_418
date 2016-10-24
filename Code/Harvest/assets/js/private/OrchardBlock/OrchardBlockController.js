angular.module('OrchardBlockModule').controller('OrchardBlockController', ['$scope', '$http', function($scope, $http){
	changeOrchardBlock = function(orch){
		console.log(orch.value);
		$http.post('/orchardBlock/populate', {orchBlock: orch.value}).then(function onSuccess(sailsResponse){
					console.log("Scope: " + sailsResponse.data.irrig.toSource());		
					$scope.data = sailsResponse.data.block;
					document.getElementById("orchName").innerHTML = $scope.data.name;
					document.getElementById("orchHect").innerHTML = $scope.data.hectares;
					document.getElementById("orchIrrigate").innerHTML = sailsResponse.data.irrig[0].name;
					document.getElementById("orchCrop").innerHTML = sailsResponse.data.cro[0].name;
					document.getElementById("orchCult").innerHTML = sailsResponse.data.cult[0].name;
					document.getElementById("orchYield").innerHTML = sailsResponse.data.yield[0].name;
					document.getElementById("orchDate").innerHTML = $scope.data.datePlanted;					
				});
	}
}]);