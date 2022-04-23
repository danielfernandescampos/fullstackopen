import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";
import CountryList from "./components/CountryList";

function App() {
  const [countries, setCountries] = useState([]);
  const [showCountries, setShowCountries] = useState([]);

  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((response) => setCountries(response.data));
  }, []);

  const onSearch = (event) => {
    let search = event.target.value.toUpperCase();
    if (!search) {
      setShowCountries([]);
      return;
    }
    const filteredCountries = countries.filter((country) =>
      country.name.common.toUpperCase().includes(search)
    );
    setShowCountries(filteredCountries);
  };

  return (
    <div className="App">
      <form>
        <p>Search:</p>
        <input onChange={onSearch} />
      </form>
      <CountryList countries={showCountries}/>
    </div>
  );
}

export default App;
