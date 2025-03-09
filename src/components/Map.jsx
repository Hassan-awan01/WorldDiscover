import styles from "./Map.module.css";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { useEffect, useState } from "react";
import { useCities } from "../contexts/CitiesContext";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import { useGeolocation } from "../hooks/useGeolocation";
import { GetUrlPosition } from "../hooks/useUrlPosition";

function Map() {
  const { cities } = useCities();
  /* eslint-disable no-unused-vars */
  const [mapPosition, setMapPosition] = useState([40, 0]);
  const { isLoading, getPosition, position: geoPosition } = useGeolocation();
  const { lat: mapLat, lng: mapLng } = GetUrlPosition();
  useEffect(
    function () {
      if (mapLat && mapLng) setMapPosition([mapLat, mapLng]);
    },
    [mapLat, mapLng]
  );
  useEffect(
    function () {
      if (geoPosition) setMapPosition([geoPosition.lat, geoPosition.lng]);
    },
    [geoPosition]
  );
  return (
    <div className={styles.mapContainer}>
      {!geoPosition && (
        <Button type="position" onClick={getPosition}>
          {isLoading ? "loading..." : "use Button to get your Position"}
        </Button>
      )}
      <MapContainer
        center={mapPosition}
        zoom={13}
        scrollWheelZoom={true}
        className={styles.Map}
        style={{ height: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <Marker
            key={city.id}
            position={[city.position.lat, city.position.lng]}
          >
            <Popup>
              {city.emoji}
              <br />
              {city.CityName}
            </Popup>
          </Marker>
        ))}
        <SetCenter position={mapPosition} />
        <DetectClick />
      </MapContainer>
    </div>
  );
}
/*eslint-disable react/prop-types*/
function SetCenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}
function DetectClick() {
  const navigate = useNavigate();
  useMapEvents({
    click: (e) => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
  });
}
export default Map;
