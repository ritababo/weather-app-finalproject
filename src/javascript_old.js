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
  let temperatureElement = document.querySelector("#weather-info-display-xl");
  let currentInfo = document.querySelector("#weather-current-info");
  // let highTemperatureElement = document.querySelector("#current-high-temp");
  // let lowTemperatureElement = document.querySelector("#current-low-temp");

  currentInfo.innerHTML = response.data.condition.description;
  temperatureElement.innerHTML = temperature;
  // highTemperatureElement.innerHTML = `H: ${highTemperature}º`;
  // lowTemperatureElement.innerHTML = `L: ${lowTemperature}º`;

  getForecast(response.data.city);
}

function refreshWeatherIcons(response) {
  let iconElement = document.querySelector("#weather-icon-display");
  let currentWeatherIcon = response.data.condition.icon;

  iconElement.innerHTML = `<i class="qi-${getWeatherIcon(
    currentWeatherIcon
  )}-fill"></i>`;
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

  return `${weatherIcon}`;
}

function formatMoonTime(time) {
  let timestamp = time;
  let timeString = timestamp.split("T")[1].substring(0, 5);
  return timeString;
}

function refreshLunarApp(response) {
  let moonPhaseIcon = response.data.moonPhase[0].icon;
  let moonriseTime = response.data.moonrise;
  let moonsetTime = response.data.moonset;

  let iconElement = document.querySelector("#lunar-icon-display");
  let illuminationElement = document.querySelector("#lunar-info-display-xl");
  let currentInfo = document.querySelector("#lunar-current-info");
  let moonriseElement = document.querySelector("#lunar-high-box-1");
  let moonsetElement = document.querySelector("#lunar-high-box-5");

  iconElement.innerHTML = `<i class="qi-${moonPhaseIcon}"></i>`;
  illuminationElement.innerHTML = response.data.moonPhase[0].illumination;
  currentInfo.innerHTML = response.data.moonPhase[0].name.toLowerCase();
  moonriseElement.innerHTML = formatMoonTime(moonriseTime);
  moonsetElement.innerHTML = formatMoonTime(moonsetTime);
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

function roundToDecimals(number) {
  let multiplied = number * 100;
  let roundedNumber = Math.round(multiplied);
  roundedNumber = roundedNumber / 100;

  return roundedNumber;
}

function formatMoonApiDate(date) {
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let hours = date.getHours();
  let minutes = date.getMinutes();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let time = `${hours}${minutes}`;
  if (time > 1600) {
    day = day + 1;
  }

  return `${year}${month}${day}`;
}

function getLunarInfo(response) {
  let date = new Date(response.data.time * 1000);
  date = formatMoonApiDate(date);

  let originalLongitude = response.data.coordinates.longitude;
  let originalLatitude = response.data.coordinates.latitude;

  let longitude = roundToDecimals(originalLongitude);
  let latitude = roundToDecimals(originalLatitude);

  let moonApiKey = "9d36d9f581fe4e639eefe94b965a9339";
  let moonApiUrl = `https://devapi.qweather.com/v7/astronomy/moon?lang=en&key=${moonApiKey}&date=${date}&location=${longitude},${latitude}`;

  axios.get(moonApiUrl).then(refreshLunarApp);
}

function searchCity(city) {
  let apiKey = "3cafb635b28334o0e324aet783836f5a";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&unit=metric`;
  axios.get(apiUrl).then((response) => {
    refreshGeneralInfo(response);
    refreshWeatherApp(response);
    refreshWeatherIcons(response);
    refreshHumidityWindApp(response);
    getLunarInfo(response);
  });
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-bar");

  searchCity(searchInput.value);
}

let searchFormElement = document.querySelector("#city-search");
searchFormElement.addEventListener("submit", handleSearchSubmit);

function formatWeekday(timestamp) {
  let date = new Date(timestamp * 1000);

  let weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return weekdays[date.getDay()];
}

function getForecast(city) {
  let apiKey = "3cafb635b28334o0e324aet783836f5a";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&unit=metric`;

  axios(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index >= 1 && index < 6) {
      forecastHtml =
        forecastHtml +
        `<div class="bottom-box" id="forecast-box">
                <p class="weekday" id="weekday">${formatWeekday(day.time)}</p>
                <div class="bottom-box-icon" id="forecast-icon">
                  <i class="qi-${getWeatherIcon(day.condition.icon)}"></i>
                </div>
                <p class="upper-text" id="forecast-high-temp">${Math.round(
                  day.temperature.maximum
                )}º</p>
                <p class="bottom-text" id="forecast-low-temp">${Math.round(
                  day.temperature.minimum
                )}º</p>
              </div>
`;
    }
  });

  let forecastElement = document.querySelector("#weather-forecast");
  forecastElement.innerHTML = forecastHtml;

  let highTemperature = Math.round(response.data.daily[0].temperature.maximum);
  let lowTemperature = Math.round(response.data.daily[0].temperature.minimum);
  let highTemperatureElement = document.querySelector("#current-high-temp");
  let lowTemperatureElement = document.querySelector("#current-low-temp");
  highTemperatureElement.innerHTML = `H: ${highTemperature}º`;
  lowTemperatureElement.innerHTML = `L: ${lowTemperature}º`;
}

searchCity("Porto");
getForecast("Porto");
// displayForecast();

function launchLunarApp(event) {
  event.preventDefault();
  let currentApp = document.querySelector("#app");
  let structureWeather = document.querySelector("#structure-weather");
  let structureLunar = document.querySelector("#structure-lunar");
  let structureHumidity = document.querySelector("#structure-humidity");
  if (
    currentApp.classList.contains("weather-app") ||
    currentApp.classList.contains("humidity-wind-app")
  ) {
    currentApp.classList.add("lunar-app");
    currentApp.classList.remove("weather-app");
    currentApp.classList.remove("humidity-wind-app");

    structureLunar.classList.remove("hidden");
    structureWeather.classList.add("hidden");
    structureHumidity.classList.add("hidden");
  }
}
let lunarAppBtn = document.querySelector("#lunar-app-btn");
lunarAppBtn.addEventListener("click", launchLunarApp);

function launchWeatherApp(event) {
  event.preventDefault();
  let currentApp = document.querySelector("#app");
  let structureWeather = document.querySelector("#structure-weather");
  let structureLunar = document.querySelector("#structure-lunar");
  let structureHumidity = document.querySelector("#structure-humidity");
  if (
    currentApp.classList.contains("lunar-app") ||
    currentApp.classList.contains("humidity-wind-app")
  ) {
    currentApp.classList.add("weather-app");
    currentApp.classList.remove("lunar-app");
    currentApp.classList.remove("humidity-wind-app");

    structureLunar.classList.add("hidden");
    structureWeather.classList.remove("hidden");
    structureHumidity.classList.add("hidden");
  }
}
let weatherAppBtn = document.querySelector("#weather-app-btn");
weatherAppBtn.addEventListener("click", launchWeatherApp);

function launchHumidityWindApp(event) {
  event.preventDefault();
  let currentApp = document.querySelector("#app");
  let structureWeather = document.querySelector("#structure-weather");
  let structureLunar = document.querySelector("#structure-lunar");
  let structureHumidity = document.querySelector("#structure-humidity");
  if (
    currentApp.classList.contains("lunar-app") ||
    currentApp.classList.contains("weather-app")
  ) {
    currentApp.classList.add("humidity-wind-app");
    currentApp.classList.remove("lunar-app");
    currentApp.classList.remove("weather-app");

    structureLunar.classList.add("hidden");
    structureWeather.classList.add("hidden");
    structureHumidity.classList.remove("hidden");
  }
}
let humidityWindAppBtn = document.querySelector("#humidity-wind-app-btn");
humidityWindAppBtn.addEventListener("click", launchHumidityWindApp);
