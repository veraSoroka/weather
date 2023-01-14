
// ******* LEFT SIDE *******

let leftSide = document.querySelector(".left-side");
let city = document.querySelector(".city-name");
let inputPlace = document.querySelector(".input-place");
let cityDate = document.querySelector(".data");
let cityTime = document.querySelector(".time");
let cityWeather = document.querySelector(".weather-item");
let weatherClouds = document.querySelector(".weather-clouds");
let weatherCloudsImg = document.querySelector(".weather-clouds-img");
let btnMore = document.querySelector(".more-info");
let btnClose = document.querySelector(".close-btn");
let mylocation = document.querySelector(".my-location");
let cityName = document.querySelector(".input-city");
let errorMessage = document.querySelector(".error");
let localName;

document.addEventListener("keydown", function (event){
    if (event.keyCode === 13) {
        let cityInputName = cityName.value;
        getWeather(cityInputName);
        inputPlace.className = "input-place-new";
        mylocation.style.display = "block";
        console.log(cityInputName);
    }
})

function getWeather (cityName) {
    btnMore.style.display = "block";
    let url1 = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=fd2c29df66882de993d427cb8f5d1c29`;


// ******* RIGHT SIDE *******

    let rightSide = document.querySelector(".right-side");
    let humidityInfo = document.querySelector(".humidity");
    let windInfo = document.querySelector(".wind");
    let feelsInfo = document.querySelector(".feels");


    btnMore.addEventListener("click", function () {
        rightSide.style.display = "block";
        rightSide.className = "right-side visible";
        leftSide.className = "left-side-new"
        btnMore.style.display = "none";
    })

    btnClose.addEventListener("click", function (){
        rightSide.style.display = "none";
        rightSide.className = "show";
        rightSide.style.transition = "opacity .5s";
        btnMore.style.display = "block";
        leftSide.className = "left-side"
    })


    fetch(url1)
        .then(function (responce){
            return responce.json();
        })
        .then(function (data){
            if (data.message === "city not found") {
                errorMessage.innerHTML = "Non-existent city";
                errorMessage.style.display = "block";
                inputPlace.className = "input-place";
                btnMore.style.display = "none";
                city.style.display = "none";
                cityTime.style.display = "none";
                cityDate.style.display = "none";
                cityWeather.style.display = "none";
                cityDate.style.display = "none";
                weatherClouds.style.display = "none";
                weatherCloudsImg.style.display = "none";
            } else {
                errorMessage.style.display = "none";
                mylocation.style.display = "none";
                city.style.display = "flex";
                cityTime.style.display = "block";
                cityDate.style.display = "block";
                cityWeather.style.display = "block";
                cityDate.style.display = "block";
                weatherClouds.style.display = "block";
                weatherCloudsImg.style.display = "block";
                city.innerHTML = data.name;

            let date = new Date();
            let dayName = date.toLocaleDateString("en-GB", {weekday: 'long'});
            let dateCityYear = date.toLocaleDateString("en-GB", {year: 'numeric', month: 'long', day: 'numeric'});

            cityTime.innerHTML = dateCityYear;
            cityDate.innerHTML = dayName;

            cityWeather.innerHTML = `${Math.round(data.main.temp)}°`;
            weatherCloudsImg.innerHTML = '<img src="http://openweathermap.org/img/wn/' + data.weather[0]["icon"] + '@2x.png"/>'

            let cloudsInfo;
            data.weather.forEach (element => cloudsInfo = (element.main));
            weatherClouds.innerHTML = cloudsInfo;


            humidityInfo.innerText = `Humidity:  ${data.main.humidity}%`;
            windInfo.innerText = `Wind speed:  ${data.wind.speed} m/s`;
            feelsInfo.innerText = `Feels like: ${Math.round(data.main.feels_like)}°`
            }
        })


    let url33 =`http://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=metric&appid=fd2c29df66882de993d427cb8f5d1c29`;

    fetch(url33)
        .then(function (responce) {
            return responce.json();
        })
        .then(function (data) {
            renderWeather(1, data.list[8])
            renderWeather(2, data.list[16])
            renderWeather(3, data.list[24])
        })
}

    mylocation.addEventListener("click", function (){
        console.log("localWeather");
        getLocalWeather();
        mylocation.style.display = "none";
        inputPlace.className = "input-place-new";
        mylocation.style.display = "none";

    })

    function getLocalWeather() {
    navigator.geolocation.getCurrentPosition(function(position) {
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;

        let url44 = `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=fd2c29df66882de993d427cb8f5d1c29`;
        console.log(url44);

        fetch(url44)
            .then(function (responce){
                return responce.json();
            })
            .then(function (data){
                localName = (data[0].name);
                getWeather (localName);
            })
    });
    }

        function renderWeather(day, data) {
            console.log(data);
            let divId = `#next-day-${day}`;


            let dataWeatherRight = document.querySelector(`${divId} .data-weather`);

            let nameDayRight = document.querySelector(`${divId} .name-day`);
            let weatherInfoRight = document.querySelector(`${divId} .weather-info`);
            let weatherIconRight = document.querySelector(`${divId} .weather-icon`);

            let date = new Date(data.dt_txt);
            let dayName1 = date.toLocaleDateString("en-GB", {weekday: 'long'});

            let timeValue = new Date(data.dt_txt);
            let dayName2 = timeValue.toLocaleDateString("en-GB", {month: 'long', day: 'numeric'});

            nameDayRight.innerHTML = dayName1;
            dataWeatherRight.innerHTML = dayName2;

            weatherInfoRight.innerHTML = Math.round(data.main.temp)+"°";
            weatherIconRight.innerHTML = '<img src="http://openweathermap.org/img/wn/' + data.weather[0]["icon"] + '@2x.png"/>'
        }

