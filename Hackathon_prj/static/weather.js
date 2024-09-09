let inhtm1 = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
    <circle fill="#FF156D" stroke="#FF156D" stroke-width="15" r="15" cx="35" cy="100">
        <animate attributeName="cx" calcMode="spline" dur="2s" values="35;165;165;35;35" keySplines="0 .1 .5 1" repeatCount="indefinite"></animate>
    </circle>
</svg>`;

let weather_data = async () => {
    let response = await fetch('city-weather/');
    let extre_weather = await response.json();
    console.log(extre_weather);
};

weather_data();

// Event listener for the update button

