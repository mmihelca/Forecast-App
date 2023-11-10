function updateWeather(response) {
  let temperatureElement = document.querySelector(".temperature");
  let temperature = Math.round(response.data.temperature.current);
  temperatureElement.innerHTML = temperature;
  city.innerHTML = response.data.city;

  console.log(response.data);
}

function searchCity(city) {
  let apiKey = "35ee71bff3b1ft217b0aao934d002bd5";
  let apiURL = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
  axios.get(apiURL).then(updateWeather);
}

function handleSearch(event) {
  event.preventDefault();
  let searchFormInput = document.querySelector("#search-input-field");
  searchCity(searchFormInput.value);
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearch);

searchCity("gothenburg");
