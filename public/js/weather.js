const loadingDisplay = document.getElementById('loadingLocation');
const weatherSubmit = document.getElementById('weatherSubmit');
const weatherDisplay = document.getElementById('weatherDisplay');
const myWeather = document.getElementById('myWeather');
const navTodayBtn = document.getElementById('navTodayBtn');
const navTomorrowBtn = document.getElementById('navTomorrowBtn');
const navSevenBtn = document.getElementById('navSevenBtn');



let lat = null;
let long = null;

let result;

let todayForecast = true;
let tomorrowForecast = false;
let sevenForecast = false;

function submitState() {
  loadingDisplay.style.display = 'none';
  weatherSubmit.style.display = 'inline-block';
}

function loadState() {
  weatherSubmit.style.display = 'none';
  loadingDisplay.style.display = 'block';
}


navigator.geolocation.getCurrentPosition(function(position) {
  lat = position.coords.latitude;
  long = position.coords.longitude;
  submitState();  
})

weatherSubmit.addEventListener('click', function getWeather() {

  if(lat && long !== null) {
    loadState();

    const sendAddress = fetch('/api/weather', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify( {
        'lat': lat,
        'long': long   
      })
    })
    .then(async response => await response.json())
    .then(data => {
      result = data;
      showView();
    });
    
  }
});

navTodayBtn.addEventListener('click', function() {
  todayForecast = true;
  tomorrowForecast = false;
  sevenForecast = false;
  navTodayBtn.className = 'nav-link textBlack active';
  navTomorrowBtn.className = 'nav-link textBlack';
  navSevenBtn.className = 'nav-link textBlack';
  showView();
});

navTomorrowBtn.addEventListener('click', function() {
  todayForecast = false;
  tomorrowForecast = true;
  sevenForecast = false;
  navTodayBtn.className = 'nav-link textBlack';
  navTomorrowBtn.className = 'nav-link textBlack active';
  navSevenBtn.className = 'nav-link textBlack';
  showView();
});

navSevenBtn.addEventListener('click', function() {
  todayForecast = false;
  tomorrowForecast = false;
  sevenForecast = true;
  navTodayBtn.className = 'nav-link textBlack';
  navTomorrowBtn.className = 'nav-link textBlack';
  navSevenBtn.className = 'nav-link textBlack active';
  showView();
});


function firstView(data) {
  let todayArr = [];

  if(data[0].isDaytime == true) {
    todayArr.push(data[0]);
    todayArr.push(data[1]);
  } else {
    todayArr.push(data[0]);
  }


  let todayWeather = '';
  todayArr.forEach((result) => {
    todayWeather += `
    <div class="container my-2">
      <div class="card">
        <div class="container">
          <div class="row my-2">
            <div class="col my-1">
              <img src="${result.icon}" alt="Weather Icon">
              <h2 class="m-1">${result.name}</h2>
              <p>${result.detailedForecast}</p>
            </div>
          </div>
          <div class="row my-2">
            <div class="col">
              <h4>${result.temperature}&#176 ${result.temperatureUnit}</h4>
              <p>Temperature</p>
            </div>
            <div class="col">
              <h4>${result.windSpeed} ${result.windDirection}</h4>
              <p>Wind Speed</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    `;
  });
  myWeather.innerHTML = todayWeather;
}

function secondView(data) {
  let tomorrowArr = [];

  if(data[0].isDaytime == true) {
    tomorrowArr.push(data[2]);
    tomorrowArr.push(data[3]);
  } else {
    tomorrowArr.push(data[1]);
    tomorrowArr.push(data[2]);
  }

  let tomorrowWeather = '';
  tomorrowArr.forEach((result) => {
    tomorrowWeather += `
    <div class="container my-2">
      <div class="card">
        <div class="container">
          <div class="row my-2">
            <div class="co my-1">
              <img src="${result.icon}" alt="Weather Icon">
              <h2 class="m-1">${result.name}</h2>
              <p>${result.detailedForecast}</p>
            </div>
          </div>
          <div class="row my-2">
            <div class="col">
              <h4>${result.temperature}&#176 ${result.temperatureUnit}</h4>
              <p>Temperature</p>
            </div>
            <div class="col">
              <h4>${result.windSpeed} ${result.windDirection}</h4>
              <p>Wind Speed</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    `
  });
  myWeather.innerHTML = tomorrowWeather;
}

function thirdView(data) {
  let wind = ``;

  let sevenWeather = '';
  data.forEach((result) => {
    if(document.documentElement.clientWidth > 700) {
      wind = `<p id="sevenDayWind">${result.windSpeed} ${result.windDirection}</p>`
    }
    sevenWeather += `
    <div class="container my-2">
      <div class="card">
        <div class="container">
          <div class="row">
            <div class="col-6 my-auto">
              <h4 class="my-auto py-1">${result.name}</h4>
              <p class="my-auto py-1">${result.shortForecast}</p>
            </div>
            <div class="col-3 my-auto">
              <img src="${result.icon}" alt="Weather Icon" width="50" height="50">
            </div>
            <div class="col-3 my-auto">
              <h6 class="my-2">${result.temperature}&#176 ${result.temperatureUnit}</h6>
              ${wind}
            </div>
            
          </div>
        </div>
      </div>
    </div>
    `
  });
  myWeather.innerHTML = sevenWeather;
}

function showView() {
  loadingDisplay.style.display = 'none';
  weatherDisplay.style.display = 'block';
  if(document.documentElement.clientWidth < 700) {
    navTodayBtn.textContent = 'Today';
    navTomorrowBtn.textContent = 'Tomorrow';
    navSevenBtn.textContent = 'One Week';
  }
  if(todayForecast == true) {
    firstView(result);
  }
  if(tomorrowForecast == true) {
    secondView(result);
  }
  if(sevenForecast == true) {
    thirdView(result);
  }
}

