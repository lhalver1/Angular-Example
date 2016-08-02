myApp.controller('IndexCtrl', function MyCtrl($scope, $timeout, mainService) {
    $scope.name = 'Superhero';
    $scope.editing = false;
    $scope.themeName = 'bs4';//mainService.getTheme();

    $scope.$watch('themeName', function(newValue, oldValue) {
        mainService.setTheme(newValue);
        console.log("Setting new theme");
    });

    $scope.editName = function () {
        $scope.editing = true;
    }
    
});