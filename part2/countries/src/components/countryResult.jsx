import Weather from "./weather";

const CountryResult = ({ countries, setSearch }) => {
  if (countries.length === 0) {
    return null;
  }

  if (countries.length > 10) {
    return <div>Too many matches, specify another filter</div>;
  }

  if (countries.length > 1) {
    return (
      <ul style={{ listStyle: "none", padding: 0 }}>
        {countries.map((country) => (
          <li key={country.cca3} style={{ marginBottom: "5px" }}>
            {country.name.common}{" "}
            <button onClick={() => setSearch(country.name.common)}>show</button>
          </li>
        ))}
      </ul>
    );
  }

  const country = countries[0];
  const capital = country.capital ? country.capital[0] : null;

  return (
    <div>
      <h2>{country.name.common}</h2>
      <div>capital {capital || "N/A"}</div>
      <div>area {country.area}</div>

      <h3>languages:</h3>
      <ul>
        {Object.values(country.languages || {}).map((lang, index) => (
          <li key={index}>{lang}</li>
        ))}
      </ul>

      <img
        src={country.flags.png}
        alt={`Flag of ${country.name.common}`}
        style={{ width: "150px", border: "1px solid #ccc", marginTop: "10px" }}
      />

      {capital && <Weather capital={capital} />}
    </div>
  );
};

export default CountryResult;
