import { useState, useEffect, useContext } from "react";
import { UserContext } from "../App";

const useGeoLocation = () => {
  const { setUserLocation } = useContext(UserContext);
  const [coords, setCoords] = useState({ latitude: null, longitude: null });
  const [city, setCity] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getLocation = () => {
    setLoading(true);
    setError(null);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCoords({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          setLoading(false);
        },
        (error) => {
          setError(error.message);
          setLoading(false);
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
      setLoading(false);
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  useEffect(() => {
    if (coords.latitude && coords.longitude) {
      const url = `https://google-maps-geocoding.p.rapidapi.com/geocode/json?latlng=${coords.latitude},${coords.longitude}&result_type=locality&language=en`;

      fetch(url, {
        method: "GET",
        headers: {
          "X-RapidAPI-Key": "b6a308ea18msh6870fa17d267db8p158239jsn25a211e1184a",
          "X-RapidAPI-Host": "google-maps-geocoding.p.rapidapi.com",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          const cityResult = data.results[0]?.formatted_address || null;
          setCity(cityResult);
          setUserLocation({
            city: cityResult,
            coordinates: [coords.latitude, coords.longitude],
          });
        })
        .catch((error) => {
          setError(error.message);
        });
    }
  }, [coords, setUserLocation]);

  return { loading, error, city, coords, getLocation };
};

const Geolocation = () => {
  const { loading, error, city, coords, getLocation } = useGeoLocation();

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <p>Your location: {city}</p>
      <button onClick={getLocation}>Get My Location</button>
      <p>Latitude: {coords.latitude}</p>
      <p>Longitude: {coords.longitude}</p>
    </div>
  );
};

export default Geolocation;
