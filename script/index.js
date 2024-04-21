const myInput = document.querySelector('#text');
const content = document.querySelector('#components');
const header = document.querySelector('#header');
const btn = document.querySelector('#btn');
const hide = document.querySelector('#hide');
const cityName = document.createElement('p');
const weather = document.createElement('p');
weather.setAttribute('id', 'weather');
const temp = document.querySelector('#temp');
const wind = document.querySelector('#wind');
const humidity = document.querySelector('#humidity');
const loading = document.querySelector('#hide-loading');
let backgroundUrl;

async function getCity() {
    try {
        const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=7466e8f03bba411e905105443241804&q=${myInput.value}`, {mode: 'cors'});
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }

        const city = await response.json();

        cityName.textContent = `${city.location.name}, ${city.location.country}`;
        weather.textContent = city.current.condition.text;
        humidity.textContent = city.current.humidity + '%';
        wind.textContent = city.current.wind_kph + 'kph';
        temp.textContent = city.current.temp_c + '°';

        header.appendChild(cityName);
        header.appendChild(weather);
        console.log(city);

        // This changes the background of every weather condition

        if (weather.textContent === "Clear" || weather.textContent === "Sunny") {
            backgroundUrl = "url('../src/assets/wallpaper4.jpg')";
        } else if (weather.textContent.toLowerCase() === "partly cloudy") {
            backgroundUrl = "url('../src/assets/wallpaper8.jpg')";
        } else if (weather.textContent.toLocaleLowerCase().includes("cloudy") || weather.textContent === "Overcast") {
            backgroundUrl = "url('../src/assets/wallpaper7.jpg')";
        } else if (weather.textContent === "Mist" || weather.textContent === "Fog" || weather.textContent === "Freezing fog") {
            backgroundUrl = "url('../src/assets/wallpaper1.jpg')";
        } else if (weather.textContent.includes("thunder")) {
            backgroundUrl = "url('../src/assets/wallpaper5.jpg')";
        } else if (weather.textContent.toLowerCase().includes("blizzard") || weather.textContent.toLowerCase().includes("snow")) {
            backgroundUrl = "url('../src/assets/wallpaper6.jpg')";
        } else if (weather.textContent.toLocaleLowerCase().includes("rain")) {
            backgroundUrl = "url('../src/assets/wallpaper3.jpg')";
        } else if (weather.textContent.toLowerCase().includes("sleet showers") || weather.textContent.toLowerCase().includes("snow showers")) {
            backgroundUrl = "url('../src/assets/wallpaper2.jpg')";
        } else {
            backgroundUrl = "url('../src/assets/wallpaper8.jpg')";
        }

        document.body.style.transition = "background-image .5s ease";
        document.body.style.backgroundImage = backgroundUrl;

        loading.style.display = 'none';

    } catch (error) {
        loading.style.display = 'none';
        hide.style.display = 'none';

        cityName.textContent = 'No such city.';
        weather.textContent = '';
        header.appendChild(cityName);
    }
}

// This toggles the weather info

function hideDiv() {
    hide.style.display = 'block';
}

// Function to handle search button

btn.addEventListener('click', () => {
    loading.style.display = 'block';
    content.children.textContent = '';
    setTimeout(getCity, 700);
    setTimeout(hideDiv, 700);
});

// Function to handle Enter key

myInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        loading.style.display = 'block';
        content.children.textContent = '';
        setTimeout(getCity, 700);
        setTimeout(hideDiv, 700);
    }
});