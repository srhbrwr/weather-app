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
function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let currentTemperature = document.querySelector("#current-temp");
  let description = document.querySelector("#temp-description");
  let windElement = document.querySelector("#wind");
  let iconElement = document.querySelector("#icon");
  currentTemperature.innerHTML = `${temperature}`;
  description.innerHTML = response.data.weather[0].description;
  let h4 = document.querySelector("#current-city");
  h4.innerHTML = response.data.name;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

}

searchCity("Omaha");

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
