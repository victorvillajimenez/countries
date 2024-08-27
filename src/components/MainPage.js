import { useEffect } from "react";
import { useCountriesContext } from "../data/useCountriesContext";
import { useCountryModel } from "../data/countryModel";
import { sortByCommonName, sortBy } from "../utils";
import CountryList from "./CountryList";
import CountryGrid from "./CountryGrid";
import CountryCarousel from "./CountryCarousel";

function MainPage() {
  const context = useCountriesContext();
  const model = useCountryModel();

  useEffect(() => model.load(), []);

  const filterCountriesByQuery = (store) => {
    const q = context.query.trim().toLowerCase();
    const r = store.filter((c) => c.name.common.toLowerCase().includes(q));
    context.setCountries(r);
  };

  useEffect(() => {
    if (context.statusApp === "init") return;
    filterCountriesByQuery([...context.store]);
  }, [context.query]);

  useEffect(() => {
    if (context.statusApp === "init") return;
    const store = [...context.store];
    switch (context.sortBy) {
      case "name":
        store.sort(sortByCommonName);
        break;
      case "continent":
        store.sort((a, b) => sortBy(a, b, "region"));
        break;
      case "population":
        store.sort((a, b) => sortBy(a, b, "population"));
        break;
      default:
        store.sort(sortByCommonName);
    }
    context.setStore(store);
    filterCountriesByQuery(store);
  }, [context.sortBy]);

  const renderChildren = () => {
    switch (context.viewAs) {
      case "list":
        return <CountryList />;
      case "grid":
        return <CountryGrid />;
      case "carousel":
        return <CountryCarousel />;
      default:
        return <div />;
    }
  };

  return renderChildren();
}

export default MainPage;
