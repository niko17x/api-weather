//* Openweathermap.org API key => b4549207e88e72a465563047d09afc2b
//* API call (Current Weather) => https://api.openweathermap.org/data/2.5/weather?q=London&APPID=b4549207e88e72a465563047d09afc2b&units=imperial
//* API call (5 Day Weather) => https://api.openweathermap.org/data/2.5/forecast?q=London&APPID=b4549207e88e72a465563047d09afc2b&units=imperial
//* API call (City background images) => https://api.teleport.org/api/urban_areas/

// Local Storage:

const LOCAL_STORAGE_MAIN_KEY = "queue.searchQueue";

const searchQueue =
  JSON.parse(localStorage.getItem(LOCAL_STORAGE_MAIN_KEY)) || [];

// Variables:

const unitImperial = "&units=imperial";
const unitMetric = "&units=metric";

const cityName = document.querySelector(".current-weather .city-name");
const descript = document.querySelector(".current-weather .descript");
const temp = document.querySelector(".current-weather .temp");
const feelsLike = document.querySelector(".current-weather .feels-like");
const humid = document.querySelector(".current-weather .humid");
const windSp = document.querySelector(".current-weather .wind-speed");

const searchBtn = document.querySelector(".search button");
const userInput = document.querySelector("#search-input");

function save() {
  localStorage.setItem(LOCAL_STORAGE_MAIN_KEY, JSON.stringify(searchQueue));
}

// Clear all data fields:

function clearDataFields() {
  cityName.innerText = "";
  descript.innerText = "Condition: ";
  temp.innerText = "Temperature: ";
  feelsLike.innerText = "Feels-like: ";
  humid.innerText = "Humidity: ";
  windSp.innerText = "Wind-speed: ";
}

// Remove duplicate input entries:

function removeDupe(input) {
  searchQueue.forEach((item) => {
    if (item === input) {
      const index = searchQueue.indexOf(item);
      searchQueue.splice(index, 1);
    }
  });
}
removeDupe();

async function weatherReport() {
  const getLastInput = searchQueue[searchQueue.length - 1];

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${getLastInput}&APPID=b4549207e88e72a465563047d09afc2b&units=imperial`
    );

    const getJson = await response.json();

    clearDataFields();

    cityName.textContent = getJson.name;
    descript.textContent += getJson.weather[0].description;
    temp.textContent += getJson.main.temp;
    feelsLike.textContent += getJson.main.feels_like;
    humid.textContent += getJson.main.humidity;
    windSp.textContent += getJson.wind.speed;
  } catch (error) {
    // Call error.
  }
}

function defaultCity() {
  if (searchQueue.length === 0) {
    searchQueue.push("seattle");
  }
  weatherReport();
}

searchBtn.addEventListener("click", () => {
  if (!searchQueue.includes(userInput.value)) {
    searchQueue.push(userInput.value);
  } else {
    // continue to push value to array but delete all previous duplicate values:

    removeDupe(userInput.value);
    searchQueue.push(userInput.value);
  }
  console.log(searchQueue);
  weatherReport();
  save();
  userInput.value = "";
});

defaultCity();

// Clear local storage:

document.querySelector(".clear-storage").addEventListener("click", () => {
  window.localStorage.clear();
});
