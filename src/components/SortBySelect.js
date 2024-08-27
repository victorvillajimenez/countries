import { useCountriesContext } from "../data/useCountriesContext";
import { capitalize } from "../utils";

function SortBySelect() {
  const { sortBy, setSortBy } = useCountriesContext();
  const onChange = (e) => setSortBy(e.target.value);
  return (
    <div className="select-widget">
      <label htmlFor="sortBy">
        <strong>Sort By: </strong>
      </label>{" "}
      <select
        id="sortBy"
        name="sortBy"
        onChange={onChange}
        value={sortBy}
        className="custom-select"
      >
        {["name", "continent", "population"].map((v) => (
          <option key={v} value={v}>
            {capitalize(v)}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SortBySelect;
