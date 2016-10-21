angular.module('FarmModule').controller('FarmController', ['$scope', function($scope){

	// set-up loading state
	$scope.createFrm = {
		loading: false
	}

    $scope.editFrm = {
        loading: false
    }

	$scope.click = function(){
		// Set the loading state (i.e. show loading spinner)
		$scope.createFrm.loading = true;
        $scope.editFrm.loading = true;
	}

    $scope.Provinces = [
        "Eastern Cape",
        "Free State",
        "Gauteng",
        "Kwa-Zulu Natal",
        "Limpopo",
        "Mpumalanga",
        "Northern Cape",
        "North West",
        "Western Cape"    
    ];

}]);