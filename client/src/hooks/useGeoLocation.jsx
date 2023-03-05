import { useState, useEffect, useContext } from "react";
import { UserContext } from "../App";

const useGeoLocation = () => {
  const { setUserLocation, userLocation } = useContext(UserContext);
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

  const saveLocationData = () => {
    console.log(userLocation)

    console.log(coords)
    console.log(city)
    setLoading(true);
    setError(null);

    if (userLocation.city && userLocation.coordinates) {
      const url = "http://localhost:3001/api/location";
      const data = {
        city: userLocation.city,
        coordinates: userLocation.coordinates,
        // city,
        // coordinates: [`${latitude}, ${longitude}`],
      };
      fetch(url, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((result) => {
          setUserLocation(result);
          setLoading(false);
        })
        .catch((error) => {
          setError(error.message);
          setLoading(false);
        });
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
          console.log(data);
          const cityResult = data.results[0]?.formatted_address || null;
          setCity(cityResult);
          setUserLocation({
            city: cityResult,
            coordinates: [Number(data.results[0].geometry.location.lat), Number(data.results[0].geometry.location.lng)],
          });
          console.log(cityResult)
          console.log(userLocation)
        })
        .catch((error) => {
          setError(error.message);
        });
    }
  }, [coords, setUserLocation]);

  return { loading, error, city, coords, getLocation, saveLocationData };
};

export default useGeoLocation;
