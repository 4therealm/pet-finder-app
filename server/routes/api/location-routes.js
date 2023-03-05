const router = require("express").Router()
const { createLocation, getLocations, getLocation, updateLocation, removeLocation, findByCity} = require("../../controllers/location-controller")

router
  .route("/")
  .post(createLocation)
  .get(getLocations)


router 
  .route("/:id")
  .get(getLocation)
  .put(updateLocation)
  .delete(removeLocation)

  router.route("/city/:city").get(findByCity)



  
  module.exports = router