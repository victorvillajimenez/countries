import CountryDetails from "./CountryDetails";
import { numberIntlDefault } from "../utils";

function Country({ country }) {
  return (
    <div className="country">
      <div>
        {country.flag} {country.name.common}
      </div>
      <div>
        <strong>Capital: </strong> {country.capital}
      </div>
      <div>
        <strong>Population: </strong>
        {numberIntlDefault.format(country.population)}
      </div>
      <div>
        <strong>Continent: </strong> {country.region}
      </div>
      <CountryDetails name={country.name.common} />
    </div>
  );
}

export default Country;
