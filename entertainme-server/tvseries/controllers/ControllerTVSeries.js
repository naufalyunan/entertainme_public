const TVSeries = require('../models/TVSeries')
const ObjectId = require('mongodb').ObjectId

class ControllerTVSeries {
	static getAll (req, res, next) {
		TVSeries.find()
			.then(result => {
				res.status(200).json(result)
			})
			.catch(err => {
				res.status(500).json(err)
			})
	}

	static create (req, res, next) {
		const  { title, overview, poster_path, popularity, tags } = req.body
		const payload = {
			title,
			overview,
			poster_path,
			popularity,
			tags
		}
		TVSeries.create(payload)
			.then(result => {
				res.status(201).json(result)
			})
			.catch(err => {
				res.status(400).json(err)
			})
	}

	static getById (req, res, next) {
		const id = req.params.id
		TVSeries.findById(id)
			.then(result => {
				if (!result) {
					const error = {
						name: "no tv series found"
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
		let oldSeries
		let payload

		TVSeries.findById(id)
			.then(result => {
				if (!result) {
					const error = {
						name: "series not found"
					}
					throw error
				} else {
					oldSeries = result
					payload = {
						title: title || oldSeries.title,
						overview: overview || oldSeries.overview,
						poster_path: poster_path || oldSeries.poster_path,
						popularity: popularity || oldSeries.popularity,
						tags: tags.length < 0 ? oldSeries.tags : tags
					}
					return TVSeries.update({ _id: ObjectId(id) }, payload)
				}
			})
			.then(result => {
				return TVSeries.findById(id)
			})
			.then(result => {
				if (!result) {
					const error = {
						name: "series not found"
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

	static delete (req, res, next) {
		const id = req.params.id
		let deleted
		TVSeries.findById(id)
			.then(result => {
				if (!result) {
					const error = {
						name: "series not found"
					}
					throw error
				} else {
					deleted = result
					return TVSeries.deleteOne({ _id: ObjectId(id) })
				}
			})
			.then(result => {
				res.status(203).json(deleted)
			})
			.catch(err => {
				res.status(400).json(err)
			})
	}
}

module.exports = ControllerTVSeries