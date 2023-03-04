const router = require('express').Router();
const userRoutes = require('./user-routes');
const petRoutes = require('./pet-routes');
const locationRoutes = require('./location-routes');

router.use('/user', userRoutes);
router.use('/pet', petRoutes);
router.use('/location', locationRoutes);

module.exports = router;
