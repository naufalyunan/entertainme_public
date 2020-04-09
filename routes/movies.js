const router = require('express').Router()
const ControllerMovie = require('./../controllers/ControllerMovies')

router.get('/', ControllerMovie.getAll)
router.post('/', ControllerMovie.create)
router.get('/:id', ControllerMovie.getById)
router.patch('/:id', ControllerMovie.update)
router.delete('/:id', ControllerMovie.delete)

module.exports = router