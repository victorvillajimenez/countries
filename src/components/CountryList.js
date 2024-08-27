import Country from "./Country";
import { useCountriesContext } from "../data/useCountriesContext";

function CountryList() {
  const { countries } = useCountriesContext();
  return (
    <ol className="country-container country-list">
      {countries.map((country) => (
        <Country key={country.name.common} country={country} />
      ))}
    </ol>
  );
}

export default CountryList;
