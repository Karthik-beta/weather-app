// Get references to the HTML elements we'll be using
const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');

// Listen for a click on the search button
search.addEventListener('click', () => {

    // Set up the API call with our API key and the city the user entered
    const APIKey = '4c28e5e4113e6f0b31d245e4c6f49ba4';
    const city = document.querySelector('.search-box input').value;

    if (city === '')
        return;

    // Make the API call
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
        .then(response => response.json())
        .then(json => {

            // If the API returns a 404 error
            if (json.cod === '404') {
                container.style.height = '400px';
                weatherBox.style.display = 'none';
                weatherDetails.style.display = 'none';
                error404.style.display = 'block';
                error404.classList.add('fadeIn');
                return;
            }

            // If we get a successful response
            error404.style.display = 'none';
            error404.classList.remove('fadeIn');

            // Update the weather information in the HTML with the data from the API response
            const image = document.querySelector('.weather-box img');
            const temperature = document.querySelector('.weather-box .temperature');
            const description = document.querySelector('.weather-box .description');
            const humidity = document.querySelector('.weather-details .humidity span');
            const wind = document.querySelector('.weather-details .wind span');

            // Choose the appropriate weather icon based on the weather conditions reported by the API
            switch (json.weather[0].main) {
                case 'Clear':
                    image.src = 'images/clear.png';
                    break;

                case 'Rain':
                    image.src = 'images/rain.png';
                    break;

                case 'Snow':
                    image.src = 'images/snow.png';
                    break;

                case 'Clouds':
                    image.src = 'images/cloud.png';
                    break;

                case 'Haze':
                    image.src = 'images/mist.png';
                    break;

                default:
                    image.src = '';
            }

            // Display the temperature, description, humidity, and wind speed reported by the API
            temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
            description.innerHTML = `${json.weather[0].description}`;
            humidity.innerHTML = `${json.main.humidity}%`;
            wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

            // Show the weather information and animate it in
            weatherBox.style.display = '';
            weatherDetails.style.display = '';
            weatherBox.classList.add('fadeIn');
            weatherDetails.classList.add('fadeIn');
            container.style.height = '590px';


        });


});