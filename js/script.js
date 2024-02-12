let currentCity = document.getElementById('city');
let maxTemp = document.getElementById('maxTemp');
let weatherState = document.getElementById('weatherState');
let thumidity = document.getElementById('thumidity');
let wind_kph = document.getElementById('wind_kph');
let wind_dir = document.getElementById('wind_dir');
let tdateNum = document.getElementById('tdateNum');
let currentIcon = document.getElementById('currenstatetIcon');
let tdateName = document.getElementById('tdateName');
let nextDayName = document.getElementById('nextDayName');
let aftetomorrow = document.querySelector('#aftetomorrow');
let nextstatetIcon = document.getElementById('nextstatetIcon');
let nexTmaxTemp = document.querySelector('.nexTmaxTemp');
let nexTminTemp = document.querySelector('.nexTminTemp');
let nextWeatherState = document.getElementById('nextWeatherState');
let afternextIcon =document.getElementById('afternextIcon' );
let afternexTmaxTemp =document.getElementById('afternexTmaxTemp');
let afternexTminTemp =document.getElementById('afternexTminTemp');
let afternextState =document.getElementById('afternextState');
let SerchInput = document.querySelector('input');

async function getweatherData() {
    let location = SerchInput.value || "cairo"; // Using Cairo as default if SerchInput.value is empty
    let mylocation = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=0a4a1fa0c4e1448cab730312240802&q=${location}&days=3`);
    const weatherData = await mylocation.json();
    return weatherData;
}

SerchInput.addEventListener("keyup" , currentData);
  




let https = "https:"
function displayTodayData(data) {
    currentCity.innerHTML = data.location.name;
    maxTemp.innerHTML = data.current.temp_c + `<sup>o</sup>C`;
    weatherState.innerHTML = data.current.condition.text;
    thumidity.innerHTML = `<img src="images/icon-umberella.png" width="21" height="21">
    `+ data.current.humidity + `%`;
    wind_kph.innerHTML = `<img src="images/icon-wind@2x.png" width="21" height="21"> ` + data.current.wind_kph + `km/h`;
    wind_dir.innerHTML = `<img src="images/icon-compass@2x.png" width="21" height="21"> ` + data.current.wind_dir;
    currentIcon.setAttribute("src", https + data.current.condition.icon);

}

async function currentData( ) {

    let x = await getweatherData()
    displayTodayData(x);
    getDay();
    getNextData(x);
    nextDay(x);

}
currentData();

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

function getDay() {

    let tDate = new Date();
    let day = days[tDate.getDay()];
    let nextDay = days[tDate.getDay() + 1];
    let aftenextDay = days[tDate.getDay() + 2];
    tdateNum.innerHTML = tDate.getDate() + "-" + tDate.toLocaleDateString("en-US", { month: "long" });
    tdateName.innerHTML = day;
    nextDayName.innerHTML = nextDay;
    aftetomorrow.innerHTML = aftenextDay;

}


function getNextData(data) {

    let nextTemp = data.forecast.forecastday[1].day;
    nextstatetIcon.setAttribute("src", https + nextTemp.condition.icon);
    nexTmaxTemp.innerHTML = nextTemp.maxtemp_c + `<sup>o</sup>C`;
    nexTminTemp.innerHTML = nextTemp.mintemp_c + `<sup>o</sup>C`;
    nextWeatherState.innerHTML = nextTemp.condition.text;

    let afternextTemp = data.forecast.forecastday[2].day;
    afternextIcon.setAttribute("src", https + afternextTemp.condition.icon);
    afternexTmaxTemp.innerHTML = afternextTemp.maxtemp_c + `<sup>o</sup>C`;
     afternexTminTemp.innerHTML =afternextTemp.mintemp_c + `<sup>o</sup>C`;
     afternextState.innerHTML = afternextTemp.condition.text;

}