import CountryItem from "./CountryItem";
import Message from "./Message";
import Spinner from "./Spinner";
import styles from "./CountryList.module.css";
import { useCities } from "../contexts/CitiesContext";
/* eslint-disable react/prop-types */
function CountryList() {
  const { cities, loading } = useCities();
  if (loading) return <Spinner />;
  if (!cities) return <Message message="Add cities by clicking on the Map" />;
  // console.log(cities);
  const countries = cities.reduce((arr, city) => {
    if (!arr.map((e) => e.country).includes(city.country))
      return [...arr, { country: city.country, emoji: city.emoji }];
    else return arr;
  }, []);
  return (
    <ul className={styles.countryList}>
      {countries.map((country, index) => (
        <CountryItem country={country} key={index} />
      ))}
    </ul>
  );
}

export default CountryList;
