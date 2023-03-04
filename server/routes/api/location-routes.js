const router = require("express").Router()
const { createLocation, getLocations, getLocation, updateLocation, removeLocation, addPetToLostPet  } = require("../../controllers/location-controller")

router
  .route("/")
  .post(createLocation)
  .get(getLocations)


router 
  .route("/:id")
  .get(getLocation)
  .put(updateLocation)
  .delete(removeLocation)


  router
  .route("/:id/lostPets")
  .post(addPetToLostPet)



  
  module.exports = router