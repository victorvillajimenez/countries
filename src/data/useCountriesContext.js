import { useState, useMemo, useContext, createContext } from "react";

const Context = createContext(null);

function buildCountriesContext() {
  return function ({ children }) {
    const [store, setStore] = useState([]);
    const [countries, setCountries] = useState([]);
    const [query, setQuery] = useState("");
    const [statusApp, setStatusApp] = useState("init");
    const [sortBy, setSortBy] = useState("name"); // name | population | continent
    const [viewAs, setViewAs] = useState("list"); // list | grid | carousel
    const contextValue = useMemo(
      () => ({
        store,
        setStore,
        countries,
        setCountries,
        query,
        setQuery,
        statusApp,
        setStatusApp,
        sortBy,
        setSortBy,
        viewAs,
        setViewAs,
      }),
      [
        store,
        setStore,
        countries,
        setCountries,
        query,
        setQuery,
        statusApp,
        setStatusApp,
        sortBy,
        setSortBy,
        viewAs,
        setViewAs,
      ]
    );
    return <Context.Provider value={contextValue}>{children}</Context.Provider>;
  };
}

function countriesContextHook() {
  return function () {
    return useContext(Context);
  };
}

export const useCountriesContext = countriesContextHook();

const CountriesContext = buildCountriesContext();
export default CountriesContext;
