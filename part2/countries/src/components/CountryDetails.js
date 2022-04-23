import Weather from "./Weather";

const CountryDetails = (props) => (
  <div className="countryDetails">
    <h2>{props.country.name.common}</h2>
    <img src={props.country.flags.png} alt={props.country.flags.png} />
    <p>capital: {props.country.capital[0]}</p>
    <p>area: {props.country.area} km2</p>
    <h3>Languages</h3>
    <ul>
      {Object.values(props.country.languages).map((lang) => (
        <li key={lang}>{lang}</li>
      ))}
    </ul>
    <Weather country={props.country} />
  </div>
);

export default CountryDetails;
