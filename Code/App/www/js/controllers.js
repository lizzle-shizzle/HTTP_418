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
    $scope.yieldForm = {};
    $scope.yieldAmount = new Array();    
    //mock data
    $scope.cropTypes = ["Avocado", "Mango", "Litchi"];

    $scope.data = [
        {id: 9875131225687, name: "Fielie", amount: 5, cropType: "Mango"},
        {id: 4613548984113, name: "Piet", amount: 4, cropType: "Mango"},
        {id: 2354957878378, name: "Jan", amount: 6, cropType: "Mango"},
        {id: 9874515568784, name: "Johan", amount: 6, cropType: "Mango"},
        {id: 2123548789231, name: "Bota", amount: 2, cropType: "Avocado"},
        {id: 1234567889852, name: "Moses", amount: 7, cropType: "Avocado"},
        {id: 7851335459974, name: "Leshebogolo", amount: 6, cropType: "Avocado"},
        {id: 2315484113321, name: "Manie", amount: 1, cropType: "Avocado"},
        {id: 2345697452155, name: "Nkosi", amount: 9, cropType: "Avocado"},
        {id: 7412589632588, name: "Zuma", amount: 4, cropType: "Litchi"},
        {id: 6516787946131, name: "Malema", amount: 2, cropType: "Litchi"}
    ];

    /*Fetches data on load and processes the data to view in app*/
    //gets the middle of the data for the two columns
    $scope.middle = Math.ceil($scope.data.length/2);
    $scope.calculateMiddle = function() {        
        //gets the middle for number of elements containing cropType
        var count = 0;
        for(i in $scope.data) {
            if($scope.data[i].cropType == $scope.yieldForm.selectedCrop)
               count++;             
        }

        $scope.middle = Math.ceil(count/2);
       // alert($scope.yieldForm.selectedCrop);
    }
    //two data arrays for the two columns
    // $scope.col1 = new Array();
    // $scope.col2 = new Array();

    // for(i in data) {
    //     if(i < middle)
    //         $scope.col1.push(data[i]);
    //     else
    //         $scope.col2.push(data[i]);     
    // }

    function find(id, col) {
        //Finds the foreman in the selected column and returns the index of the found foreman
        var index = -1;
        if(col == 1) {
            for(i in $scope.col1) {
                if($scope.col1[i].id == id) {
                    index = i;
                    break;
                }
            }
        }

        if(col == 2) {
            for(i in $scope.col2) {
                if($scope.col2[i].id == id) {
                    index = i;
                    break;
                }
            }
        }

        return index;
    }

    $scope.logout = function() {
        //Logs out the user
        //When sessions are implemented the session will be cleared
        $state.go('splashScreen');

        return $ionicHistory.nextViewOptions({
            disableBack: true
        });
    }

    $scope.goHelp = function() {
        $state.go('help');
    }

    $scope.addOne = function(id, col) {
        var index = find(id, col);
        if(index >= 0) {
            if(col == 1) {
                $scope.col1[index].amount += 1;
            }

            if(col == 2) {
                $scope.col2[index].amount += 1;
            }
        } else alert("Cannot find foreman");
    }

    $scope.removeOne = function(id, col) {
        var index = find(id, col);
        if(index >= 0) {
            if(col == 1) {
                if($scope.col1[index].amount > 0)
                    $scope.col1[index].amount -= 1;
                else $scope.col1[index].amount = 0;
            }

            if(col == 2) {
                if($scope.col2[index].amount > 0)
                    $scope.col2[index].amount -= 1;
                else $scope.col2[index].amount = 0;
            }
        } else alert("Cannot find foreman");
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
 