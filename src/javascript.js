function refreshGeneralInfo(response) {
  let cityElement = document.querySelector("#city");
  let dateElement = document.querySelector("#current-date");
  let date = new Date(response.data.time * 1000);

  cityElement.innerHTML = response.data.city;
  dateElement.innerHTML = formatDate(date);
}

function refreshWeatherApp(response) {
  let temperature = Math.round(response.data.temperature.current);
  // let highTemperature = Math.round(response.data.temperature.maximum);
  // let lowTemperature = Math.round(response.data.temperature.minimum);
  let temperatureElement = document.querySelector("#info-display-xl");
  let currentInfo = document.querySelector("#current-info");
  // let highTemperatureElement = document.querySelector("#current-high-temp");
  // let lowTemperatureElement = document.querySelector("#current-low-temp");

  currentInfo.innerHTML = response.data.condition.description;
  temperatureElement.innerHTML = temperature;
  // highTemperatureElement.innerHTML = `H: ${highTemperature}º`;
  // lowTemperatureElement.innerHTML = `L: ${lowTemperature}º`;
}

function refreshWeatherIcons(response) {
  let iconElement = document.querySelector("#icon-display");
  let currentWeatherIcon = response.data.condition.icon;

  iconElement.innerHTML = getWeatherIcon(currentWeatherIcon);
}

function getWeatherIcon(condition) {
  let weatherConditions = {
    "clear-sky-day": "100",
    "clear-sky-night": "150",
    "few-clouds-day": "102",
    "few-clouds-night": "152",
    "scattered-clouds-day": "103",
    "scattered-clouds-night": "153",
    "broken-clouds-day": "101",
    "broken-clouds-night": "151",
    "shower-rain-day": "306",
    "shower-rain-night": "351",
    "rain-day": "305",
    "rain-night": "350",
    "thunderstorm-day": "302",
    "thunderstorm-night": "302",
    "snow-day": "499",
    "snow-night": "457",
    "mist-day": "500",
    "mist-night": "500",
  };

  let weatherIcon = weatherConditions[condition];

  return `<i class="qi-${weatherIcon}-fill"></i>`;
}

// function getWeatherIcons(response) {
//   let originalLongitude = response.data.coordinates.longitude;
//   let originalLatitude = response.data.coordinates.latitude;

//   let longitude = roundToDecimals(originalLongitude);
//   let latitude = roundToDecimals(originalLatitude);

//   let iconApiKey = "9d36d9f581fe4e639eefe94b965a9339";
//   let iconApiUrl = `https://devapi.qweather.com/v7/weather/now?lang=en&key=${iconApiKey}&location=${longitude},${latitude}&unit=m`;

//   console.log(iconApiUrl);

//   axios.get(iconApiUrl).then(refreshWeatherIcons);
// }

function refreshHumidityWindApp(response) {
  let humidityElement = document.querySelector("#humidity-info");
  let windElement = document.querySelector("#wind-info");

  humidityElement.innerHTML = `${response.data.temperature.humidity}<span class="humidity-unit" id="humidity-unit">%</span>`;
  windElement.innerHTML = `${response.data.wind.speed}<span class="wind-unit" id="wind-unit">km/h</span>`;
}

function roundToDecimals(number) {
  let multiplied = number * 100;
  let roundedNumber = Math.round(multiplied);
  roundedNumber = roundedNumber / 100;

  return roundedNumber;
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
    "Saturday",
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
    refreshGeneralInfo(response);
    refreshWeatherApp(response);
    refreshWeatherIcons(response);
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
