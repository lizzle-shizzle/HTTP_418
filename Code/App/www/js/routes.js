angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
  

      .state('tabsController.workerYieldPerformance', {
    url: '/page2',
    views: {
      'tab1': {
        templateUrl: 'templates/workerYieldPerformance.html',
        controller: 'workerYieldPerformanceCtrl'
      }
    }
  })

  .state('tabsController.cropYield', {
    url: '/page3',
    views: {
      'tab2': {
        templateUrl: 'templates/cropYield.html',
        controller: 'cropYieldCtrl'
      }
    }
  })

  .state('tabsController', {
    url: '/page1',
    templateUrl: 'templates/tabsController.html',
    abstract:true
  })

  .state('splashScreen', {
    url: '/start',
    templateUrl: 'templates/splashScreen.html',
    controller: 'splashScreenCtrl'
  })

  .state('login', {
    url: '/page7',
    templateUrl: 'templates/login.html',
    controller: 'loginCtrl'
  })

  .state('about', {
    url: '/page8',
    templateUrl: 'templates/about.html',
    controller: 'aboutCtrl'
  })

$urlRouterProvider.otherwise('/start')

  

});