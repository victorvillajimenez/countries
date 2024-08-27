import Country from "./Country";
import { useCountriesContext } from "../data/useCountriesContext";

function CountryGrid() {
  const { countries } = useCountriesContext();
  return (
    <div className="country-container country-grid">
      {countries.map((country) => (
        <Country key={country.name.common} country={country} />
      ))}
    </div>
  );
}

export default CountryGrid;
