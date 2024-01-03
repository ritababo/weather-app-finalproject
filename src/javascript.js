function refreshGeneralInfo(response) {
  let cityElement = document.querySelector("#city");
  let dateElement = document.querySelector("#current-date");
  let date = new Date(response.data.currentConditions.datetimeEpoch * 1000);

  cityElement.innerHTML = response.data.address;
  dateElement.innerHTML = formatDate(date);
}

function refreshHumidityWindApp(response) {
  let humidityElement = document.querySelector("#humidity-info");
  let windElement = document.querySelector("#wind-info");

  humidityElement.innerHTML = `${Math.round(
    response.data.currentConditions.humidity
  )}<span class="humidity-unit" id="humidity-unit">%</span>`;
  windElement.innerHTML = `${response.data.currentConditions.windspeed}<span class="wind-unit" id="wind-unit">km/h</span>`;
}

function refreshWeatherApp(response) {
  console.log(response);
  let temperature = Math.round(response.data.currentConditions.temp);
  let highTemperature = Math.round(response.data.days[15].tempmax);
  let lowTemperature = Math.round(response.data.days[15].tempmin);

  let temperatureElement = document.querySelector("#weather-info-display-xl");
  let currentInfo = document.querySelector("#weather-current-info");
  let highTemperatureElement = document.querySelector("#current-high-temp");
  let lowTemperatureElement = document.querySelector("#current-low-temp");

  currentInfo.innerHTML =
    response.data.currentConditions.conditions.toLowerCase();
  temperatureElement.innerHTML = temperature;
  highTemperatureElement.innerHTML = `H: ${highTemperature}º`;
  lowTemperatureElement.innerHTML = `L: ${lowTemperature}º`;
}

function refreshWeatherIcon(response) {
  let iconElement = document.querySelector("#weather-icon-display");
  let currentWeatherIcon = response.data.currentConditions.icon;

  iconElement.innerHTML = `<i class="qi-${getWeatherIcon(
    currentWeatherIcon
  )}-fill"></i>`;
}

function getWeatherIcon(condition) {
  let weatherConditions = {
    snow: "499",
    "snow-showers-day": "406",
    "snow-showers-night": "456",
    "thunder-rain": "303",
    "thunder-showers-day": "302",
    "thunder-showers-night": "302",
    rain: "309",
    "showers-day": "301",
    "showers-night": "351",
    fog: "2154",
    wind: "2208",
    cloudy: "104",
    "partly-cloudy-day": "103",
    "partly-cloudy-night": "153",
    "clear-day": "100",
    "clear-night": "150",
  };

  let weatherIcon = weatherConditions[condition];

  return `${weatherIcon}`;
}

function displayForecast(response) {
  let forecastHtml = "";

  response.data.days.forEach(function (day, index) {
    if (index >= 22 && index < 27) {
      forecastHtml =
        forecastHtml +
        `<div class="bottom-box" id="forecast-box">
                <p class="weekday" id="weekday">${formatWeekday(
                  day.datetimeEpoch
                )}</p>
                <div class="bottom-box-icon" id="forecast-icon">
                  <i class="qi-${getWeatherIcon(day.icon)}"></i>
                </div>
                <p class="upper-text" id="forecast-high-temp">${Math.round(
                  day.tempmax
                )}º</p>
                <p class="bottom-text" id="forecast-low-temp">${Math.round(
                  day.tempmin
                )}º</p>
              </div>
`;
    }
  });

  let forecastElement = document.querySelector("#weather-forecast");
  forecastElement.innerHTML = forecastHtml;
}

function refreshLunarApp(response) {
  let moonriseTime = response.data.days[15]?.moonrise;
  let moonsetTime = response.data.days[15]?.moonset;
  let currentMoonPhase = response.data.currentConditions.moonphase;

  let moonphaseElement = document.querySelector("#lunar-info-display-xl");
  let currentInfo = document.querySelector("#lunar-current-info");
  let moonriseElement = document.querySelector("#moonrise");
  let moonsetElement = document.querySelector("#moonset");

  moonphaseElement.innerHTML = currentMoonPhase * 100;
  currentInfo.innerHTML = getLunarPhase(
    currentMoonPhase,
    "description"
  ).toLowerCase();

  if (moonriseTime !== undefined && moonriseTime !== null) {
    moonriseElement.innerHTML = `moonrise: ${moonriseTime.slice(0, 5)}`;
  } else {
    moonriseElement.innerHTML = "moonrise: N/A";
  }

  if (moonsetTime !== undefined && moonsetTime !== null) {
    moonsetElement.innerHTML = `moonset: ${moonsetTime.slice(0, 5)}`;
  } else {
    moonsetElement.innerHTML = "moonset: N/A";
  }

  // moonriseElement.innerHTML = `moonrise: ${moonriseTime.slice(0, 5)}`;
  // moonsetElement.innerHTML = `moonset: ${moonsetTime.slice(0, 5)}`;
  findMoonPhasesDates(response);
}

function refreshLunarIcon(response) {
  let iconElement = document.querySelector("#lunar-icon-display");
  let currentMoonPhase = response.data.currentConditions.moonphase;

  iconElement.innerHTML = `<i class="qi-${getLunarPhase(
    currentMoonPhase,
    "icon"
  )}"></i>`;
}

function getLunarPhase(condition, type) {
  let moonphases = {
    newMoon: "800",
    waxingCrescent: "801",
    firstQuarter: "802",
    waxingGibbous: "803",
    fullMoon: "804",
    waningGibbous: "805",
    lastQuarter: "806",
    waningCrescent: "807",
  };

  if (type === "icon") {
    if (condition === 0) {
      return moonphases.newMoon;
    } else if (condition > 0 && condition < 0.25) {
      return moonphases.waxingCrescent;
    } else if (condition === 0.25) {
      return moonphases.firstQuarter;
    } else if (condition > 0.25 && condition < 0.5) {
      return moonphases.waxingGibbous;
    } else if (condition === 0.5) {
      return moonphases.fullMoon;
    } else if (condition > 0.5 && condition < 0.75) {
      return moonphases.waningGibbous;
    } else if (condition === 0.75) {
      return moonphases.lastQuarter;
    } else if (condition > 0.75 && condition <= 1) {
      return moonphases.waningCrescent;
    }
  } else if (type === "description") {
    if (condition === 0) {
      return "New Moon";
    } else if (condition > 0 && condition < 0.25) {
      return "Waxing Crescent";
    } else if (condition === 0.25) {
      return "First Quarter";
    } else if (condition > 0.25 && condition < 0.5) {
      return "Waxing Gibbous";
    } else if (condition === 0.5) {
      return "Full Moon";
    } else if (condition > 0.5 && condition < 0.75) {
      return "Waning Gibbous";
    } else if (condition === 0.75) {
      return "Last Quarter";
    } else if (condition > 0.75 && condition <= 1) {
      return "Waning Crescent";
    }
  }
}

function findMoonPhasesDates(response) {
  let filterNewMoon = response.data.days.filter((day) => day.moonphase === 0);
  let filterFirstQuarter = response.data.days.filter(
    (day) => day.moonphase === 0.25
  );
  let filterFullMoon = response.data.days.filter(
    (day) => day.moonphase === 0.5
  );
  let filterLastQuarter = response.data.days.filter(
    (day) => day.moonphase === 0.75
  );

  let newMoonDates = filterNewMoon.map((day) => day.datetimeEpoch);
  let firstQuarterDates = filterFirstQuarter.map((day) => day.datetimeEpoch);
  let fullMoonDates = filterFullMoon.map((day) => day.datetimeEpoch);
  let lastQuarterDates = filterLastQuarter.map((day) => day.datetimeEpoch);

  let moonphases = [
    newMoonDates,
    firstQuarterDates,
    fullMoonDates,
    lastQuarterDates,
  ];

  let newMoonElement = document.querySelector("#moonphase-date-1");
  let firstQuarterElement = document.querySelector("#moonphase-date-2");
  let fullMoonElement = document.querySelector("#moonphase-date-4");
  let lastQuarterElement = document.querySelector("#moonphase-date-5");

  newMoonElement.innerHTML = `<p class="upper-text" id="lunar-high-box-1">${formatDay(
    moonphases[0]
  )}</p>
                  <p class="bottom-text" id="lunar-low-box-1">${formatMonth(
                    moonphases[0]
                  )}</p>`;
  firstQuarterElement.innerHTML = `<p class="upper-text" id="lunar-high-box-2">${formatDay(
    moonphases[1]
  )}</p>
                  <p class="bottom-text" id="lunar-low-box-2">${formatMonth(
                    moonphases[1]
                  )}</p>`;
  fullMoonElement.innerHTML = `<p class="upper-text" id="lunar-high-box-4">${formatDay(
    moonphases[2]
  )}</p>
                  <p class="bottom-text" id="lunar-low-box-4">${formatMonth(
                    moonphases[2]
                  )}</p>`;
  lastQuarterElement.innerHTML = `<p class="upper-text" id="lunar-high-box-5">${formatDay(
    moonphases[3]
  )}</p>
                  <p class="bottom-text" id="lunar-low-box-5">${formatMonth(
                    moonphases[3]
                  )}</p>`;

  console.log(formatMonth(moonphases[3]));
}

function formatMonth(timestamp) {
  let date = new Date(timestamp * 1000);

  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  return months[date.getMonth()];
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);

  let day = date.getDate();

  return day;
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

function formatWeekday(timestamp) {
  let date = new Date(timestamp * 1000);

  let weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return weekdays[date.getDay()];
}

// Search city + API call

function callApi(city) {
  let apiKey = "9QXYJ9VRU28LE273E9NEVSEX4";
  let apiUrl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}/last14days/next7days?iconSet=icons2&unitGroup=metric&elements=conditions%2Cdatetime%2CdatetimeEpoch%2Cname%2CresolvedAddress%2Clatitude%2Clongitude%2Ctempmax%2Ctempmin%2Ctemp%2Cfeelslike%2Chumidity%2Cwindspeed%2Cmoonphase%2Cmoonrise%2Cmoonset%2Cicon&include=days%2Ccurrent%2Cobs%2Cfcst&key=${apiKey}&options=nonulls&contentType=json
`;

  axios.get(apiUrl).then((response) => {
    refreshGeneralInfo(response);
    refreshWeatherApp(response);
    refreshWeatherIcon(response);
    displayForecast(response);
    refreshHumidityWindApp(response);
    refreshLunarApp(response);
    refreshLunarIcon(response);
  });
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-bar");

  callApi(searchInput.value);
}

let searchFormElement = document.querySelector("#city-search");
searchFormElement.addEventListener("submit", handleSearchSubmit);

// EasterEgg
function openEasterEgg() {
  let easterEgg = confirm(
    "🤠 yeeeeee-haaaaw! You found an easter egg! Do you want to proceed?"
  );

  if (easterEgg == true) {
    let easterEggElement = document.querySelector("#easter-egg");
    let lunarDisplayContainer = document.querySelector(
      "#lunar-display-container"
    );
    let lunarInfoContainer = document.querySelector("#lunar-info-container");

    easterEggElement.classList.remove("hidden");
    lunarDisplayContainer.classList.add("hidden");
    lunarInfoContainer.classList.add("hidden");
  }

  function closeEasterEgg() {
    let easterEggElement = document.querySelector("#easter-egg");
    let lunarDisplayContainer = document.querySelector(
      "#lunar-display-container"
    );
    let lunarInfoContainer = document.querySelector("#lunar-info-container");

    easterEggElement.classList.add("hidden");
    lunarDisplayContainer.classList.remove("hidden");
    lunarInfoContainer.classList.remove("hidden");
  }

  let easterEggImg = document.querySelector("#easter-egg");
  easterEggImg.addEventListener("click", closeEasterEgg);
}

let easterEggBtn = document.querySelector("#easter-egg-btn");
easterEggBtn.addEventListener("click", openEasterEgg);

// App selector

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

callApi("Porto");
