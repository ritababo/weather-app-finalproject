function refreshWeather(response) {
  let temperatureElement = document.querySelector("#current-temperature");
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("#city");

  cityElement.innerHTML = response.data.city;
  temperatureElement.innerHTML = Math.round(temperature);
}

function searchCity(city) {
  let apiKey = "3cafb635b28334o0e324aet783836f5a";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&unit=metric`;
  axios.get(apiUrl).then(refreshWeather);
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-bar");

  searchCity(searchInput.value);
}

let searchFormElement = document.querySelector("#city-search");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("Porto");

function launchLunarApp(event) {
  event.preventDefault();
  let currentApp = document.querySelector("#app");
  let structureOne = document.querySelector("#structure-one");
  let structureTwo = document.querySelector("#structure-two");
  if ((currentApp.classList = "weather-app" || "humidity-wind-app")) {
    currentApp.classList.add("lunar-app");
    currentApp.classList.remove("weather-app" || "humidity-wind-app");
    structureOne.classList.remove("hidden");
    structureTwo.classList.add("hidden");
  }
}
let lunarAppBtn = document.querySelector("#lunar-app-btn");
lunarAppBtn.addEventListener("click", launchLunarApp);

function launchWeatherApp(event) {
  event.preventDefault();
  let currentApp = document.querySelector("#app");
  let structureOne = document.querySelector("#structure-one");
  let structureTwo = document.querySelector("#structure-two");
  if ((currentApp.classList = "lunar-app" || "humidity-wind-app")) {
    currentApp.classList.add("weather-app");
    currentApp.classList.remove("lunar-app" || "humidity-wind-app");
    structureOne.classList.remove("hidden");
    structureTwo.classList.add("hidden");
  }
}
let weatherAppBtn = document.querySelector("#weather-app-btn");
weatherAppBtn.addEventListener("click", launchWeatherApp);

function launchHumidityWindApp(event) {
  event.preventDefault();
  let currentApp = document.querySelector("#app");
  let structureOne = document.querySelector("#structure-one");
  let structureTwo = document.querySelector("#structure-two");
  if ((currentApp.classList = "lunar-app" || "weather-app")) {
    currentApp.classList.add("humidity-wind-app");
    currentApp.classList.remove("lunar-app" || "weather-app");
    structureOne.classList.add("hidden");
    structureTwo.classList.remove("hidden");
  }
}
let humidityWindAppBtn = document.querySelector("#humidity-wind-app-btn");
humidityWindAppBtn.addEventListener("click", launchHumidityWindApp);
