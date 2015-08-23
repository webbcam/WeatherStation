angular.module('Weather', []) 

.controller('weather', function($scope, $http) {
    //  another test

    $scope.zip = "";
    $scope.placeholder = "zip...";
    $scope.units = "imperial";   // change this to "metric" for metric units
    $scope.isFahr = true;
    $scope.speedUnits = " mph";

    $scope.show = false;


    $scope.getWeather = function() {

        $http.get("http://api.openweathermap.org/data/2.5/forecast/daily?zip="+$scope.zip+",us&units="+$scope.units+"&cnt=4")
        .success(function(res) {

            //  stores the http success/fail code from response
            $scope.code = res.cod;
            //  check to make sure zip code was valid
            if ($scope.code !== "404") {

                var now = {
                    description : res.list[0].weather[0].description,
                    date : (new Date(res.list[0].dt * 1000)).toDateString(),
                    morningTemp : res.list[0].temp.morn,
                    dayTemp : res.list[0].temp.day,
                    eveTemp : res.list[0].temp.eve,
                    nightTemp : res.list[0].temp.night,
                    icon : getIcon(res.list[0].weather[0].icon)
                };

                var tomorrow = {
                    description : res.list[1].weather[0].description,
                    date : (new Date(res.list[1].dt * 1000)).toDateString(),
                    morningTemp : res.list[1].temp.morn,
                    dayTemp : res.list[1].temp.day,
                    eveTemp : res.list[1].temp.eve,
                    nightTemp : res.list[1].temp.night,
                    icon : getIcon(res.list[1].weather[0].icon)
                };

                var nextDay = {
                    description : res.list[2].weather[0].description,
                    date : (new Date(res.list[2].dt * 1000)),
                    day : days[(new Date(res.list[2].dt * 1000)).getDay()],
                    morningTemp : res.list[2].temp.morn,
                    dayTemp : res.list[2].temp.day,
                    eveTemp : res.list[2].temp.eve,
                    nightTemp : res.list[2].temp.night,
                    icon : getIcon(res.list[2].weather[0].icon)
                };

                $scope.weather = {
                    city : res.city.name + ", " + res.city.country,
                    now : now,
                    tom : tomorrow,
                    next : nextDay

                };


                var timeStamp = res.list[0].dt;
                var date = new Date(timeStamp * 1000);
                $scope.time = date.toDateString();

                $scope.show = true;

            } else {    // zip does not exist!
                reset();    // clear data
                if ($scope.zip === "") {
                    $scope.zip = "zip...";
                    $scope.show = false;
                } else {
                    $scope.show = false;
                    $scope.weather.city = "City Not Found";

                }
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

    //  returns the icon name of the specified weather icon
    var getIcon = function(iconName) {
        var icon_name = "";
        for (var i=0; i < icons.length; i++) {
            if (icons[i].id === iconName) {
                icon_name = icons[i].name;
                break;
            }
        }
        return icon_name;
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

    var days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];








});
