myApp.controller('IndexCtrl', function MyCtrl($scope, $timeout, mainService) {
    $scope.name = 'Superhero';
    $scope.editing = false;
    $scope.themeName = mainService.getTheme();

    $scope.$watch($scope.themeName, function(newVal) {
        if (newVal) {
            mainService.setTheme($scope.themeName);
        }
    });

    $scope.editName = function () {
        $scope.editing = true;
    }
    
});