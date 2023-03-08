const router = require("express").Router();
const {
  createLocation,
  getLocations,
  getLocation,
  updateLocation,
  removeLocation,
  addLostPet,
  searchLocationsByCity,
} = require("../../controllers/location-controller");

router.route("/").post(createLocation).get(getLocations);

router
  .route("/:id")
  .get(getLocation)
  .put(updateLocation)
  .delete(removeLocation);

router.route("/lost/:id").put(addLostPet);

router.route("/city/:city").get(searchLocationsByCity);

module.exports = router;
