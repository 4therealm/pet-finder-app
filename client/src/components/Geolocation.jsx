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
  const [searchValue, setSearchValue] = useState("");
  const [locationData, setLocationData] = useState(null);
  const [coords, setCoords] = useState({ latitude: null, longitude: null });
  const [city, setCity] = useState(null);


  const getLocationData = async (location) => {
    console.log(location);
    const isCoordinates = location.match(/^(-?\d+(\.\d+)?),\s*(-?\d+(\.\d+)?)$/);
    const isZip = location.match(/^\d{5}(?:[-\s]\d{4})?$/);
    let address = location;
    if (isCoordinates) {
      const [latitude, longitude] = location.split(",");
      address = `${latitude},${longitude}`;
    } else if (isZip) {
      address = location;
    } else {
      address = encodeURIComponent(location);
    }
  
    const url = `https://google-maps-geocoding.p.rapidapi.com/geocode/json?address=${address}&language=en`;
  
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "X-RapidAPI-Key": "b6a308ea18msh6870fa17d267db8p158239jsn25a211e1184a",
          "X-RapidAPI-Host": "google-maps-geocoding.p.rapidapi.com",
        },
      });
      const data = await response.json();
      setLocationData(data.results[0]);

      const dbresponse = await fetch("http://localhost:3001/api/location", {
        method: "POST",
        body: JSON.stringify({
          city: data.results[0].address_components[0].long_name,
          coordinates: [Number(data.results[0].geometry.location.lat), Number(data.results[0].geometry.location.lng)],
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const dbdata = await dbresponse.json();
      console.log(dbdata);
    } catch (error) {
      console.error(error);
    }
  };
  
  const handleSearch = () => {
    console.log(searchValue);
    getLocationData(searchValue);
    setSearchValue("");
  };
  
  const { loading, error, getLocation, handleSaveLocation } = useGeoLocation();

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

 return (
  <div>
    <p>Your location: {city}</p>
    <div>
      <button onClick={getLocation}>Get My Location</button>
      <button onClick={handleSaveLocation}>Save location</button>
    </div>
    <div>
      <input
        type="text"
        placeholder="Search for a location"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
    {loading && <p>Loading...</p>}
    {error && <p>Error: {error}</p>}
  </div>
);

};

export default Geolocation;
