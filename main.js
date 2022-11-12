// Todo: First page asks users if they want metric or imperial => save choice to local storage ///

//* Openweathermap.org API key => b4549207e88e72a465563047d09afc2b
//* API call (Current Weather) => https://api.openweathermap.org/data/2.5/weather?q=London&APPID=b4549207e88e72a465563047d09afc2b&units=imperial
//* API call (5 Day Weather) => https://api.openweathermap.org/data/2.5/forecast?q=London&APPID=b4549207e88e72a465563047d09afc2b&units=imperial
//* API call (City background images) => https://api.teleport.org/api/urban_areas/

// Local Storage:

const LOCAL_STORAGE_MAIN_KEY = "queue.searchQueue";
const LOCAL_STORAGE_USER_MEASUREMENT = "measure.userMeasure";

const searchQueue =
  JSON.parse(localStorage.getItem(LOCAL_STORAGE_MAIN_KEY)) || [];

let userMeasure = JSON.parse(
  localStorage.getItem(LOCAL_STORAGE_USER_MEASUREMENT)
);

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

const labelSwitch = document.querySelector(".switch");
const inputToggle = document.querySelector(".toggle-btn");

// Day One:

const dayOneDate = document.querySelector(".day-one .date");
const dayOneDescript = document.querySelector(".day-one .condition-data");
const dayOneTemp = document.querySelector(".day-one .temp-data");
const dayOneFeels = document.querySelector(".day-one .feels-data");
const dayOneHumid = document.querySelector(".day-one .humid-data");
const dayOneWindSp = document.querySelector(".day-one .wind-data");

// Day Two:

const dayTwoDate = document.querySelector(".day-two .date");
const dayTwoDescript = document.querySelector(".day-two .condition-data");
const dayTwoTemp = document.querySelector(".day-two .temp-data");
const dayTwoFeels = document.querySelector(".day-two .feels-data");
const dayTwoHumid = document.querySelector(".day-two .humid-data");
const dayTwoWindSp = document.querySelector(".day-two .wind-data");

// Day Three:

const dayThreeDate = document.querySelector(".day-three .date");
const dayThreeDescript = document.querySelector(".day-three .condition-data");
const dayThreeTemp = document.querySelector(".day-three .temp-data");
const dayThreeFeels = document.querySelector(".day-three .feels-data");
const dayThreeHumid = document.querySelector(".day-three .humid-data");
const dayThreeWindSp = document.querySelector(".day-three .wind-data");

// Day Four:

const dayFourDate = document.querySelector(".day-four .date");
const dayFourDescript = document.querySelector(".day-four .condition-data");
const dayFourTemp = document.querySelector(".day-four .temp-data");
const dayFourFeels = document.querySelector(".day-four .feels-data");
const dayFourHumid = document.querySelector(".day-four .humid-data");
const dayFourWindSp = document.querySelector(".day-four .wind-data");

// Day Five:

const dayFiveDate = document.querySelector(".day-five .date");
const dayFiveDescript = document.querySelector(".day-five .condition-data");
const dayFiveTemp = document.querySelector(".day-five .temp-data");
const dayFiveFeels = document.querySelector(".day-five .feels-data");
const dayFiveHumid = document.querySelector(".day-five .humid-data");
const dayFiveWindSp = document.querySelector(".day-five .wind-data");

function resetWindow() {
  window.location.reload(true); // Refresh window to re-render search history.
}

function clearLocStor() {
  window.localStorage.clear();
}

function save() {
  localStorage.setItem(LOCAL_STORAGE_MAIN_KEY, JSON.stringify(searchQueue));
  localStorage.setItem(
    LOCAL_STORAGE_USER_MEASUREMENT,
    JSON.stringify(userMeasure)
  );
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

function defaultCity() {
  if (searchQueue.length === 0) {
    searchQueue.push("SEATTLE");
  }
  currentWeather();
}

async function currentWeather() {
  const getLastInput = searchQueue[searchQueue.length - 1];
  let currReport;
  let foreReport;
  try {
    if (userMeasure === "imperial") {
      currReport = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${getLastInput}&APPID=b4549207e88e72a465563047d09afc2b&units=imperial`
      );
    } else {
      currReport = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${getLastInput}&APPID=b4549207e88e72a465563047d09afc2b&units=metric`
      );
    }

    const getJsonCurrent = await currReport.json();

    clearDataFields();

    cityName.textContent = getJsonCurrent.name;
    descript.textContent += getJsonCurrent.weather[0].description;
    temp.textContent += getJsonCurrent.main.temp;
    feelsLike.textContent += getJsonCurrent.main.feels_like;
    humid.textContent += getJsonCurrent.main.humidity;
    windSp.textContent += getJsonCurrent.wind.speed;

    // Forecast Reporting:

    if (userMeasure === "imperial") {
      foreReport = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${getLastInput}&APPID=b4549207e88e72a465563047d09afc2b&units=imperial`
      );
    } else {
      foreReport = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${getLastInput}&APPID=b4549207e88e72a465563047d09afc2b&units=metric`
      );
    }

    const getJson = await foreReport.json();

    const getDate = getJson.list[1].dt_txt;
    const getCond = getJson.list[1].weather[0].description;
    const getTemp = getJson.list[1].main.temp;
    const getFeels = getJson.list[1].main.feels_like;
    const getHumid = getJson.list[1].main.humidity;
    const getWindSp = getJson.list[1].wind.speed;

    const getDateTwo = getJson.list[9].dt_txt;
    const getCondTwo = getJson.list[9].weather[0].description;
    const getTempTwo = getJson.list[9].main.temp;
    const getFeelsTwo = getJson.list[9].main.feels_like;
    const getHumidTwo = getJson.list[9].main.humidity;
    const getWindSpTwo = getJson.list[9].wind.speed;

    const getDateThree = getJson.list[17].dt_txt;
    const getCondThree = getJson.list[17].weather[0].description;
    const getTempThree = getJson.list[17].main.temp;
    const getFeelsThree = getJson.list[17].main.feels_like;
    const getHumidThree = getJson.list[17].main.humidity;
    const getWindSpThree = getJson.list[17].wind.speed;

    const getDateFour = getJson.list[25].dt_txt;
    const getCondFour = getJson.list[25].weather[0].description;
    const getTempFour = getJson.list[25].main.temp;
    const getFeelsFour = getJson.list[25].main.feels_like;
    const getHumidFour = getJson.list[25].main.humidity;
    const getWindSpFour = getJson.list[25].wind.speed;

    const getDateFive = getJson.list[33].dt_txt;
    const getCondFive = getJson.list[33].weather[0].description;
    const getTempFive = getJson.list[33].main.temp;
    const getFeelsFive = getJson.list[33].main.feels_like;
    const getHumidFive = getJson.list[33].main.humidity;
    const getWindSpFive = getJson.list[33].wind.speed;

    weatherData(
      dayOneDate,
      getDate,
      dayOneDescript,
      getCond,
      dayOneTemp,
      getTemp,
      dayOneFeels,
      getFeels,
      dayOneHumid,
      getHumid,
      dayOneWindSp,
      getWindSp
    );

    weatherData(
      dayTwoDate,
      getDateTwo,
      dayTwoDescript,
      getCondTwo,
      dayTwoTemp,
      getTempTwo,
      dayTwoFeels,
      getFeelsTwo,
      dayTwoHumid,
      getHumidTwo,
      dayTwoWindSp,
      getWindSpTwo
    );

    weatherData(
      dayThreeDate,
      getDateThree,
      dayThreeDescript,
      getCondThree,
      dayThreeTemp,
      getTempThree,
      dayThreeFeels,
      getFeelsThree,
      dayThreeHumid,
      getHumidThree,
      dayThreeWindSp,
      getWindSpThree
    );

    weatherData(
      dayFourDate,
      getDateFour,
      dayFourDescript,
      getCondFour,
      dayFourTemp,
      getTempFour,
      dayFourFeels,
      getFeelsFour,
      dayFourHumid,
      getHumidFour,
      dayFourWindSp,
      getWindSpFour
    );

    weatherData(
      dayFiveDate,
      getDateFive,
      dayFiveDescript,
      getCondFive,
      dayFiveTemp,
      getTempFive,
      dayFiveFeels,
      getFeelsFive,
      dayFiveHumid,
      getHumidFive,
      dayFiveWindSp,
      getWindSpFive
    );
  } catch (error) {
    const spanMsg = document.createElement("span");
    spanMsg.className = "error-msg";
    spanMsg.innerText =
      "Please enter a valid city, state, country or zip code.";
    document.querySelector(".search").append(spanMsg);
    setTimeout(() => {
      spanMsg.remove();
    }, 4000);

    // Remove last item from array list and re-render last item in searchQueue:

    searchQueue.pop();
    currentWeather();
  }
  save();
  displaySearchHistory();
}

// ? For the date => set the date to a variable => edit the variable date to the format you want it to be (possibly by using regex?).

function weatherData(
  date,
  getDate,
  condition,
  getCond,
  temper,
  getTemp,
  feels,
  getFeels,
  humidi,
  getHumid,
  wind,
  getWindSp
) {
  date.innerText = getDate;
  condition.innerText = getCond;
  temper.innerText = getTemp;
  feels.innerText = getFeels;
  humidi.innerText = getHumid;
  wind.innerText = getWindSp;
}

// Display search history to user:

function displaySearchHistory() {
  const searchData = document.querySelector(".search-data");
  clearElement(searchData);

  // Takes into account removing 'Seattle' default city:

  for (let i = searchQueue.length - 1; i > 0; i -= 1) {
    const li = document.createElement("li");
    const newWord = capFirstLetter(searchQueue[i]);
    li.innerText = newWord;
    searchData.append(li);
  }
}

function clearElement(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

// Return the word with first letter capitalized:

function capFirstLetter(word) {
  return word[0].toUpperCase() + word.slice(1).toLowerCase();
}

function toggleMeasure() {
  if (userMeasure == null || userMeasure === undefined) {
    inputToggle.checked = true; // Set default measurement to imperial.
    userMeasure = "imperial";
  } else if (userMeasure === "imperial") {
    inputToggle.checked = true;
  } else {
    inputToggle.checked = false;
  }
  save();
}

// * Events:

labelSwitch.addEventListener("click", () => {
  if (inputToggle.checked) {
    userMeasure = "imperial";
  } else {
    userMeasure = "metric";
  }
  save();

  resetWindow();
});

searchBtn.addEventListener("click", () => {
  if (!searchQueue.includes(userInput.value)) {
    searchQueue.push(userInput.value.toUpperCase());
  } else {
    // continue to push value to array but delete all previous duplicate values:

    removeDupe(userInput.value);
    searchQueue.push(userInput.value.toUpperCase());
  }

  currentWeather();
  save();
  userInput.value = "";
});

// Clear local storage:

const clearStorBtn = document.querySelector(".clear-storage");
clearStorBtn.addEventListener("click", () => {
  clearLocStor();
  resetWindow();
});

toggleMeasure();
defaultCity();
displaySearchHistory();
