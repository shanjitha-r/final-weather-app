
function displayTemperature(response){

    let cityElement = document.querySelector("#city");
    let temperatureElement = document.querySelector("#temperature");
    let descriptionElement = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity");
    let windElement = document.querySelector("#wind");
    
    cityElement.innerHTML= response.data.name;
    temperatureElement.innerHTML= Math.round(response.data.main.temp);
    descriptionElement.innerHTML= response.data.weather[0].description;
    humidityElement.innerHTML= response.data.main.humidity;
    windElement.innerHTML= Math.round(response.data.wind.speed);

}
let apiKey = "42b57b52a827badd57ef4bf4ca7a62ce";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Toronto&appid=${apiKey}&units=metric`;

console.log (apiUrl);
axios.get(apiUrl).then(displayTemperature);