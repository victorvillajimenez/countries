function CountryLanguages({ languages }) {
  return (
    <div>
      <div>
        <strong>
          {languages
            ? Object.values(languages).length > 1
              ? "Languages"
              : "Language"
            : "No language"}
          :
        </strong>
      </div>
      <ul className="custom-list">
        {languages && Object.values(languages).map((v) => <li key={v}>{v}</li>)}
      </ul>
    </div>
  );
}

export default CountryLanguages;
