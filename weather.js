function WeatherNow(p)
{
    const temperature = Math.round(p.main.temp);
    const temperaturefeel = Math.round(p.main.feels_like);
    document.getElementById('city').innerHTML = p.name;
    document.getElementById('temperature').innerHTML = (temperature >= 0 ? "+" + temperature : temperature) + "°";
    document.getElementById("icon").src = "http://openweathermap.org/img/wn/" + p.weather[0].icon + "@2x.png";
    document.getElementById('condition').innerHTML = p.weather[0].description[0].toUpperCase() + p.weather[0].description.slice(1);
    document.getElementById('feelsLike').innerHTML =(temperaturefeel >= 0 ? "Ощущается как " + "+" + temperaturefeel  : "Ощущается как " + temperaturefeel) + "°";
}

function weather()
{
    const city = CitySearch.value === "" ? "Москва" : encodeURIComponent(CitySearch.value);
    const api_key = "32273e1edabe3f7e12571409dbace3cf";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&lang=ru&units=metric&appid=" + api_key;

    const CurrentData = fetch(url).then(response => response.json());

    CurrentData
        .then(
            result => {
                if (result.cod === "404")
                    alert("Такого города нет. Ты проиграл!")
                else
                    WeatherNow(result);
            },
            error => alert(error)
        );
    
}