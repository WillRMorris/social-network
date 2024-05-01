const router = require('express').Router();
const thoughtRoutes = require('./thoughtRoutes');
const UserRoutes = require('./userRoutes');

router.use('/users', UserRoutes);
router.use('/thoughts', thoughtRoutes)


module.exports = router;
