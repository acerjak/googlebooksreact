//bring in router
const router = require('express')

//define routes in folder
router.use('/api', require('./bookRoutes.js'))
router.use('/api', require('./googleRoutes.js'))

//export to server
module.exports = router