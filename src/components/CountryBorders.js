function CountryBorders({ borders }) {
  return (
    <div>
      <div>
        <strong>{!!borders ? "Borders:" : "No borders"}</strong>
      </div>
      <ul className="custom-list">
        {borders?.map((v) => (
          <li key={v}>{v}</li>
        ))}
      </ul>
    </div>
  );
}

export default CountryBorders;
