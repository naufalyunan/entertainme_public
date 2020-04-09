const router = require('express').Router()
const Controller = require('./../controllers/Controller')


router.get('/', (req, res) => {
	res.send('ORCHESTRATOR HOMEPAGE')
})
router.get('/entertainme', Controller.getAll)
router.patch('/entertainme/movies/:id', Controller.updateMovie)
router.patch('/entertainme/series/:id', Controller.updateSeries)

module.exports = router