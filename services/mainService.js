//myApp.service('myService', function() {});

myApp.service('mainService', function() {
    var theme = 'bs4';

    return {
        getTheme: function() {
            return theme;
        },
        setTheme: function(str) {
            theme = str;
        }
    }
});