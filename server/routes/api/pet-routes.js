const router = require('express').Router();
const { getPetById, getAllPets, updatePet, deletePet, lostPet } = require('../../controllers/pet-controller');

router  
  .route('/')
    .get(getAllPets);

router
  .route('/:id')
    .get(getPetById)
    .put(updatePet)
    .delete(deletePet);

router.route('/lost/:id').put(lostPet);

module.exports = router;