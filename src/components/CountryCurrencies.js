function CountryCurrencies({ currencies }) {
  return (
    <div>
      <div>
        <strong>
          {currencies
            ? Object.values(currencies).length > 1
              ? "Currencies"
              : "Currency"
            : "No currency"}
          :
        </strong>
      </div>
      <ul className="custom-list">
        {currencies &&
          Object.values(currencies).map((v) => (
            <li key={v.name}>
              {v.name} - {v.symbol}
            </li>
          ))}
      </ul>
    </div>
  );
}

export default CountryCurrencies;
