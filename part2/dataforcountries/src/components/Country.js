import { useState, useEffect } from "react";
import axios from "axios";

const Country = ({ country }) => {
  const api_key = process.env.REACT_APP_API_KEY;
  const weather_api = `http://api.openweathermap.org/data/2.5/weather?q=${country.capital}&appid=${api_key}&units=metric`;

  const [temperature, setTemperature] = useState("");
  const [icon, setIcon] = useState("");
  const [wind, setWind] = useState("");

  useEffect(() => {
    axios.get(weather_api).then((response) => {
      setTemperature(response.data.main.temp);
      setIcon(response.data.weather[0].icon);
      setWind(response.data.wind.speed);
    });
  }, [weather_api]);

  return (
    <div>
      <h2>{country.name}</h2>
      <p>Capital {country.capital}</p>
      <p>area {country.area}</p>

      <h4>Languages:</h4>
      <ul>
        {country.languages.map((language) => (
          <li key={language.name}>{language.name}</li>
        ))}
      </ul>
      <img src={country.flag} alt={country.name + "'s flag"} width="10%" />

      <h3>Weather in {country.capital}</h3>
      <p>Temperature {temperature} Celsius</p>
      <img
        src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
        alt={`Weather icon`}
        width="7%"
      />
      <p>Wind {wind} m/s</p>
    </div>
  );
};

export default Country;
