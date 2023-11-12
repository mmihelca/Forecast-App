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
  wind.innerHTML = response.data.wind.speed + "km/h";

  let now = new Date(response.data.time * 1000);
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

  let weatherIcon = document.querySelector(".weather-icon");
  weatherIcon.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-icon"/>`;

  getForecast(response.data.city);
}

function searchCity(city) {
  let apiKey = "35ee71bff3b1ft217b0aao934d002bd5";
  let apiURL = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
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

let video = document.querySelector("#video-bg");
video.playbackRate = 0.5;

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[date.getDay()];
}

function getForecast(city) {
  let apiKey = "35ee71bff3b1ft217b0aao934d002bd5";
  let apiURL = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiURL).then(displayForecast);
}

function displayForecast(response) {
  forecast.innerHTML = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecast.innerHTML =
        forecast.innerHTML +
        `<div class="forecast-one">
    <span class="forecast-day">${formatDay(day.time)}</span>
    <br />
    <img
    src="${day.condition.icon_url}"
    />
    <br />
    <div class="forecast-min-and-max-temperature">
    <span class="weather-forecast-temperature-max">${Math.round(
      day.temperature.maximum
    )}°C</span>
    <span class="weather-forecast-temperature-min">${Math.round(
      day.temperature.minimum
    )}°C</span>
    </div>
    </div>
    `;
    }
  });
}

let forecast = document.querySelector("#forecast");

searchCity("gothenburg");
