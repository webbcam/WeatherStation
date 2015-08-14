angular.module('Weather', []) 

.controller('weather', function($scope, $http) {

    $scope.zip = "";
    

    $scope.getWeather = function() {

        $http.get("http://api.openweathermap.org/data/2.5/weather?zip="+$scope.zip+",us&units=imperial")
        .success(function(res) {
            $scope.data = res;
            var icon = $scope.data.weather[0].icon;

            //  match up the icon id with the icon
            for (var i=0; i < icons.length; i++) {
                if (icons[i].id == icon) {
                    $scope.currentIcon = icons[i].name;
                    break;
                }
            }
        });
    }
    // $scope.getWeather();



    var icons = [
        {"id": "01d","name": "wi-day-sunny"},
        {"id": "01n","name": "wi-night-clear"},
        {"id": "02d","name": "wi-day-cloudy"},
        {"id": "02n","name": "wi-night-alt-cloudy"},
        {"id": "03d","name": "wi-day-sunny-overcast"},
        {"id": "03n","name": "wi-night-partly-cloudy"},
        {"id": "04d","name": "wi-day-cloudy"},
        {"id": "04n","name": "wi-night-alt-cloudy"},
        {"id": "09d","name": "wi-day-showers"},
        {"id": "09n","name": "wi-night-alt-showers"},
        {"id": "10d","name": "wi-day-rain"},
        {"id": "10n","name": "wi-night-alt-rain"},
        {"id": "11d","name": "wi-day-thunderstorm"},
        {"id": "11n","name": "wi-night-alt-thunderstorm"},
        {"id": "13d","name": "wi-day-snow"},
        {"id": "13n","name": "wi-night-alt-snow"},
        {"id": "50d","name": "wi-day-sprinkle"},
        {"id": "50n","name": "wi-night-alt-sprinkle"}
    ];








});