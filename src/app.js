//DATE
let currentDate = new Date();
let h2 = document.querySelector("#date");
let hours = currentDate.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}

let minutes = currentDate.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let day = days[currentDate.getDay()];

h2.innerHTML = `${day}, ${hours}:${minutes}`;

function formatDay (timestamp){
let date = new Date(timestamp * 1000);
let day = date.getDay();
let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

return days [day];

}
function displayForcast (response){
  let forecast = response.data.daily;

    let forecastElement = document.querySelector("#forecast");
    let forecastHTML = `<div class = row>`;
    forecast.forEach(function(forecastDay, index){
      if (index < 6) {
forecastHTML = forecastHTML + `
            <div class = "col-2">
                <div class = "weather-forecast-date"> ${formatDay(forecastDay.dt)} </div>
                <img src = "http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png"
                
                alt=""
                width="50"/>
            <div class="weather-forcast-temperature">
                <span class ="weather-forcast-temperature-max"> ${Math.round (forecastDay.temp.max)}° | </span> 
                <span class ="weather-forcast-temperature-min">${Math.round(forecastDay.temp.min)}°</span>
            </div>
            </div>`;}
    })
    forecastHTML = forecastHTML + `</div>`;      
    forecastElement.innerHTML = forecastHTML; 
    
}
function getForecast(coordinates){
  let apiKey = "42b57b52a827badd57ef4bf4ca7a62ce";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForcast);
}

function displayTemperature(response){

    let cityElement = document.querySelector("#city");
    let temperatureElement = document.querySelector("#temperature");
    let descriptionElement = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity");
    let windElement = document.querySelector("#wind");
    let iconElement = document.querySelector("#icon");

    celsiusTemperature = response.data.main.temp;

    cityElement.innerHTML= response.data.name;
    temperatureElement.innerHTML= Math.round(response.data.main.temp);
    descriptionElement.innerHTML= response.data.weather[0].description;
    humidityElement.innerHTML= response.data.main.humidity;
    windElement.innerHTML= Math.round(response.data.wind.speed);
    iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    iconElement.setAttribute("alt", response.data.weather[0].description);

    getForecast(response.data.coord);
  }


function search (city){
    let apiKey = "42b57b52a827badd57ef4bf4ca7a62ce";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayTemperature);
}

function submitSearch (event){
    event.preventDefault();
    let cityInputElement = document.querySelector ("#city-input");
    search (cityInputElement.value);     
}

function displayFahrenheitTemperature (event){
    event.preventDefault();
    let temperatureElement = document.querySelector("#temperature");
    celsiusLink.classList.remove ("active");
    fahrenheitLink.classList.add ("active");
    let fahrenheitTemperature = (celsiusTemperature * 9)/5 + 32
    temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsiusTemperature (event) {
    event.preventDefault();
    let temperatureElement = document.querySelector("#temperature");
    celsiusLink.classList.add ("active");
    fahrenheitLink.classList.remove ("active");
    temperatureElement.innerHTML = Math.round(celsiusTemperature);
}
let celsiusTemperature = null;
let form = document.querySelector ("#search-form");
form.addEventListener("submit", submitSearch);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

search ("Toronto");  
