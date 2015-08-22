angular.module('Weather', []) 

.controller('weather', function($scope, $http) {
    //  another test

    $scope.zip = "";
    $scope.placeholder = "zip...";
    $scope.units = "imperial";   // change this to "metric" for metric units
    $scope.isFahr = true;
    $scope.speedUnits = " mph";


    $scope.getWeather = function() {

        $http.get("http://api.openweathermap.org/data/2.5/weather?zip="+$scope.zip+",us&units="+$scope.units)
        .success(function(res) {

            //  stores the http success/fail code from response
            $scope.code = res.cod;
            //  check to make sure zip code was valid
            if ($scope.code !== "404") {

                $scope.weather = {
                    city : res.name,
                    description : res.weather[0].description,    // description of weather
                    currentTemp : res.main.temp + "°",
                    humidity : "humidity: " + res.main.humidity + "%",
                    min : "min: " + res.main.temp_min + "°",
                    max : "max: " + res.main.temp_max + "°",
                    wind : "wind: " + res.wind.speed + $scope.speedUnits,
                    cloudiness : "cloudiness: " + res.clouds.all + "%"
                };

                var timeStamp = res.dt;
                var date = new Date(timeStamp * 1000);
                $scope.time = date.getFullYear();

                var icon = res.weather[0].icon;

                //  match up the icon id with the icon
                for (var i=0; i < icons.length; i++) {
                    if (icons[i].id === icon) {
                        $scope.currentIcon = icons[i].name;
                        break;
                    }
                }

            } else {    // zip does not exist!
                reset();    // clear data
                $scope.weather.city = "City Not Found";
            }

            $scope.placeholder = $scope.zip;    // change placeholder to zip
            $scope.zip = "";    // clear input field

        });
    }

    //  checks if the data should be shown
    $scope.shouldShow = function() {
        //  check if it is a valid zipcode
        if ($scope.zip.length === 0) {
            reset();    // clear all previous data
            return false;
        } else {
            return true;
        }
    }

    //  clears the data fields
    var reset = function() {
        $scope.weather = {};
        $scope.currentIcon = "";
    }

    $scope.setF = function() {
        if ($scope.isFahr === false) {  // checks to make sure setting actually needs to be changed
            $scope.units = "imperial";
            $scope.isFahr = true;
            if ($scope.placeholder !== "zip...") {
                $scope.zip = $scope.placeholder;
                $scope.speedUnits = " mph";
                $scope.getWeather();
            }
        }
    }

    $scope.setC = function() {
        if ($scope.isFahr === true) {  // checks to make sure setting actually needs to be changed
            $scope.units = "metric";
            $scope.isFahr = false;
            if ($scope.placeholder !== "zip...") {
                $scope.zip = $scope.placeholder;
                $scope.speedUnits = " m/s";
                $scope.getWeather();
            }
        }
    }
    // Use once single toggle button is figured out
    $scope.toggleUnits = function() {
        if ($scope.isFahr === false) {
            $scope.isFahr = true;
            $scope.units = "imperial";
            $scope.speedUnits = " mph";
        } else {
            $scope.isFahr = false;
            $scope.units = "metric";
            $scope.speedUnits = " m/s";
        }
        if ($scope.placeholder !== "zip...") {
            $scope.zip = $scope.placeholder;
            $scope.getWeather();
        }
    }

    var icons = [
        {"id": "01d","name": "wi-day-sunny"},
        {"id": "01n","name": "wi-night-clear"},
        // {"id": "01n","name": "wi-stars"},    //  alternate version
        {"id": "02d","name": "wi-day-sunny"},
        {"id": "02n","name": "wi-night-clear"},
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
