import { useState, useEffect } from "react";
import axios from "axios";

import CountryResult from "./components/countryResult";

function App() {
  const [search, setSearch] = useState("");
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((response) => {
        setCountries(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const countriesToShow =
    search === ""
      ? []
      : countries.filter((country) =>
          country.name.common.toLowerCase().includes(search.toLowerCase()),
        );

  return (
    <div style={{ padding: "20px" }}>
      <div>
        find countries <input value={search} onChange={handleSearchChange} />
      </div>

      <div style={{ marginTop: "15px" }}>
        <CountryResult countries={countriesToShow} setSearch={setSearch} />
      </div>
    </div>
  );
}

export default App;
