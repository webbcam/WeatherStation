angular.module('Weather', []) 

.controller('weather', function($scope, $http) {

    $scope.zip = "";
    $scope.units = "imperial"   // change this to "metric" for metric units


    $scope.getWeather = function() {

        // clear any previous data
        $scope.checkZip();

        $http.get("http://api.openweathermap.org/data/2.5/weather?zip="+$scope.zip+",us&units="+$scope.units)
        .success(function(res) {
            $scope.code = res.cod;
            $scope.city = res.name; // name of city
            $scope.description = res.weather[0].description;    // description of weather
            $scope.currentTemp = res.main.temp + "°";   //  current Temperature
            $scope.humidity = "humidity: " + res.main.humidity + "%";
            $scope.min = "min: " + res.main.temp_min + "°";
            $scope.max = "max: " + res.main.temp_max + "°";
            $scope.wind = "wind: " + res.wind.speed + " mph";
            $scope.cloudiness = "cloudiness: " + res.clouds.all + "%";

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

    //  checks if there is a valid zipcode
    $scope.checkZip = function() {
        //  check if it is a valid zipcode (4 or 5 digits and a valid city)
        if ($scope.zip.length < 4 || $scope.zip.length > 5 ||$scope.code === "404") {
            reset();    // clear all previous data
            return false;
        } else {
            return true;
        }
    }

    //  clears the data fields
    var reset = function() {
        $scope.city = "";
        $scope.description = "";
        $scope.currentTemp = "";
        $scope.humidity = "";
        $scope.min = "";
        $scope.max = "";
        $scope.wind = "";
        $scope.cloudiness = "";
        $scope.currentIcon = "";

    }

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