
const searchBtn = document.querySelector('.searchBtn');
const cityInput = document.querySelector('#search-input');
const container = document.querySelector('.glass-container');
const appContainer = document.querySelector('.app');
const images = ['forest-g16d322e95_1280.png', 'natural-g58dabba7d_1280.png'];
const infoBoxDiv = document.querySelector('.info-box');
/* 'http://api.weatherapi.com/v1/current.json?key=<de266a29a9404a70b3a231233220511>&q=Paris' */

const renderInformation = (imgSrc, weatherCondition, queryCity, country, currentTemperature, feelsLikeTemp, currentHumidity, windSpeed, airPressure, isDay) => {

    infoBoxDiv.innerHTML = '';

    const mainDiv = document.createElement('div');
    mainDiv.classList.add('main-div');
    const secDiv = document.createElement('div');
    secDiv.classList.add('secondary-div');
    const weatherIcon = document.createElement('img');
    const condition = document.createElement('p');
    condition.classList.add('condition')
    const city = document.createElement('p');
    city.classList.add('city');
    const temperature = document.createElement('p');
    temperature.classList.add('temperature');
    const feelsLike = document.createElement('p');
    feelsLike.classList.add('feels-like');
    const humidityTxt = document.createElement('p');
    humidityTxt.classList.add('sec-txt');
    humidityTxt.innerHTML = '<i class="fa-solid fa-droplet"></i> Humidity';
    const humidity = document.createElement('p');
    humidity.classList.add('secondary-info');
    const windTxt = document.createElement('p');
    windTxt.innerHTML = '<i class="fa-solid fa-wind"></i> Wind speed';
    windTxt.classList.add('sec-txt');
    const wind = document.createElement('p');
    wind.classList.add('secondary-info');
    const pressureTxt = document.createElement('p');
    pressureTxt.innerHTML = '<i class="fa-brands fa-cloudversify"></i> Air pressure'
    pressureTxt.classList.add('sec-txt');
    const pressure = document.createElement('p');
    pressure.classList.add('secondary-info');

    weatherIcon.src = `${imgSrc}`;
    condition.innerText = `${weatherCondition}`;
    city.innerText = `${queryCity}, ${country}`;
    temperature.innerHTML = `${currentTemperature} <sup>o</sup>`;
    feelsLike.innerHTML = `Feels like ${feelsLikeTemp} <sup>o</sup>`;

    if(isDay == 1){
        appContainer.style.backgroundImage = `url('${images[0]}')`;
    }else{
        appContainer.style.backgroundImage = `url('${images[1]}')`;
    }

    humidity.innerText = `${currentHumidity} %`;
    wind.innerText = `${windSpeed} km/h`;
    pressure.innerText = `${airPressure}`;

    mainDiv.appendChild(weatherIcon);
    mainDiv.appendChild(condition);
    mainDiv.appendChild(city);
    mainDiv.appendChild(temperature);
    mainDiv.appendChild(feelsLike);

    secDiv.appendChild(humidityTxt);
    secDiv.appendChild(humidity);
    secDiv.appendChild(windTxt);
    secDiv.appendChild(wind);
    secDiv.appendChild(pressureTxt);
    secDiv.appendChild(pressure);

    mainDiv.appendChild(weatherIcon);
    infoBoxDiv.appendChild(mainDiv);
    infoBoxDiv.appendChild(secDiv);
}

const fetchFunc = (city) => {
    fetch(`http://api.weatherapi.com/v1/current.json?key=40552be51e674bd8ba5170649220611&q=${city}`)
    .then((res) => {
        return res.json();
    })
    .then((res) => {
        renderInformation(res.current.condition.icon, res.current.condition.text, res.location.name, res.location.country, res.current.temp_c, res.current.feelslike_c, res.current.humidity, res.current.wind_kph, res.current.pressure_mb, res.current.is_day);
})
}


(() => {

    fetchFunc('Paris');

})();

searchBtn.addEventListener('click', () => {
    fetchFunc(cityInput.value);
})