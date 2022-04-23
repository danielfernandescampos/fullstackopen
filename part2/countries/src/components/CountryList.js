import Country from "./Country";
import CountryDetails from "./CountryDetails";

const CountryList = (props) => {
    return (
    <>
      {props.countries.length < 9 && props.countries.length > 1 && (
        <ul>
          {props.countries.map((country) => (
            <li key={country.name.common}>
              <Country country={country}/>
            </li>
          ))}
        </ul>
      )}
      {props.countries.length > 9 && (
        <p>Too many matches please specify more...</p>
      )}
     {props.countries.length === 1 && <CountryDetails country={props.countries[0]}/>}
    </>
  );
};

export default CountryList;
