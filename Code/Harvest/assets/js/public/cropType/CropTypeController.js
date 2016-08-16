angular.module('CropTypeModule').controller('CropTypeController', ['$scope', '$http', 'toastr', function($scope, $http, toastr){
    
    $scope.createNew = false;    
    
	// set-up loading state
	$scope.createCropTypeFrm = {
		loading: false
	};

    $scope.submitNew = function(item) {        
        // Set the loading state (i.e. show loading spinner)
        $scope.createCropTypeFrm.loading = true;

        //get farm id in custom data attribute

        // Submit request to Sails.
        if(!$scope.createNew) {
            $http.post('/cropType/add', {			
                cropTypeID: $scope.createCropTypeFrm.cropType,
                orchidID: $scope.createCropTypeFrm.orchid
            }).then(function onSuccess(sailsResponse){
                window.location = '/cropType';
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
                window.location = '/cropType';
            }).catch(function onError(sailsResponse){
                // Handle known error type(s)

                toastr.error('Something went wrong with adding a crop type to your farm, please try again.\nThe error is: ' + sailsResponse.data.message, 'Error');                
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

    $scope.cropTypes = [
        {"Type": "Macadamia"},
        {"Type": "Mango"},
        {"Type": "Avocado"}
    ];    
	/*$scope.submitSignupForm = function(){
		
		$scope.createProfileFrm.loading = true;

		// Submit request to Sails.
		$http.post('/signup', {			
			fname: $scope.createProfileFrm.fname,
			lname: $scope.createProfileFrm.lname,
			birthdate: $scope.createProfileFrm.birthdate,
			email: $scope.createProfileFrm.email,
			password: $scope.createProfileFrm.password
		})
		.then(function onSuccess(sailsResponse){
			window.location = '/farm/new';

		})
		.catch(function onError(sailsResponse){

		// Handle known error type(s).
		// If using sails-disk adpater -- Handle Duplicate Key
		var emailAddressAlreadyInUse = sailsResponse.status == 409;

		if (emailAddressAlreadyInUse) {
			toastr.error('That email address has already been taken, please try again.', 'Error');
			return;
		}

		})
		.finally(function eitherWay(){
			$scope.createProfileFrm.loading = false;
		})
	}

	$scope.submitLoginForm = function (){

        // Set the loading state (i.e. show loading spinner)
        $scope.loginForm.loading = true;

        // Submit request to Sails.
        $http.put('/login', {
        email: $scope.loginForm.email,
        password: $scope.loginForm.password
        })
        .then(function onSuccess (){
        // Refresh the page now that we've been logged in.
        window.location = '/';
        })
        .catch(function onError(sailsResponse) {

        // Handle known error type(s).
        // Invalid username / password combination.
        if (sailsResponse.status === 400 || 404) {
            // $scope.loginForm.topLevelErrorMessage = 'Invalid email/password combination.';
            //
            toastr.error('Invalid email/password combination.', 'Error', {
            closeButton: true
            });
            return;
        }

                    toastr.error('An unexpected error occurred, please try again.', 'Error', {
                        closeButton: true
                    });
                    return;

        })
        .finally(function eitherWay(){
        $scope.loginForm.loading = false;
        });
    };*/

}]);