angular.module('YieldTypeModule').controller('YieldTypeController', ['$scope', '$http', 'toastr', function($scope, $http, toastr){
    
    $scope.createNew = false;    
    
	// set-up loading state
	$scope.createYieldTypeFrm = {
		loading: false
	};

    $scope.editYieldTypeFrm = {
        loading: false
    };

    $scope.$watch('frmEditYieldType', function(theForm) {
        if(theForm) {             
            $scope.frmEditYieldType.$setDirty();            
        }             
    });
    

    $scope.submitNew = function(item) {        
        // Set the loading state (i.e. show loading spinner)
        $scope.createYieldTypeFrm.loading = true;        

        // Submit request to Sails.
        if(!$scope.createNew) {
            $http.post('/yieldmeasurementType/add', {			
                yieldTypeID: $scope.createYieldTypeFrm.yieldType,
                orchidID: $scope.createYieldTypeFrm.orchid
            }).then(function onSuccess(sailsResponse){
                window.location = '/yieldmeasurementType/view';
            }).catch(function onError(sailsResponse){
                // Handle known error type(s).
            
                toastr.error('Something went wrong with adding a yield measurement type to your farm, please try again.\nThe error is:' + sailsResponse, 'Error');
                return;
            });
        } else {
            $http.post('/yieldmeasurementType/create', {			
                newYieldType: $scope.createYieldTypeFrm.newYieldType,
                orchidID: $scope.createYieldTypeFrm.orchid
            }).then(function onSuccess(sailsResponse){
                window.location = '/yieldType/view';
            }).catch(function onError(sailsResponse){
                // Handle known error type(s)

                toastr.error('Something went wrong with adding a yield measurement type to your farm, please try again.\nThe error is: ' + sailsResponse.data.message, 'Error');                
                return;
            });
        }
    }

    $scope.submitEdit = function(item) {        
        // Set the loading state (i.e. show loading spinner)
        $scope.editYieldTypeFrm.loading = true;        

        // Submit request to Sails.
        if(!$scope.createNew) {
            $http.post('/yieldmeasurementType/update', {			
                yieldTypeID: $scope.editYieldTypeFrm.yieldType,
                orchidID: $scope.editYieldTypeFrm.orchid
            }).then(function onSuccess(sailsResponse){
                window.location = '/yieldType/view';
            }).catch(function onError(sailsResponse){
                // Handle known error type(s).
            
                toastr.error('Something went wrong with editing a yield measurement type to your farm, please try again.\nThe error is:' + sailsResponse.data.message, 'Error');
                return;
            });
        }
    }

    $scope.indexChanged = function() {        
        //Force a valid form by adding junk data to newYieldType input, or make the inout visible to enable creating a new Yield type
        $scope.createYieldTypeFrm.newYieldType = "some value";
        if($scope.createYieldTypeFrm.yieldType == 'New') {
            $scope.createNew = true;  
            $scope.createYieldTypeFrm.newYieldType = "";            
        }
    }  
}]);