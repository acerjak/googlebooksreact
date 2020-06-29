const { Router } = require("express");
const router = require('express')

router.use('/api', require('./bookRoutes.js'))
router.use('/api', require('./googleRoutes.js'))


module.exports = router