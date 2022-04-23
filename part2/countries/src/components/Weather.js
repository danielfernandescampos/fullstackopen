import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "./Loader";

const Weather = (props) => {
  const APIkey = process.env.REACT_APP_API_KEY;
  const cityName = props.country.capital;
  const countryCode = props.country.car.cca2;

  const [weather, setWeather] = useState(false);

  useEffect(() => {
    axios
      .get(
        `http://api.openweathermap.org/geo/1.0/direct?q=
            ${cityName},
            ${countryCode}
            &appid=${APIkey}`
      )
      .then((data) =>
        axios
          .get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${data.data[0].lat}&lon=${data.data[0].lon}&appid=${APIkey}`
          )
          .then((data) => setWeather(data.data))
      );
  }, [cityName, countryCode, APIkey]);

  return (
    <>
      <h2>Weather in {props.country.capital[0]}</h2>
      {weather ? (
        <>
          <p>temperature: {weather?.main?.temp - 273.15}ºC</p>
          <p>wind: {weather?.wind?.speed} m/s</p>
        </>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default Weather;
