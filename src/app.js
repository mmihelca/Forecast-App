function handleSearch(event) {
  event.preventDefault();
  let searchFormInput = document.querySelector("#search-input-field");
  let city = document.querySelector("#city");
  city.innerHTML = searchFormInput.value;
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearch);
