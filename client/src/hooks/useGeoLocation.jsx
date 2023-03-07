import { useState, useEffect } from "react";
import { useAppCtx } from "../utils/AppContext";

const useGeoLocation = () => {
  const { setUserLocation, userLocation } = useAppCtx();
  const [coords, setCoords] = useState({ latitude: null, longitude: null });
  const [city, setCity] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getLocation = async () => {
    setLoading(true);
    setError(null);

    try {
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
          (position) => resolve(position),
          (error) => reject(error)
        );
      });

      const { latitude, longitude } = position.coords;
      setCoords({ latitude, longitude });

      const url = `https://google-maps-geocoding.p.rapidapi.com/geocode/json?latlng=${latitude},${longitude}&result_type=locality&language=en`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "X-RapidAPI-Key": "b6a308ea18msh6870fa17d267db8p158239jsn25a211e1184a",
          "X-RapidAPI-Host": "google-maps-geocoding.p.rapidapi.com",
        },
      });

      const data = await response.json();
      const city = data.results[0].address_components[0].long_name || null;
      setCity(city);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const getUserLocation = async (latitude, longitude) => {
    const data = { city, coordinates: [latitude, longitude] };
    try {
      const locationResponse = await fetch(
        `http://localhost:3001/api/location/city/${city}`
      );

      const locationData = await locationResponse.json();

      if (locationData.length === 0) {
        const postResponse = await fetch(
          "http://localhost:3001/api/location",
          {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const result = await postResponse.json();
        const { city, coordinates, _id } = result[0];
        setUserLocation([{ city, coordinates, _id }]);
      } else {
        const { city, coordinates, _id } = locationData[0];
        setUserLocation([{ city, coordinates, _id }]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  useEffect(() => {
    if (city && coords.latitude && coords.longitude) {
      getUserLocation(coords.latitude, coords.longitude);
    }
  }, [city, coords.latitude, coords.longitude]);

  return { coords, city, loading, error, userLocation };
};

export default useGeoLocation;
