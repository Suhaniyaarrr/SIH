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


const openWeatherMapToken = '4aa285508118d106aa265c2c2397529f';
document.querySelector('#submit').addEventListener('submit', async (e) => {
    e.preventDefault();
// });
    // document.getElementById('fetchWeatherBtn').addEventListener('click', async () => {
        const city = document.getElementById('cityInput').value;
        if (!city) {
            alert("Please enter a city name.");
            return;
        }

        try {
            // Step 1: Get Weather Details from OpenWeatherMap for the entered city
            const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${openWeatherMapToken}`);

            if (!weatherResponse.ok) {
                throw new Error('City not found');
            }

            const weatherData = await weatherResponse.json();

            // Step 2: Display Weather Details
            document.querySelector('.container').innerHTML = `
                    <h2>Weather in ${city}</h2>
                    <p><strong>Temperature:</strong> ${Math.round(weatherData.main.temp - 273.15)}°C</p>
                    <p><strong>Weather:</strong> ${weatherData.weather[0].description}</p>
                    <p><strong>Humidity:</strong> ${weatherData.main.humidity}%</p>
                    <p><strong>Wind Speed:</strong> ${weatherData.wind.speed} m/s</p>
                `;

        } catch (error) {
            document.getElementById('weatherDetails').innerHTML = `<p style="color:red;">Error: ${error.message}</p>`;
        }
    });