import Country from "./Country";
import ShowButton from "./ShowButton";

const Countries = ({ countries, handleButton, showCountry }) => {
  if (showCountry) {
    return <Country country={showCountry} />;
  }
  if (countries.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  } else if (countries.length === 1) {
    return <Country country={countries[0]} />;
  } else {
    return (
      <>
        {countries.map((country) => (
          <ShowButton
            key={country.name}
            onClick={() => handleButton(country)}
            country={country}
          />
        ))}
      </>
    );
  }
};

export default Countries;
