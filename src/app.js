
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
}

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

h2.innerHTML = `${day},${hours}:${minutes}`;
  let now = new Date();

    new Intl.DateTimeFormat('default',
        {
            hour12: true,
            hour: 'numeric',
            minute: 'numeric'
        }).format(now);

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
