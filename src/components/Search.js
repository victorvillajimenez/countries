import { useCountriesContext } from "../data/useCountriesContext";
import { debounce } from "../utils";

function Search() {
  const { setQuery } = useCountriesContext();

  const onDebouncedHandler = debounce(setQuery, 500);

  const onChange = (e) => onDebouncedHandler(e.target.value);

  return (
    <div>
      <label htmlFor="search">
        <strong>Search: </strong>
      </label>
      <input
        id="search"
        name="search"
        onChange={onChange}
        style={{ height: "1.2rem" }}
      />
    </div>
  );
}

export default Search;
