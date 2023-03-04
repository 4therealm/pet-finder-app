const router = require('express').Router();
const userRoutes = require('./user-routes');
const petRoutes = require('./pet-routes');

router.use('/user', userRoutes);
router.use('/pet', petRoutes);

module.exports = router;
