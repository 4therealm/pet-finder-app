const router = require('express').Router();
const { getPetById } = require('../../controllers/pet-controller');



router
    .route('/:id')
    .get(getPetById);

module.exports = router;