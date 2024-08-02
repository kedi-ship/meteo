document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector(".search-form");
    const cityInput = document.querySelector(".search-form-input");
    const cityName = document.querySelector(".city-name");
    const weatherDescription = document.querySelector(".weather-description");
    const weatherTemp = document.querySelector(".weather-temp");

    const apiKey = "5504t80e34o44bffbfe9aeb8cda9bebb";
    const apiUrl = "https://api.shecodes.io/weather/v1/current";

    form.addEventListener("submit", async (event) => {
        event.preventDefault();
        const query = cityInput.value;
        try {
            const response = await fetch(`${apiUrl}?query=${query}&key=${apiKey}`);
            const data = await response.json();
            updateWeatherInfo(data);
        } catch (error) {
            console.error("Error fetching weather data:", error);
        }
    });

    function updateWeatherInfo(data) {
        const { city, temperature, condition, time, humidity, wind } = data;
        const date = new Date(time * 1000);
        const dateString = date.toLocaleString("en-GB", {
            weekday: "long",
            hour: "2-digit",
            minute: "2-digit",
        });

        cityName.textContent = city;
        weatherDescription.innerHTML = `${dateString}, ${condition.description}<br />Humidity: ${humidity}%, Wind: ${wind.speed} km/h`;
        weatherTemp.textContent = `${condition.icon} ${temperature.current}°C`;
    }
});
