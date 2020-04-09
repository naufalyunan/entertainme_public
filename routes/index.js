const router = require('express').Router()
const moviesRoutes = require('./movies')
const seriesRoutes = require('./series')

router.get('/', (req, res) => {
	res.send('HOMEPAGE')
})
router.use('/movies', moviesRoutes)
router.use('/series', seriesRoutes)

module.exports = router