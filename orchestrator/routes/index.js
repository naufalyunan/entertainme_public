const router = require('express').Router()
const Controller = require('./../controllers/Controller')


router.get('/', (req, res) => {
	res.send('ORCHESTRATOR HOMEPAGE')
})
router.get('/entertainme', Controller.getAll)

module.exports = router