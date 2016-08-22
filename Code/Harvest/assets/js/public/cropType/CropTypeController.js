angular.module('CropTypeModule').controller('CropTypeController', ['$scope', '$http', 'toastr', function($scope, $http, toastr){
    
    $scope.createNew = false;    
    
	// set-up loading state
	$scope.createCropTypeFrm = {
		loading: false
	};

    $scope.editCropTypeFrm = {
        loading: false
    };

    $scope.$watch('frmEditCropType', function(theForm) {
        if(theForm) { 
            //$scope.formDebugText = 'Form in Scope';
            //alert($scope.frmEditCropType.$dirty);
            $scope.frmEditCropType.$setDirty();
            //alert($scope.frmEditCropType.$dirty);
        }
        else {
            //$scope.formDebugText = 'Form is Undefined';
        }        
    });
    

    $scope.submitNew = function(item) {        
        // Set the loading state (i.e. show loading spinner)
        $scope.createCropTypeFrm.loading = true;        

        // Submit request to Sails.
        if(!$scope.createNew) {
            $http.post('/cropType/add', {			
                cropTypeID: $scope.createCropTypeFrm.cropType,
                orchidID: $scope.createCropTypeFrm.orchid
            }).then(function onSuccess(sailsResponse){
                window.location = '/cropType/view';
            }).catch(function onError(sailsResponse){
                // Handle known error type(s).
            
                toastr.error('Something went wrong with adding a crop type to your farm, please try again.\nThe error is:' + sailsResponse, 'Error');
                return;
            });
        } else {
            $http.post('/cropType/create', {			
                newCropType: $scope.createCropTypeFrm.newCropType,
                orchidID: $scope.createCropTypeFrm.orchid
            }).then(function onSuccess(sailsResponse){
                window.location = '/cropType/view';
            }).catch(function onError(sailsResponse){
                // Handle known error type(s)

                toastr.error('Something went wrong with adding a crop type to your farm, please try again.\nThe error is: ' + sailsResponse.data.message, 'Error');                
                return;
            });
        }
    }

    $scope.submitEdit = function(item) {        
        // Set the loading state (i.e. show loading spinner)
        $scope.editCropTypeFrm.loading = true;        

        // Submit request to Sails.
        if(!$scope.createNew) {
            $http.post('/cropType/update', {			
                cropTypeID: $scope.editCropTypeFrm.cropType,
                orchidID: $scope.editCropTypeFrm.orchid
            }).then(function onSuccess(sailsResponse){
                window.location = '/cropType/view';
            }).catch(function onError(sailsResponse){
                // Handle known error type(s).
            
                toastr.error('Something went wrong with editing a crop type to your farm, please try again.\nThe error is:' + sailsResponse.data.message, 'Error');
                return;
            });
        }
    }

    $scope.indexChanged = function() {        
        //Force a valid form by adding junk data to newCropType input, or make the inout visible to enable creating a new crop type
        $scope.createCropTypeFrm.newCropType = "some value";
        if($scope.createCropTypeFrm.cropType == 'New') {
            $scope.createNew = true;  
            $scope.createCropTypeFrm.newCropType = "";            
        }
    }  
}]);