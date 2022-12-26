const Country = ({ country }) => {
  return (
    <div>
      <h2>{country.name}</h2>
      <p>Capital {country.capital}</p>
      <p>area {country.area}</p>

      <h3>Languages:</h3>
      <ul>
        {country.languages.map((language) => (
          <li key={language.name}>{language.name}</li>
        ))}
      </ul>
      <img src={country.flag} alt={country.name + "'s flag"} width="10%" />
    </div>
  );
};

export default Country;
