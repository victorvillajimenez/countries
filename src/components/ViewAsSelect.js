import { useCountriesContext } from "../data/useCountriesContext";
import { capitalize } from "../utils";

function ViewAsSelect() {
  const { viewAs, setViewAs } = useCountriesContext();
  const onChange = (e) => setViewAs(e.target.value);
  return (
    <div className="view-as-widget select-widget">
      <label htmlFor="viewAs">
        <strong>View as: </strong>
      </label>{" "}
      <select
        id="viewAs"
        name="viewAs"
        onChange={onChange}
        value={viewAs}
        className="custom-select"
      >
        {["list", "grid", "carousel"].map((v) => (
          <option key={v} value={v} disabled={v === "carousel"}>
            {capitalize(v)}
          </option>
        ))}
      </select>
    </div>
  );
}

export default ViewAsSelect;
