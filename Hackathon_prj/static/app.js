// console.log("Hello World from app.js");
particlesJS('particles-js',

    {
        "particles": {
            "number": {
                "value": 80,
                "density": {
                    "enable": true,
                    "value_area": 800
                }
            },
            "color": {
                // "value": "#ffffff",
                "value": "#1858ed"
            },
            "shape": {
                "type": "circle",
                "stroke": {
                    "width": 0,
                    "color": "#000000",
                },
                "polygon": {
                    "nb_sides": 5
                },
                "image": {
                    "src": "img/github.svg",
                    "width": 100,
                    "height": 100
                }
            },
            "opacity": {
                "value": 0.5,
                "random": false,
                "anim": {
                    "enable": false,
                    "speed": 1,
                    "opacity_min": 0.1,
                    "sync": false
                }
            },
            "size": {
                "value": 5,
                "random": true,
                "anim": {
                    "enable": false,
                    "speed": 40,
                    "size_min": 0.1,
                    "sync": false
                }
            },
            "line_linked": {
                "enable": true,
                "distance": 150,
                // "color": "#ffffff",
                "color": "#e4e5f5",
                "opacity": 0.4,
                "width": 1
            },
            "move": {
                "enable": true,
                "speed": 6,
                "direction": "none",
                "random": false,
                "straight": false,
                "out_mode": "out",
                "attract": {
                    "enable": false,
                    "rotateX": 600,
                    "rotateY": 1200
                }
            }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": {
                    "enable": true,
                    "mode": "repulse"
                },
                "onclick": {
                    "enable": true,
                    "mode": "push"
                },
                "resize": true
            },
            "modes": {
                "grab": {
                    "distance": 400,
                    "line_linked": {
                        "opacity": 1
                    }
                },
                "bubble": {
                    "distance": 400,
                    "size": 40,
                    "duration": 2,
                    "opacity": 8,
                    "speed": 3
                },
                "repulse": {
                    "distance": 200
                },
                "push": {
                    "particles_nb": 4
                },
                "remove": {
                    "particles_nb": 2
                }
            }
        },
        "retina_detect": true,
        "config_demo": {
            "hide_card": false,
            "background_color": "#ffffff",
            "background_image": "",
            "background_position": "50% 50%",
            "background_repeat": "no-repeat",
            "background_size": "cover"
        }
    }

);
fetch('/get-api-key/')
    .then(response => response.json())
    .then(data => {
        const openWeatherMapToken = data.api_key;
        // Now use openWeatherMapToken in your code
    
var inhtm = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
    <circle fill="#FF156D" stroke="#FF156D" stroke-width="15" r="15" cx="35" cy="100">
        <animate attributeName="cx" calcMode="spline" dur="2" values="35;165;165;35;35" keySplines="0 .1 .5 1;0 .1 .5 1;0 .1 .5 1;0 .1 .5 1" repeatCount="indefinite" begin="0"></animate>
    </circle>
    <circle fill="#FF156D" stroke="#FF156D" stroke-width="15" opacity=".8" r="15" cx="35" cy="100">
        <animate attributeName="cx" calcMode="spline" dur="2" values="35;165;165;35;35" keySplines="0 .1 .5 1;0 .1 .5 1;0 .1 .5 1;0 .1 .5 1" repeatCount="indefinite" begin="0.05"></animate>
    </circle>
    <circle fill="#FF156D" stroke="#FF156D" stroke-width="15" opacity=".6" r="15" cx="35" cy="100">
        <animate attributeName="cx" calcMode="spline" dur="2" values="35;165;165;35;35" keySplines="0 .1 .5 1;0 .1 .5 1;0 .1 .5 1;0 .1 .5 1" repeatCount="indefinite" begin=".1"></animate>
    </circle>
    <circle fill="#FF156D" stroke="#FF156D" stroke-width="15" opacity=".4" r="15" cx="35" cy="100">
        <animate attributeName="cx" calcMode="spline" dur="2" values="35;165;165;35;35" keySplines="0 .1 .5 1;0 .1 .5 1;0 .1 .5 1;0 .1 .5 1" repeatCount="indefinite" begin=".15"></animate>
    </circle>
    <circle fill="#FF156D" stroke="#FF156D" stroke-width="15" opacity=".2" r="15" cx="35" cy="100">
        <animate attributeName="cx" calcMode="spline" dur="2" values="35;165;165;35;35" keySplines="0 .1 .5 1;0 .1 .5 1;0 .1 .5 1;0 .1 .5 1" repeatCount="indefinite" begin=".2"></animate>
    </circle>
</svg>`;
document.querySelector('.container').innerHTML = `${inhtm}<div class='Weather_city'></div>`;

let retryInterval;

const fetchWeather = async (city) => {
    document.querySelector('.container>svg').classList.remove('hidden'); // Show preloader

    if (!city) {
        alert("Please enter a city name.");
        return;
    }

    try {
        if (!navigator.onLine) {
            throw new Error('You are offline. Please reconnect to get updated weather data.');
        }

        // Fetch weather details from Django API
        const weatherResponse = await fetch(`/api/weather?city=${city}`, {
            headers: {
                'Authorization': `Bearer ${openWeatherMapToken}`
            }
        });

        if (!weatherResponse.ok) {
            throw new Error(weatherResponse.status === 404 ? 'City not found' : 'Unable to fetch weather data');
        }

        if (weatherResponse.status === 503) {
            console.log('connect to internet');
        }

        const weatherData = await weatherResponse.json();

        // weather emojis are here

        const response = await fetch('static/weatherEmojis.json');
        const emojiMap = await response.json();
        const weatherDescription = weatherData.weather[0].description;  // Example description

        // Display weather details
        document.querySelector('.Weather_city').innerHTML = `
        <h2>Weather in ${emojiMap['city_name']} ${city}</h2>
        <p><strong>Temperature:</strong>${emojiMap['temperature']} ${Math.round(weatherData.main.temp - 273.15)}°C</p>
        <p><strong>Weather:</strong>${emojiMap[weatherDescription]} ${weatherData.weather[0].description}</p>
        <p><strong>Humidity:</strong>${emojiMap['humidity']} ${weatherData.main.humidity}%</p>
        <p><strong>Wind Speed:</strong>${emojiMap['wind_speed']} ${weatherData.wind.speed} m/s</p>
        `;

        clearInterval(retryInterval); // Stop retrying once the data is successfully fetched
        document.getElementById('cityInput').value = '';
    } catch (error) {
        document.querySelector('.Weather_city').innerHTML = `<p style="color:red;">Error: ${error.message}</p>`;
        if (error.message == 'Unable to fetch weather data') {
            clearInterval(retryInterval); // Clear any existing interval before starting a new one
            // Start checking for reconnection and refetch data when online
            retryInterval = setInterval(() => {
                if (navigator.onLine) {
                    console.log('Reconnected, refetching data...');
                    fetchWeather(city);
                }
            }, 5000); // Retry every 5 seconds
        }
    } finally {
        document.querySelector('.container>svg').classList.add('hidden'); // Hide preloader after processing
    }
};

// Initialize weather data for 'delhi' when the page loads
window.addEventListener('load', () => {
    fetchWeather('delhi');
});

// Event listener for form submission
document.querySelector('#submit').addEventListener('submit', async (e) => {
    e.preventDefault();
    let city = document.getElementById('cityInput').value || 'delhi'; // Use 'delhi' if no city is entered
    clearInterval(retryInterval); // Clear any existing retry interval before starting a new request
    document.querySelector('.container').innerHTML = `${inhtm}<div class='Weather_city'></div>`; // Reset container
    fetchWeather(city); // Fetch and display weather data
});

// Event listener for online status
window.addEventListener('online', () => {
    let city = document.getElementById('cityInput').value || 'delhi'; // Use 'delhi' if no city is entered
    fetchWeather(city);
});

})
.catch(error => {
    // console.error('Error fetching API key:', error);
});




// Down update weather codes and preloader




var inhtm = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
    <circle fill="#FF156D" stroke="#FF156D" stroke-width="15" r="15" cx="35" cy="100">
        <animate attributeName="cx" calcMode="spline" dur="2" values="35;165;165;35;35" keySplines="0 .1 .5 1;0 .1 .5 1;0 .1 .5 1;0 .1 .5 1" repeatCount="indefinite" begin="0"></animate>
    </circle>
    <circle fill="#FF156D" stroke="#FF156D" stroke-width="15" opacity=".8" r="15" cx="35" cy="100">
        <animate attributeName="cx" calcMode="spline" dur="2" values="35;165;165;35;35" keySplines="0 .1 .5 1;0 .1 .5 1;0 .1 .5 1;0 .1 .5 1" repeatCount="indefinite" begin="0.05"></animate>
    </circle>
    <circle fill="#FF156D" stroke="#FF156D" stroke-width="15" opacity=".6" r="15" cx="35" cy="100">
        <animate attributeName="cx" calcMode="spline" dur="2" values="35;165;165;35;35" keySplines="0 .1 .5 1;0 .1 .5 1;0 .1 .5 1;0 .1 .5 1" repeatCount="indefinite" begin=".1"></animate>
    </circle>
    <circle fill="#FF156D" stroke="#FF156D" stroke-width="15" opacity=".4" r="15" cx="35" cy="100">
        <animate attributeName="cx" calcMode="spline" dur="2" values="35;165;165;35;35" keySplines="0 .1 .5 1;0 .1 .5 1;0 .1 .5 1;0 .1 .5 1" repeatCount="indefinite" begin=".15"></animate>
    </circle>
    <circle fill="#FF156D" stroke="#FF156D" stroke-width="15" opacity=".2" r="15" cx="35" cy="100">
        <animate attributeName="cx" calcMode="spline" dur="2" values="35;165;165;35;35" keySplines="0 .1 .5 1;0 .1 .5 1;0 .1 .5 1;0 .1 .5 1" repeatCount="indefinite" begin=".2"></animate>
    </circle>
</svg>`;


// adding manually
document.getElementById('update-weather-btn').addEventListener('click', function() {
    let updateWeather = async () => {
        // Show preloader before fetching
        document.querySelector('#update-status').innerHTML = inhtm;
        console.log('Fetching updated weather data...');
        // Fetch the updated weather data
        let response = await fetch('api/cities_with_states/');
        let extre_weather = await response.json();

        // Display data or error message
        if (extre_weather['status'] !== 'Data updated successfully') {
            console.log('Error updating data');
            document.querySelector('#update-status').innerHTML = `${inhtm}`;
            document.querySelector('#update-status>svg').classList.remove('hidden');
            document.querySelector('#update-status>svg').style.display = 'block !important';
        } else {
            console.log('Data updated successfully');
            // Remove the preloader and display a success message
            document.querySelector('#update-status').innerHTML = `<p>${extre_weather['status']}</p>`;
        }
    };

    updateWeather();
});