const router = require('express').Router()
const ControllerTVSeries = require('./../controllers/ControllerTVSeries')

router.get('/', ControllerTVSeries.getAll)
router.post('/', ControllerTVSeries.create)
router.get('/:id', ControllerTVSeries.getById)
router.patch('/:id', ControllerTVSeries.update)
router.delete('/:id', ControllerTVSeries.delete)

module.exports = router