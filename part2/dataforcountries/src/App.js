import { useState, useEffect } from "react";
import axios from "axios";
import Filter from "./components/Filter";
import Countries from "./components/Countries";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    axios.get("https://restcountries.com/v2/all").then((response) => {
      setCountries(response.data);
    });
  }, []);

  const handleFilterChange = (event) =>
    setFilter(event.target.value.toLowerCase());

  const filteredCountries =
    filter.length === 0
      ? countries
      : countries.filter((country) =>
          country.name.toLowerCase().includes(filter)
        );

  return (
    <div>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />

      <Countries countries={filteredCountries} />
    </div>
  );
};
export default App;
