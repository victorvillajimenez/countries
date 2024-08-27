import { useState } from "react";
import { useCountriesContext } from "../data/useCountriesContext";
import { useCountryModel } from "../data/countryModel";
import CountryCurrencies from "./CountryCurrencies";
import CountryLanguages from "./CountryLanguages";
import CountryBorders from "./CountryBorders";

function CountryDetails({ name }) {
  const model = useCountryModel();
  const context = useCountriesContext();
  const [isOpen, setIsOpen] = useState(false);
  const [country, setCountry] = useState(undefined);

  const onClick = async (e) => {
    if (isOpen) {
      setCountry(undefined);
      setIsOpen(false);
      return;
    }
    const idx = context.store.findIndex((c) => c.name.common === name);
    if (idx === -1) return;
    const hasDetails = !!context.store[idx].flags;
    if (hasDetails) {
      setCountry(context.store[idx]);
      setIsOpen(true);
      return;
    }
    const countryWithDetails = await model.getDetails(name, idx);
    setCountry(countryWithDetails);
    setIsOpen(true);
  };

  return (
    <div>
      <button onClick={onClick}>{isOpen ? "View less" : "View more"}</button>
      {isOpen && (
        <section className="country-details">
          <div className="country-details-left">
            <div className="country-official">
              <strong>Official: </strong>
              {country.name.official}
            </div>
            <CountryLanguages languages={country.languages} />
            <CountryCurrencies currencies={country.currencies} />
            <CountryBorders borders={country.borders} />
          </div>
          <img
            src={country.flags.svg}
            alt={country.flags.alt || `The flag of ${country.name.common}`}
            width="150"
            height="100"
            className="country-flag"
          />
        </section>
      )}
    </div>
  );
}

export default CountryDetails;
