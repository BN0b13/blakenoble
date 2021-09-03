const weatherSubmit = document.getElementById('weatherSubmit');
const loadingDisplay = document.getElementById('loadingLocation');
const myWeather = document.getElementById('myWeather');
let lat = null;
let long = null;

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
    console.log(`Let's Check That Weather!`);
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
    .then(data => showWeather(data));
  }
})

function showWeather(data) {
  loadingDisplay.style.display = 'none';
  let allWeather = '';
  data.forEach((result) => {
    allWeather += `
    <div class="container mt-2">
      <div class="card">
        <div class="container">
          <div class="row m-2">
            <div class="col">
              <img src="${result.icon}" alt="Weather Icon">
              <h2>${result.name}</h2>
              <p>${result.detailedForecast}</p>
            </div>
          </div>
          <div class="row m2">
            <div class="col">
              <h4>${result.temperature} ${result.temperatureUnit}</h4>
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
  myWeather.innerHTML = allWeather;
}