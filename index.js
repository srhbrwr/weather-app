let now = new Date();

let h3 = document.querySelector("h3");

let hours = now.getHours();
let minutes = now.getMinutes();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];

// search engine
function cityDisplay(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#search-city");
  let showCity = document.querySelector("#current-city");
  showCity.innerHTML = `${cityInput.value}`;

  searchCity(cityInput.value);
}
let cityForm = document.querySelector("#search-form");
cityForm.addEventListener("submit", cityDisplay);

h3.innerHTML = `${day}, ${hours}:${minutes}`;

function searchCity(city) {
  let apiKey = "6ccd6b17755ed4a6ceae6fef6e33efe5";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
}

function displayForecast(response) {
  console.log(response.data.daily);
  let forecastElement = document.querySelector("#forecast");

  let days = ["Sunday", "Monday", "Tuesday", "Wedneday", "Thursday"];

  let forecastHTML = `<div class="row">`;
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
      <div class="col-2">
        <div class="weather-forecast-date">${day}</div>
        <img
          src="http://openweathermap.org/img/wn/50d@2x.png"
          alt=""
          width="42"
        />
        <div class="weather-forecast-temperatures">
          <span class="temperature-max"> 18° </span>
          <span class="temperature-min"> 12° </span>
        </div>
      </div>
  `;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
  console.log(forecastHTML);
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "6ccd6b17755ed4a6ceae6fef6e33efe5";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let currentTemperature = document.querySelector("#current-temp");
  let description = document.querySelector("#temp-description");
  let windElement = document.querySelector("#wind");
  let humidElement = document.querySelector("#humidity");
  let iconElement = document.querySelector("#icon");
  let h4 = document.querySelector("#current-city");
  currentTemperature.innerHTML = `${temperature}`;
  description.innerHTML = response.data.weather[0].description;
  humidElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  h4.innerHTML = response.data.name;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}

searchCity("Omaha");
displayForecast();

// °C °F conversion

let temperature = document.querySelector("#current-temp");

let cel = document.querySelector("#C");
let fah = document.querySelector("#F");

let celsius = 33;

function C(temp) {
  temp.preventDefault();

  temperature.innerHTML = `${celsius}`;
}

function F(temp) {
  temp.preventDefault();
  let fahrenheit = (`${celsius}` * 9) / 5 + 32;
  temperature.innerHTML = `${fahrenheit}`;
}

cel.addEventListener("click", C);
fah.addEventListener("click", F);
