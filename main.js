//* Openweathermap.org API key => b4549207e88e72a465563047d09afc2b
//* API call (Current Weather) => https://api.openweathermap.org/data/2.5/weather?q=London&APPID=b4549207e88e72a465563047d09afc2b&units=imperial
//* API call (5 Day Weather) => https://api.openweathermap.org/data/2.5/forecast?q=London&APPID=b4549207e88e72a465563047d09afc2b&units=imperial

// Variables:

const spanCityName = document.querySelector(".city-name");
const liTemp = document.querySelector(".temp");
const liDescript = document.querySelector(".feels-like");
const liHumid = document.querySelector(".humid");
const liWindSpeed = document.querySelector(".wind-speed");

const unitImperial = "&units=imperial";
const unitMetric = "&units=metric";

async function weatherReport() {
  try {
    const response = await fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=London&APPID=b4549207e88e72a465563047d09afc2b&units=imperial"
    );

    const getData = await response.json();
    const showData = console.log(getData);
    const div = document.querySelector(".demo");
    div.append(showData);
  } catch (error) {
    // Call error.
  }
}

weatherReport();
