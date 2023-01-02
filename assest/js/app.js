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
            document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + city.value + "')";
        });
}

var getFiveDaysForeCasting = () => {

    var fiveDay = "https://api.openweathermap.org/data/2.5/forecast?q=" + city.value + "&units=imperial&APPID=" + apiKey;

    fetch(fiveDay)
        .then(function (data) {
            return data.json();
        })
        .then(function (data) {

            let fiveDayForecastHTML = `<div">

            <hr><h4 class="text-center">05 more days weather situations</h4>`;

            for (let i = 0; i < data.list.length; i++) {
                let dateofday = data.list[i];
                let dayTime = dateofday.dt;
                let timeZone = data.city.timezone;
                let timeZoneHours = timeZone / 60 / 60;
                let thisMoment = moment.unix(dayTime).utc().utcOffset(timeZoneHours);
                let iconURL = "https://openweathermap.org/img/w/" + dateofday.weather[0].icon + ".png";

                if (thisMoment.format("HH:mm:ss") === "11:00:00" || thisMoment.format("HH:mm:ss") === "12:00:00" || thisMoment.format("HH:mm:ss") === "13:00:00") {

                    fiveDayForecastHTML += `<div class="medium-3 columns">
                    <div class="card fiveday-card">
                        <div class="card-divider">
                            <h5>${thisMoment.format("DD MMM YYYY")}</h5>
                        </div>
                        <img src="${iconURL}">
                        <div class="card-section">
                            <h4>Temp: ${dateofday.main.temp}&#8457;</h4>
                            <p>Feel like: ${dateofday.main.feels_like}%</p>
                            <p>Humidity: ${dateofday.main.humidity}%</p>
                        </div>
                    </div>
                </div>`;
                }
            }
            fiveDayForecastHTML += `</div>`;
            $('#five-day-forecast').html(fiveDayForecastHTML);
        });
};


var getFiveDaysForeCasting = () => {

    var fiveDay = "https://api.openweathermap.org/data/2.5/forecast?q=" + city.value + "&units=imperial&APPID=" + apiKey;

    fetch(fiveDay)
        .then(function (data) {
            return data.json();
        })
        .then(function (data) {

            let fiveDayForecastHTML = `<div">

            <hr><h4 class="text-center">05 more days weather situations</h4>`;

            for (let i = 0; i < data.list.length; i++) {
                let dateofday = data.list[i];
                let dayTime = dateofday.dt;
                let timeZone = data.city.timezone;
                let timeZoneHours = timeZone / 60 / 60;
                let thisMoment = moment.unix(dayTime).utc().utcOffset(timeZoneHours);
                let iconURL = "https://openweathermap.org/img/w/" + dateofday.weather[0].icon + ".png";

                if (thisMoment.format("HH:mm:ss") === "11:00:00" || thisMoment.format("HH:mm:ss") === "12:00:00" || thisMoment.format("HH:mm:ss") === "13:00:00") {

                    fiveDayForecastHTML += `<div class="medium-3 columns">
                    <div class="card fiveday-card">
                        <div class="card-divider">
                            <h5>${thisMoment.format("DD MMM YYYY")}</h5>
                        </div>
                        <img src="${iconURL}">
                        <div class="card-section">
                            <h4>Temp: ${dateofday.main.temp}&#8457;</h4>
                            <p>Feel like: ${dateofday.main.feels_like}%</p>
                            <p>Humidity: ${dateofday.main.humidity}%</p>
                        </div>
                    </div>
                </div>`;
                }
            }
            fiveDayForecastHTML += `</div>`;
            $('#five-day-forecast').html(fiveDayForecastHTML);
        });
};

function getWForeCasting() {
    getCurrentWeather();
    getFiveDaysForeCasting();
}

getWForeCasting();
submitBtn.addEventListener("click", getWForeCasting);