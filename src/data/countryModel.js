import { useCountriesContext } from "./useCountriesContext";
import { FETCH } from "./model";
import { COUNTRIES_URL, COUNTRY_URL } from "../config";
import { sortByCommonName } from "../utils";

function useCountryModel() {
  const context = useCountriesContext();

  const load = function () {
    if (context.statusApp !== "init") return;
    FETCH(COUNTRIES_URL).then((countries) => {
      countries.sort(sortByCommonName);
      context.setStore(countries);
      context.setCountries(countries);
      context.setStatusApp("countries");
    });
  };

  const getDetails = function (name, idxCountry) {
    return FETCH(`${COUNTRY_URL}${encodeURIComponent(name)}`).then(
      (countries) => {
        const country = countries.find((c) => c.name.common === name);
        if (!country) return null;
        // TODO update using setCountries, setStore to make it inmmutable
        context.store[idxCountry] = country;
        // context.countries[idxCountry] = country;
        return country;
      }
    );
  };

  return { load, getDetails };
}

export { useCountryModel };
