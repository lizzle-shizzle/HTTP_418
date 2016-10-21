angular.module('MainModule').controller('MainController', ['$scope', function($scope){

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

}]);
