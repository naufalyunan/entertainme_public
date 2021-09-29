const Movie = require('../models/Movie.js')
const ObjectId = require('mongodb').ObjectId

class ControllerMovie {
	static getAll (req, res, next) {
		Movie.find()
			.then(result => {
				res.status(200).json(result)
			})
			.catch(err=> res.status(500).json(err))
	}
	static create (req, res, next) {
		const  { title, overview, poster_path, popularity, tags } = req.body
		const movie = new Movie({
			title: title,
			overview: overview,
			poster_path: poster_path,
			popularity: Number(popularity),
			tags: tags
		})
		movie.save()
			.then(movie => {
				res.status(201).json(movie)
			})
			.catch(err => {
				res.status(400).json(err)
			})
	}

	static getById (req, res, next) {
		const id = req.params.id
		Movie.findById(id)
			.then(result => {
				if (!result) {
					const error = {
						name: "movie not found"
					}
					throw error
				} else {
					res.status(200).json(result)
				}
			})
			.catch(err => {
				res.status(400).json(err)
			})
	}

	static update (req, res, next) {
		const  { title, overview, poster_path, popularity, tags } = req.body
		const id = req.params.id
		let oldMovie
		let toUpdate 
		console.log('ini tags:',tags)
		Movie.findById(id)
			.then(result => {
				if (!result) {
					const error = {
						name: "movie not found"
					}
					throw error
				} else {
					oldMovie = result
					toUpdate = {
						title: title || oldMovie.title,
						overview: overview || oldMovie.overview,
						poster_path: poster_path || oldMovie.poster_path,
						popularity: popularity || oldMovie.popularity,
						tags: tags.length < 0 ? oldMovie.tags : tags
					}
					console.log(toUpdate)
					return Movie.update({ _id: ObjectId(id) }, toUpdate )
				}
			})
			.then(result => {
				return Movie.findById(id)
			})
			.then(result => {
				if (!result) {
					const error = {
						name: "movie not found"
					}
					throw error
				} else {
					res.status(200).json(result)
				}
			})
			.catch(err => res.status(400).json(err))
	}

	static delete (req, res, next) {
		const id = req.params.id
		let deleted
		Movie.findById(id)
			.then(result => {
				if(!result) {
					const error = {
						name: "movie not found"
					}
					throw error
				} else {
					deleted = result
					return Movie.deleteOne( {_id: ObjectId(id)} )
				}
			})
			.then(result => {
				res.status(200).json(deleted)
			})
			.catch(err => {
				res.status(400).json(err)
			})
	}

}

module.exports = ControllerMovie