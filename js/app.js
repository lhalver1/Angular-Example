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

myApp.directive('inputFocus', function($timeout, $parse) {
  return {
    //scope: true,   // optionally create a child scope
    link: function(scope, element, attrs) {
      var model = $parse(attrs.inputFocus);
      scope.$watch(model, function(value) {
        if(value === true) { 
          $timeout(function() {
            element[0].focus();

            if (element[0].setSelectionRange) {
                var len = element[0].value.length;
                element[0].setSelectionRange(len, len);
            }
            else {
                element[0].value = element[0].value;
            }

          });
        }
      });
      // on blur event:
      element.bind('blur', function() {
         scope.$apply(model.assign(scope, false));
      });
    }
  };
});