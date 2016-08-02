myApp.controller('TableController', function MyCtrl($scope, $timeout, mainService) {
    $scope.name = 'Superhero';
    $scope.editing = false;
    $scope.themeName = mainService.getTheme();

    $scope.$watch(mainService.getTheme(), function(newVal) {
        if (newVal) {
            console.log("Theme switched to: " + newVal);
            $scope.themeName = mainService.getTheme;
        }
    });

    $scope.selectedRow = null;
    $scope.rows = generateRows(Math.round(Math.random() * (5 - 1) + 1));


    $scope.selectTableRow = function (row) {
        if ($scope.selectedRow == row) {
            $scope.selectedRow = null;
        } else {
            $scope.selectedRow = row;
        }
    }

    $scope.editName = function () {
        $scope.editing = true;
    }

    function generateRows(x) {
        var rows = [], j = x;

        for (var i = 0; i < x; i++) {
            rows.push({
                col1: "Data" + i,
                col2: "Data" + j
            });
            j--;
        }

        return rows;
    }
    
});