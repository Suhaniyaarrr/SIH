
let weather_data = async () => {
    console.log('Fetching weather data');
    let response = await fetch('city-weather/');
    let extre_weather = await response.json();
    // console.log(extre_weather);
    for(w_c in extre_weather){
        console.log(w_c);
    };
};

weather_data();

// Event listener for the update button

