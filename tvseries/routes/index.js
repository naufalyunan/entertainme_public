const router = require('express').Router()
const seriesRoutes = require('./series')

router.get('/', (req, res) => {
	res.send('HOMEPAGE MOVIES')
})
router.use('/series', seriesRoutes)

module.exports = router