

var app = angular.module("myapp", ['ngRoute']);
app.config(function($routeProvider, $locationProvider) {
  $locationProvider.html5Mode(true);
  $routeProvider

  .when('/', {
    templateUrl : 'pages/exchangeRatePage.html',
  controller: 'exchangeRateController'
  })
  .otherwise({
    redirectTo: '/'
});

});