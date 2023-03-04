const router = require('express').Router();
const { getPetById, getAllPets } = require('../../controllers/pet-controller');

router  
    .route('/')
    .get(getAllPets);

router
    .route('/:id')
    .get(getPetById);

module.exports = router;