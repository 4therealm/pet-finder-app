const router = require('express').Router();

// Import any controllers needed here
const { authUser, createUser, updateUser, verifyUser, getUserById, createPet } = require('../../controllers/user-controller');

// Declare the routes that point to the controllers above
router.route('/').post(createUser);
router.route('/auth').post(authUser);
router.route('/verify').post(verifyUser);
router.route('/:id').get(getUserById);
router.route('/:id').put(updateUser);
router.route('/:id/pet').post(createPet);


module.exports = router;
