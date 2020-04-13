const router = require('express').Router()
const moviesRoutes = require('./movies')

router.get('/', (req, res) => {
	res.send('HOMEPAGE MOVIES')
})
router.use('/movies', moviesRoutes)

module.exports = router