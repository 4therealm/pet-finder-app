import {useState,useEffect,useDeferredValue} from "react"
import {useAppCtx} from "../utils/AppContext"

const useGeoLocation=() => {
  const {setUserLocation,userLocation}=useAppCtx()
  const [coords,setCoords]=useState({latitude: null,longitude: null})
  const [city,setCity]=useState(null)
  const [loading,setLoading]=useState(false)
  const [error,setError]=useState(null)

  const getLocation=async () => {
    setLoading(true)
    setError(null)
    console.log("get location")

    try {
      const position=await new Promise((resolve,reject) => {
        console.log("get position")
        navigator.geolocation.getCurrentPosition(
          (position) => resolve(position),
          (error) => reject(error)
        )
      })

      const {latitude,longitude}=position.coords
      setCoords({latitude,longitude})
      console.log('position coords: '+position.coords)

      const url=`https://google-maps-geocoding.p.rapidapi.com/geocode/json?latlng=${latitude},${longitude}&result_type=locality&language=en`

      const response=await fetch(url,{
        method: "GET",
        headers: {
          "X-RapidAPI-Key": "b6a308ea18msh6870fa17d267db8p158239jsn25a211e1184a",
          "X-RapidAPI-Host": "google-maps-geocoding.p.rapidapi.com",
        },
      })
      console.log('google map response: ')
      const data=await response.json()
      console.log("coords city"+data.results[0].address_components[0].long_name)

      const city=data.results[0].address_components[0].long_name||null
      setCity(city)
      const locationResponse=await fetch(
        `http://localhost:3001/api/location/city/${city}`
      )
      console.log('searching DB for: '+city)
      const locationData=await locationResponse.json()

      console.log('DB response: '+locationData)

      if(locationData.length===0) {
        console.log("if no location data, post current location data DB")
        const postResponse=await fetch(
          "http://localhost:3001/api/location",
          {
            method: "POST",
            body: JSON.stringify({city ,coordinates: [latitude,longitude]}),
            headers: {
              "Content-Type": "application/json",
            },
          }
        )

        const result=await postResponse.json()
        console.log('post response should contain city, coords, and _id'+ result[0].city + result[0].coordinates + result[0]._id)
        const {city,coordinates,_id}=result
        setUserLocation([{city,coordinates,_id}])
      } else {
        console.log('DB check was a match, response will have city, coords, and _id that will be set to userLocation'+locationData[0])
        const {city,coordinates,_id}=locationData[0]
        setUserLocation([{city,coordinates,_id}])
      }
    } catch(error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    console.log("let the games begin")
    getLocation()
  },[])

  return {coords,city,loading,error,userLocation}
}


export default useGeoLocation
