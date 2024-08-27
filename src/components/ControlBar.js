import { useCountriesContext } from "../data/useCountriesContext";
import SortBySelect from "./SortBySelect";
import ViewAsSelect from "./ViewAsSelect";

function ControlBar() {
  const { countries, store } = useCountriesContext();
  const current = countries.length;
  const total = store.length;

  return (
    <div className="control-bar">
      <div className="query-results">
        <strong>Results: </strong>
        {current === total ? current : `${current}/${total}`} countries
      </div>
      <SortBySelect />
      <ViewAsSelect />
    </div>
  );
}

export default ControlBar;
