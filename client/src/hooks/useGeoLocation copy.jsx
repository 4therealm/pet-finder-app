import { useState, useEffect } from "react";
import { useAppCtx } from '../utils/AppContext';


const useGeoLocation = () => {
  const { setUserLocation, userLocation } = useAppCtx
  const [coords, setCoords] = useState({ latitude: null, longitude: null });
  const [city, setCity] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [locationData, setLocationData] = useState({});

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

    console.log(locationData.coordinates)
    console.log(locationData.city)
    
    setLoading(true);
    setError(null);

    if (locationData.city && locationData.coordinates) {
      locationData.coordinates = locationData.coordinates.map((coord) => Number(coord));
      const url = "http://localhost:3001/api/location";
      const data = {
        city: locationData.city,
        coordinates: locationData.coordinates,

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
          console.log(result);
          const { city, coordinates, _id } = result;
          setUserLocation([{ city, coordinates, _id }]);
      
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
    if (userLocation) {
      //userLocation is an array of objects [{city, coordinates, _id}]
      console.log(userLocation);
    }
  }, [userLocation]);

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
          // console.log(data);
          const cityResult = data.results[0].address_components[0].long_name || null;
          // console.log(cityResult);
          setCity(cityResult);
          setLocationData({
            city: cityResult,
            coordinates: [Number(data.results[0].geometry.location.lat), Number(data.results[0].geometry.location.lng)],
          });
          // console.log(cityResult)
          // console.log(userLocation)
        })
        .catch((error) => {
          setError(error.message);
        });
    }
  }, [coords, setUserLocation]);

  return { loading, error, city, coords, getLocation, saveLocationData };
};

export default useGeoLocation;
