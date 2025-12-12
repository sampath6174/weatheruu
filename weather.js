const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const input = document.querySelector('.search-box input');
const weatherbox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');
const cityHide = document.querySelector('.city-hide');
input.addEventListener("keyup", function(event){
    if (event.key === "Enter") {
        search.click();
    }
});
search.addEventListener('click', () =>{
    const APIKey = '50fba559e5ccf7e08a918ecd5af2176b';
    const city = document.querySelector('.search-box input').value;
    if (city == '')
        return;
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`).then(response => response.json()).then(json => {
        if (json.cod == '404') {

            alert("Please enter a valid city name.");
        
            cityHide.textContent = city;
            container.style.height = '400px';
            weatherbox.classList.remove('active');
            weatherDetails.classList.remove('active');
            error404.classList.add('active');
            return;
        }
        const image = document.querySelector('.weather-box img');
        const temperature = document.querySelector('.weather-box .temperature');
        const description = document.querySelector('.weather-box .description');
        const humidity = document.querySelector('.weather-details .humidity span');
        const wind = document.querySelector('.weather-details .wind span');
        if (cityHide.textContent == city) {
            return;
        }
        else {
            cityHide.textContent = city;
            container.style.height = '555px';
            container.classList.add('active');
            weatherbox.classList.add('active');
            weatherDetails.classList.add('active');
            error404.classList.remove('active');

            setTimeout(()=>{
                container.classList.remove('active');
            }, 2500);

            switch (json.weather[0].main) {
            case 'Clear':
                image.src = 'clear.png';
            break;

                case 'Rain':
                    image.src = 'rain.png';
                break;

                case 'Snow':
                    image.src = 'snow.png';
                break;

                case 'Clouds':
                    image.src = 'cloud.png';
                break;

                case 'Mist':
                    image.src = 'mist.png';
                break;

                case 'Haze':
                    image.src = 'mist.png';
                break;

            default:
                image.src = 'cloud.png';   
        }

        temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
        description.innerHTML = `${json.weather[0].description}`;
        humidity.innerHTML = `${json.main.humidity}%`;
        wind.innerHTML = `${parseInt(json.wind.speed*3.6)}km/h`;

        const infoWeather = document.querySelector('.info-weather');
        const infoHumidity = document.querySelector('.info-humidity');
        const infoWind = document.querySelector('.info-wind');

        const elCloneInfoWeather = infoWeather.cloneNode(true);
        const elCloneInfoHumidity = infoHumidity.cloneNode(true);
        const elCloneInfoWind = infoWind.cloneNode(true);

        elCloneInfoWeather.id = 'clone-info-weather';
        elCloneInfoWeather.classList.add('active-clone');

        elCloneInfoHumidity.id = 'clone-info-humidity';
        elCloneInfoHumidity.classList.add('active-clone');

        elCloneInfoWind.id = 'clone-info-wind';
        elCloneInfoWind.classList.add('active-clone');

        setTimeout(()=>{

            infoWeather.insertAdjacentElement("afterend", elCloneInfoWeather);
            infoHumidity.insertAdjacentElement("afterend", elCloneInfoHumidity);
            infoWind.insertAdjacentElement("afterend", elCloneInfoWind);

        },2200);

        const cloneWeatherNodes = document.querySelectorAll('.info-weather.active-clone');
        const totalCloneInfoWeather = cloneWeatherNodes.length;
        const elCloneInfoWeatherFirst = cloneWeatherNodes[0];

        const cloneHumidityNodes = document.querySelectorAll('.info-humidity.active-clone');
        const elCloneInfoHumidityFirst = cloneHumidityNodes[0];

        const cloneWindNodes = document.querySelectorAll('.info-wind.active-clone');
        const elCloneInfoWindFirst = cloneWindNodes[0];

        if (totalCloneInfoWeather > 0) {
            elCloneInfoWeatherFirst.classList.remove('active-clone');
            elCloneInfoHumidityFirst.classList.remove('active-clone');
            elCloneInfoWindFirst.classList.remove('active-clone');

            setTimeout(()=>{
                elCloneInfoWeatherFirst.remove();
                elCloneInfoHumidityFirst.remove();
                elCloneInfoWindFirst.remove();

            },2200)

        }


        }
    });

});