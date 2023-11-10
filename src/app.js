function updateWeather(response) {
  let temperatureElement = document.querySelector(".temperature");
  let temperature = Math.round(response.data.temperature.current);
  temperatureElement.innerHTML = temperature;
  city.innerHTML = response.data.city;
  country.innerHTML = response.data.country;

  let weatherDescription = document.querySelector(".weather-description");
  weatherDescription.innerHTML = response.data.condition.description;

  let humidity = document.querySelector(".humidity");
  humidity.innerHTML = response.data.temperature.humidity + "%";

  let wind = document.querySelector(".wind");
  wind.innerHTML = response.data.wind.speed + " km/h";
  console.log(response.data);
}

function searchCity(city) {
  let apiKey = "35ee71bff3b1ft217b0aao934d002bd5";
  let apiURL = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
  axios.get(apiURL).then(updateWeather);
  console.log(apiURL);
}

function handleSearch(event) {
  event.preventDefault();
  let searchFormInput = document.querySelector("#search-input-field");
  searchCity(searchFormInput.value);
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearch);

searchCity("gothenburg");

let now = new Date();
let hour = now.getHours();
let minutes = now.getMinutes();
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
  "Saturday",
];

let day = days[now.getDay()];
let dayAndTime = document.querySelector(".day-hour");
dayAndTime.innerHTML = `${day} ${hour}:${minutes}`;
