/**
 * Main AngularJS Web Application
 */
var app = angular.module('myApp', ['ngRoute']);

/**
 * Configure the Routes
 */
app.config(['$routeProvider', function ($routeProvider) {
  
  // This line is for browser-sync only (to be removed)
  //$httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

  $routeProvider
    // Accueil
    .when('/', {
      templateUrl: 'snippets/accueil.html',
      controller: 'PageCtrl'
    })
    // Pages
    .when('/apropos', {
      templateUrl: 'snippets/apropos.html',
      controller: 'PageCtrl'
    })
    .when('/carte', {
      templateUrl: 'snippets/carte.html',
      controller: 'PageCtrl'
    })
    .when('/contact', {
      templateUrl: 'snippets/contact.html',
      controller: 'PageCtrl'
    })
    // else 404
    .otherwise('/404', {
      templateUrl: 'snippets/404.html',
      controller: 'PageCtrl'
    });
}]);

/**
 * Controls all other Pages
 */
app.controller('PageCtrl', function (/* $scope, $location, $http */) {
  
  console.log("Page Controller reporting for duty.");

  // Activates the Carousel
  $('.carousel').bcSwipe({ threshold: 50 });

});