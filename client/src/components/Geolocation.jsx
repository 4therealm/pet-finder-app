import  useGeoLocation  from "../hooks/useGeoLocation";

const Geolocation = () => {
  const { loading, error, city, coords, getLocation, saveLocationData } = useGeoLocation();

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
      <button onClick={saveLocationData}>Save location</button>
      <p>Latitude: {coords.latitude}</p>
      <p>Longitude: {coords.longitude}</p>
    </div>
  );
};

export default Geolocation;
