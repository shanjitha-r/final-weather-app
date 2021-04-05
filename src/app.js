
function displayTemperature(response){

    let cityElement = document.querySelector("#city");
    let temperatureElement = document.querySelector("#temperature");
    let descriptionElement = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity");
    let windElement = document.querySelector("#wind");
    let iconElement = document.querySelector("#icon");
    
    cityElement.innerHTML= response.data.name;
    temperatureElement.innerHTML= Math.round(response.data.main.temp);
    descriptionElement.innerHTML= response.data.weather[0].description;
    humidityElement.innerHTML= response.data.main.humidity;
    windElement.innerHTML= Math.round(response.data.wind.speed);
    iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    iconElement.setAttribute("alt", response.data.weather[0].description);
}
let apiKey = "42b57b52a827badd57ef4bf4ca7a62ce";
let city= "Toronto";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

console.log (apiUrl);
axios.get(apiUrl).then(displayTemperature);

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