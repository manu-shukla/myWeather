const api = {
  key: "24bdd74c0b39632f07674f51aae1688a",
  base: "https://api.openweathermap.org/data/2.5/",
};
localStorage.setItem("city", []);
var rcity = localStorage.getItem("city", []);
const searchbox = document.querySelector(".search");
searchbox.addEventListener("keypress", setQuery);

function setQuery(evt) {
  if (evt.keyCode == 13) {
    getResults(searchbox.value);
    // console.log(serachbox.value);
  }
}
function getResults(query) {
  console.log(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`);
  fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then((weather) => {
      return weather.json();
    })
    .then(displayResults);
}
function displayResults(weather) {
  console.log(weather);
  if (weather.message == "city not found") {
    alert(`City: ${searchbox.value} Not Found. Enter the city name correctly`);
    searchbox.value = "";
    return;
  } else {
    var obj = {
      city: weather.name,
      country: weather.sys.country,
    };
    rcity = [...rcity, obj];
    localStorage.setItem("city", JSON.stringify(rcity));
    let toclear = document.getElementById("rcity");
    toclear.innerHTML = "";
    setRecents(rcity);

    let city = document.querySelector(".city");
    city.innerText = `${weather.name}, ${weather.sys.country}`;

    let now = new Date();
    let date = document.querySelector(".date");

    date.innerText = datebuild(now);

    let temp = document.querySelector(".temp");
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>&deg;C`;
    let weat = document.getElementById("weat");
    weat.innerText = `${weather.weather[0].main}`;
    let icon = document.getElementById("ico");
    console.log(icon);
    let video = document.querySelector("#back");
    video.src = chnageback(video, weather);
    icon.src = `http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;
    searchbox.value = "";
    searchbox.blur();
    window.navigator.vibrate(500);
  }
}

function datebuild(d) {
  let ans = "";
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  ans += `${days[d.getDay()]} ${d.getDate()} ${
    months[d.getMonth()]
  } ${d.getFullYear()}`;

  return ans;
}

function chnageback(v, weather) {
  if (weather.weather[0].main == "Rain") {
    return `backgrounds/rain.webm`;
  } else if (weather.weather[0].main == "Clouds") {
    return `backgrounds/cloud.webm`;
  } else {
    return `backgrounds/clear.webm`;
  }
}

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    alert("Sorry, could not find your location.");
  }
}

function showPosition(position) {
  console.log(
    `${api.base}weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&APPID=${api.key}`
  );
  fetch(
    `${api.base}weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&APPID=${api.key}`
  )
    .then((weather) => {
      return weather.json();
    })
    .then(displayResults);
}

function foc() {
  document.getElementById("ip").focus();

  // return true;
}
function setRecents(rcity) {
  for (let i = rcity.length - 1, count = 0; i >= 0 && count < 5; --i, ++count) {
    let span = document.createElement("span");
    let node = document.createTextNode(`${rcity[i].city}, ${rcity[i].country}`);
    span.appendChild(node);
    let x = document.getElementById("rcity");
    x.appendChild(span);
  }
}
function clearall() {
  localStorage.removeItem("city");
  let x = document.getElementById("rcity");
  x.innerHTML = "";
  clearArray(rcity);
}
function clearArray(array) {
  while (array.length) {
    array.pop();
  }
}
setInterval(time, 1000);
function time() {
  let clock = new Date();
  let clk = document.getElementById("clock");
  clk.innerHTML = `${clock.getHours()}:${clock.getMinutes()}:${clock.getSeconds()}`;
}
