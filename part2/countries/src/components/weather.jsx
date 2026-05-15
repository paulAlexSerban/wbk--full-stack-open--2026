import { useState, useEffect } from "react";
import axios from "axios";

const API_KEY = import.meta.env.VITE_WEATHER_KEY;

const Weather = ({ capital }) => {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!capital) {
      return;
    }

    setWeather(null);
    setError(null);

    axios
      .get("https://api.openweathermap.org/geo/1.0/direct", {
        params: { q: capital, limit: 1, appid: API_KEY },
      })
      .then((response) => {
        if (!response.data.length) {
          throw new Error(`City not found: ${capital}`);
        }
        const { lat, lon } = response.data[0];

        return axios.get("https://api.openweathermap.org/data/2.5/weather", {
          params: { lat, lon, appid: API_KEY, units: "metric" },
        });
      })
      .then((response) => {
        setWeather(response.data);
      })
      .catch((err) => {
        console.error("Weather fetch error:", err);
        setError("Could not load weather data.");
      });
  }, [capital]);

  if (error) {
    return <div>{error}</div>;
  }
  if (!weather) {
    return <div>Loading weather for {capital}...</div>;
  }

  const { main, wind, weather: conditions } = weather;
  const iconUrl = `https://openweathermap.org/img/wn/${conditions[0].icon}@2x.png`;

  return (
    <div>
      <h3>Weather in {capital}</h3>
      <div>temperature {main.temp} °C</div>
      <img src={iconUrl} alt={conditions[0].description} />
      <div>wind {wind.speed} m/s</div>
    </div>
  );
};

export default Weather;
