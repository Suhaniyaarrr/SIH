let weather_data = async () => {
    let response = await fetch('city-weather/');
    let extre_weather = await response.json();
    console.log(extre_weather);
}

weather_data();