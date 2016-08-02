var myApp = angular.module('myApp', ['ngRoute']);

// configure our routes
myApp.config(function($routeProvider) {
    $routeProvider

        // route for the home page
        .when('/', {
            templateUrl : 'views/home.html',
            controller  : 'MyCtrl'
        })

        // route for the about page
        .when('/table', {
            templateUrl : 'views/table.html',
            controller  : 'TableController'
        })

});