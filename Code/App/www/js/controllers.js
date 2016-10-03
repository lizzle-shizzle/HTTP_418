angular.module('app.controllers', [])
  
// .controller('workerYieldPerformanceCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// // You can include any angular dependencies as parameters for this function
// // TIP: Access Route Parameters for your page via $stateParams.parameterName
// function ($scope, $stateParams) {


// }])

// .controller('indexCtrl', ['$scope', function($scope) {
//     $scope.logout = function() {
//         $state.go('splashScreen');

//         // return $ionicHistory.nextViewOptions({
//         //     disableBack: true
//         // });
//     }
// }])
   
.controller('cropYieldCtrl', ['$scope', '$stateParams', '$state', '$ionicHistory', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $state, $ionicHistory) {
    $scope.logout = function() {
        $state.go('splashScreen');

        return $ionicHistory.nextViewOptions({
            disableBack: true
        });
    }

    $scope.goHelp = function() {
        $state.go('help');
    }
}])
      
// .controller('menuCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// // You can include any angular dependencies as parameters for this function
// // TIP: Access Route Parameters for your page via $stateParams.parameterName
// function ($scope, $stateParams) {


// }])
   
.controller('splashScreenCtrl', ['$scope', '$stateParams', '$ionicHistory', '$state', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $ionicHistory, $state) {
    $scope.toCropYield = function() {
        $state.go('cropYield');
    }
    
    return $ionicHistory.nextViewOptions({
        disableBack: true
    });
}])

.controller('helpCtrl', ['$scope', 
function($scope) {

}])
   
// .controller('loginCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// // You can include any angular dependencies as parameters for this function
// // TIP: Access Route Parameters for your page via $stateParams.parameterName
// function ($scope, $stateParams) {


// }])
   
// .controller('aboutCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// // You can include any angular dependencies as parameters for this function
// // TIP: Access Route Parameters for your page via $stateParams.parameterName
// function ($scope, $stateParams) {


// }])
 