// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

import styles from "./Form.module.css";
import Button from "./Button";
import BackButton from "./BackButton";
import { GetUrlPosition } from "../hooks/useUrlPosition";
import Spinner from "./Spinner";
import Message from "./Message";
import { useCities } from "../contexts/CitiesContext";
import { useNavigate } from "react-router-dom";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function Form() {
  /* eslint-disable no-unused-vars */
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [isLoadingGeo, setLoadingGeo] = useState(false);
  const [emoji, setEmpoji] = useState("");
  const [GeoError, SetGeoError] = useState("");
  const { lat, lng } = GetUrlPosition();
  console.log(lat, lng);
  const { createCity, loading } = useCities();
  const navigate = useNavigate();
  useEffect(
    function () {
      async function fetchCityData() {
        try {
          setLoadingGeo(true);
          SetGeoError("");
          const res = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`
          );
          const data = await res.json();
          if (!data.countryCode) {
            throw new Error(
              "there is no country in this region please click on someawhere else"
            );
          }
          setCityName(data.city);
          setCountry(data.CountryName);
          setEmpoji(convertToEmoji(data.countryCode));
          console.log(data);
        } catch (err) {
          SetGeoError(err.message);
        } finally {
          setLoadingGeo(false);
        }
      }
      fetchCityData();
    },
    [lat, lng]
  );

  async function handleSubmit(e) {
    e.preventDefault();
    if (!cityName || !date) return;
    const newCity = {
      cityName,
      country,
      emoji,
      date,
      notes,
      position: { lat, lng },
    };
    console.log(newCity);
    await createCity(newCity);
    navigate("/app/cities");
  }
  if (isLoadingGeo) return <Spinner />;
  if (GeoError) return <Message message={GeoError} />;
  return (
    <form
      className={`${styles.form} ${loading ? styles.loading : ""}`}
      onSubmit={handleSubmit}
    >
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <DatePicker
          selected={date}
          onChange={(date) => setDate(date)}
          dateFormat="dd/MM/yyyy"
        />
        ;
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        <BackButton />
      </div>
    </form>
  );
}

export default Form;
