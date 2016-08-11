myApp.controller('IndexCtrl', function MyCtrl($scope, $timeout, mainService) {
    $scope.themeName = 'bs4';//mainService.getTheme();

    $scope.$watch('themeName', function(newValue, oldValue) {
        mainService.setTheme(newValue);
        console.log("Setting new theme");
    });
    
});