var cDate = document.querySelector('.cDate');
var cName = document.querySelector('.cityName');
var celsius = document.querySelector('.celsius');
var imgIcon = document.querySelector('.imgIcon');
var cMinMax = document.querySelector('.cMinMax');
var cFeel = document.querySelector('.cFeel');
var cWind = document.querySelector('.wind');
var cHumidity = document.querySelector('.humidity');
var mainBackground = document.querySelector('#main-background');

var city = document.querySelector('#sCity');
var submitBtn = document.querySelector('#submitBtn');

var apiKey = "0060eaa04b33f5f3c1022821bc49909c";

var getCurrentWeather = () => {


    var url = "https://api.openweathermap.org/data/2.5/weather?q=" + city.value + "&appid=" + apiKey;
    fetch(url)
        .then(function (respose) {
            return respose.json();
        })
        .then(function (data) {
            cName.textContent = data.name;
            celsius.textContent = ((data.main.temp) * 9 / 5 - 459).toFixed(1) + 'F';
            cMinMax.textContent = "Min : " + ((data.main.temp_min) * 9 / 5 - 459).toFixed(1) + 'F' + ' | Max : ' + ((data.main.temp_max) * 9 / 5 - 459).toFixed(1) + 'F';
            cFeel.textContent = 'Feel Like : ' + ((data.main.feels_like) * 9 / 5 - 459).toFixed(1) + 'F'
            cWind.textContent = 'Wind : ' + data.wind.speed + " mph";
            cHumidity.textContent = 'Humidity : ' + data.main.humidity + ' %';
            var currIcon = "https://openweathermap.org/img/w/" + data.weather[0].icon + ".png";
            imgIcon.src = currIcon;
            cDate.textContent = (moment.unix(data.dt).utc().utcOffset(data.timezone / 60 / 60)).format("DD MMM YYYY");
        });
}

function getWForeCasting() {
    getCurrentWeather();
}

getWForeCasting();
submitBtn.addEventListener("click", getWForeCasting);



