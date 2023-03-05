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

  const handleSaveLocation = async () => {
    setLoading(true);
    setError(null);
    console.log(coords.latitude, coords.longitude)
  const {latitude, longitude} = coords;
    if (coords.latitude && coords.longitude) {
      const url = "http://localhost:3001/api/location";
  
      
      try {
        const response = await fetch(url, {
          method: "POST",
          body: JSON.stringify({
            city,
            coordinates: [Number(latitude), Number(longitude)],
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        
  
        const result = await response.json();
        setUserLocation(result);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    } else {
      setError("Could not save location. Please try again.");
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
          console.log("map geocoding fired");
          const cityResult = data.results[0]?.address_components[0].long_name || null;
          // console.log(cityResult);
          setCity(cityResult);
          setUserLocation({
            city: cityResult,
            coordinates: [coords.latitude, coords.longitude],
          });
          console.log(city);
        })
        .catch((error) => {
          setError(error.message);
        });
    }
  }, [coords, setUserLocation]);

  return { loading, error, city, coords, getLocation, handleSaveLocation };
};

const Geolocation = () => {
  const { loading, error, city, coords, getLocation, handleSaveLocation } = useGeoLocation();

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
      <button onClick={handleSaveLocation}>Save location</button>
      <p>Latitude: {coords.latitude}</p>
      <p>Longitude: {coords.longitude}</p>
    </div>
  );
};

export default Geolocation;
