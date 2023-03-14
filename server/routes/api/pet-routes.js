const router = require("express").Router();
const { User, Pet } = require('../../models')


const {
  getPetById,
  getAllPets,
  updatePet,
  deletePet,
  lostPet,
  getLostPets,
  updateLostPet
} = require("../../controllers/pet-controller");

router.route("/").get(getAllPets);
router.route("/lost").get(getLostPets);
router.route("/:id").get(getPetById).put(updatePet).delete(deletePet);
router.route("/lost/:id").put(lostPet);
router.route("/found/:id").put(updateLostPet);

module.exports = router;
