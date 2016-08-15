angular.module('CropTypeModule').controller('CropTypeController', ['$scope', '$http', function($scope, $http){
    
	// set-up loading state
	$scope.frmCreateCropType = {
		loading: false
	};

    $scope.clicked = function() {        
        $scope.frmCreateCropType = {
            loading: true
        };
    }

    $scope.cropTypes = [
        {"Type": "Macadamia"},
        {"Type": "Mango"},
        {"Type": "Avocado"}
    ];

	/*$scope.submitSignupForm = function(){

		// Set the loading state (i.e. show loading spinner)
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