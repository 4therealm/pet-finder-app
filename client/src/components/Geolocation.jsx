import  useGeoLocation  from "../hooks/useGeoLocation";
import { useAppCtx } from "../utils/AppContext";


const Geolocation = () => {
  const { loading, error } = useGeoLocation();
  const { userLocation } = useAppCtx();
  
//we could put a cool loading animation here
  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      {userLocation ? (
      <p style={{marginRight: "10rem"}} >{userLocation[0].city}</p>
      ) : (
      <p>Location not found</p>
      )}
    </div>
  );
};

export default Geolocation;
