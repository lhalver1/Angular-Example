myApp.controller('TableController', function MyCtrl($scope, $timeout, mainService) {
    $scope.name = 'Superhero';
    $scope.editing = false;
    $scope.themeName = mainService.getTheme();

    $scope.$watch(function() {return mainService.getTheme();}, function(newVal, oldValue) {
        if (newVal) {
            $scope.themeName = newVal;
            console.log("TABLECTRL: Theme switched to: " + newVal);
        }
    }, true);

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