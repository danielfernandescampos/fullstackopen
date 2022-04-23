import { useState } from "react";
import CountryDetails from "./CountryDetails";

const Country = (props) => {
  const [showCountry, setShowCountry] = useState(false);

  const buttonText = () => showCountry ? 'hide' : 'show'

  return (
    <>
      <div className="country">
        <p>{props.country.name.common}</p>
        <button onClick={() => setShowCountry(!showCountry)}>{buttonText()}</button>
      </div>
      {showCountry && <CountryDetails country={props.country}/>}
    </>
  );
};

export default Country;
