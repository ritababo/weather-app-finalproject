function refreshWeatherApp(response) {
  let temperatureElement = document.querySelector("#current-temperature");
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("#city");
  let currentInfo = document.querySelector("#current-info");
  let dateElement = document.querySelector("#current-date");
  let date = new Date(response.data.time * 1000);

  cityElement.innerHTML = response.data.city;
  dateElement.innerHTML = formatDate(date);
  currentInfo.innerHTML = response.data.condition.description;
  temperatureElement.innerHTML = Math.round(temperature);
}

function refreshHumidityWindApp(response) {
  let humidityElement = document.querySelector("#humidity-info");
  let windElement = document.querySelector("#wind-info");

  humidityElement.innerHTML = `${response.data.temperature.humidity}<span class="humidity-unit" id="humidity-unit">%</span>`;
  windElement.innerHTML = `${response.data.wind.speed}<span class="wind-unit" id="wind-unit">km/h</span>`;
}

function formatDate(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturdar",
  ];
  let day = weekdays[date.getDay()];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
  }

  return `${day}, ${hours}:${minutes}`;
}

function searchCity(city) {
  let apiKey = "3cafb635b28334o0e324aet783836f5a";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&unit=metric`;
  axios.get(apiUrl).then((response) => {
    refreshWeatherApp(response);
    refreshHumidityWindApp(response);
  });
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
