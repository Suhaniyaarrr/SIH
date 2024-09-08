async function fetchExtremeWeatherCities() {
    try {
        const response = await fetch('/api/extreme-weather-cities');
        const data = await response.json();
        console.log('Extreme Weather Cities:', data.extreme_cities);
    } catch (error) {
        console.error('Error fetching extreme weather cities:', error);
    }
}

window.addEventListener('load', fetchExtremeWeatherCities);
