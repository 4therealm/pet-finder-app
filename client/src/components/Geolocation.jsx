import  useGeoLocation  from "../hooks/useGeoLocation";
import { useContext } from "react";
import { useAppCtx } from "../utils/AppContext";

const Geolocation = () => {
  const { loading, error, city, coords, getLocation, saveLocationData } = useGeoLocation();
  const { setUserLocation, userLocation } = useAppCtx();

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      
      <p>Your location: {city}</p>
      {/* <p>location id: {userLocation._id}</p> */}
      <button onClick={getLocation}>Get My Location</button>
      <button onClick={saveLocationData}>Save location</button>
      <p>Latitude: {coords.latitude}</p>
      <p>Longitude: {coords.longitude}</p>
    </div>
  );
};

export default Geolocation;
