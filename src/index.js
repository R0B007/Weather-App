function todaysdate() {
  return new Date();
}
let currentDate = new Date();
let months = [
  "Jan",
  "Feb",
  "March",
  "April",
  "May",
  "June",
  "July",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
let theMonth = months[currentDate.getMonth()];
let date = currentDate.getDate();
let days = ["Sun", "Mon", "Tues", "Wed", "Thur", "Fri", "Sat"];
let theDay = days[currentDate.getDay()];
let theYear = currentDate.getFullYear();
let theHour = currentDate.getHours();
let theMinutes = currentDate.getMinutes();
let displayDate = document.querySelector(".dateAndTime");
displayDate.innerHTML = `Today is ${theDay}, ${theMonth} ${date}, ${theYear} ${theHour}:${theMinutes}`;
todaysdate();

function replaceCity(event) {
  event.preventDefault();
  let city = document.querySelector("h1");
  let citySearch = document.querySelector("#searchBar");
  city.innerHTML = citySearch.value;

  getWeather(citySearch.value);
}

function getTemp(response) {
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector(".current-temp");
  temperatureElement.innerHTML = `${temperature}`;
  let city = document.querySelector("h1");
  let icon = document.querySelector(".icon");
  let windSpeed = document.querySelector(".windspeed");
  let humidity = document.querySelector(".windspeed");
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  icon.setAttribute("alt", response.data.weather[0].description);
  city.innerHTML = response.data.name;
  windSpeed.innerHTML = Math.round(response.data.wind.speed);
  humidity.innerHTML = response.data.main.humidity;
}
let searchCity = document.querySelector("#searchCity");
searchCity.addEventListener("submit", replaceCity);

function getWeather(cityName) {
  let apiKey = `23696650d26bfac6b39d11bf586751e7`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(getTemp);
}

function geoWeather(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(geoPosition);
}

let currentCity = document.querySelector(".scd-primary");
currentCity.addEventListener("click", geoWeather);

function geoPosition(postion) {
  let latitude = postion.coords.latitude;
  let longitude = postion.coords.longitude;
  let apiKey = `23696650d26bfac6b39d11bf586751e7`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

  console.log(apiUrl);
  axios.get(apiUrl).then(getTemp);
}
navigator.geolocation.getCurrentPosition(geoPosition);
