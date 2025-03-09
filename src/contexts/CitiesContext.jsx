import { createContext, useContext, useEffect, useState } from "react";
/*eslint-disable react/prop-types*/
const CitiesContext = createContext();
function CitiesProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentCity, setCity] = useState({});

  useEffect(() => {
    async function fetchCities() {
      try {
        setLoading(true);
        const res = await fetch("http://localhost:9000/cities");
        const data = await res.json();
        setCities(data);
      } catch {
        alert("There was an error fetching the cities");
      } finally {
        setLoading(false);
      }
    }
    fetchCities();
  }, []);
  async function getCity(id) {
    try {
      setLoading(true);
      const res = await fetch(`http://localhost:9000/cities/${id}`);
      const data = await res.json();
      setCity(data);
    } catch {
      alert("There was an error fetching the cities");
    } finally {
      setLoading(false);
    }
  }
  async function createCity(newCity) {
    try {
      setLoading(true);

      const res = await fetch(`http://localhost:9000/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) throw new Error("Failed to create city");

      const data = await res.json();
      setCities((cities) => [...cities, data]); // Ensure `setCity` is defined in the component
    } catch (error) {
      console.error("Error creating city:", error);
      alert("There was an error creating the city. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function deleteCity(id) {
    try {
      setLoading(true);

      await fetch(`http://localhost:9000/cities/${id}`, {
        method: "DELETE",
      });
      setCities((cities) => cities.filter((city) => city.id !== id)); // Ensure `setCity` is defined in the component
    } catch (error) {
      console.error("Error creating city:", error);
      alert("There was an error creating the city. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        loading,
        currentCity,
        getCity,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error("context can not be used outside of its child components");
  return context;
}
export { CitiesProvider, useCities };
