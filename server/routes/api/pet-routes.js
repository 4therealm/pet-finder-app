const router = require('express').Router();
const { getPetById, getAllPets, updatePet, deletePet } = require('../../controllers/pet-controller');

router  
  .route('/')
    .get(getAllPets);

router
  .route('/:id')
    .get(getPetById)
    .put(updatePet)
    .delete(deletePet);

module.exports = router;