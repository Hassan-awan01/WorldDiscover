import CityItem from "./CityItem";
import Message from "./Message";
import Spinner from "./Spinner";
import styles from "./CityList.module.css";
import { useCities } from "../contexts/CitiesContext";
/* eslint-disable react/prop-types */

function CityList() {
  // console.log(cities);
  const { cities, loading } = useCities();
  if (loading) return <Spinner />;
  if (!cities) return <Message message="Add cities by clicking on the Map" />;
  // console.log(cities);
  return (
    <ul className={styles.cityList}>
      {cities.map((city, index) => (
        <CityItem city={city} key={index} />
      ))}
    </ul>
  );
}

export default CityList;
