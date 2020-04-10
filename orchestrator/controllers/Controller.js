const axios = require('axios')


class Controller {
	static getAll(req, res, next) {
		const urlOne = 'http://localhost:3000/movies'
		const urlTwo = 'http://localhost:3001/series'
		const requestOne = axios.get(urlOne)
		const requestTwo = axios.get(urlTwo)
		
		redis.get('list')
			.then((reply) => {
				if (reply) {
					console.log('diatas')
					res.status(200).json(JSON.parse(reply))
				} else {
					console.log('masuk axios all')
					axios.all([requestOne, requestTwo])
						.then(axios.spread((...responses) => {
							const responseOne = responses[0].data
							const responseTwo = responses[1].data
							const payload = {
								movies: responseOne,
								series: responseTwo
							}
							console.log('masok')
							console.log(responseOne)
							redis.set('list', JSON.stringify(payload))
								.then(result => {
									console.log('dibawah')
									res.status(200).json(payload)
								})
								.catch(err => {
									console.log('*******')
									console.log('cathc atas')
									res.status(500).json(err.message)
								})
						}))
						.catch(err => {
							console.log('-------')
							console.log('catch tengah')
							res.status(500).json(err.message)
						})
				}
			})
			.catch(err => {
				console.log('======')
				console.log('catch bawah')
				res.status(500).json(err.message)
			})

	}

	static updateMovie (req, res, next) {
		const id = req.params.id
		const  { title, overview, poster_path, popularity, tags } = req.body
		const payload = {
			title,
			overview,
			poster_path,
			popularity,
			tags
		}
		let updated 
		axios({
			method: 'PATCH',
			url: `http://localhost:3000/movies/${id}`,
			data: payload
		})
			.then(result => {
				updated = result.data
				return redis.flushall()
			})
			.then(reply => {
				const urlOne = 'http://localhost:3000/movies'
				const urlTwo = 'http://localhost:3001/series'
				const requestOne = axios.get(urlOne)
				const requestTwo = axios.get(urlTwo)
				return axios.all([requestOne, requestTwo])
			})
			.then(axios.spread((...responses) => {
				const responseOne = responses[0].data
				const responseTwo = responses[1].data
				const payload = {
					movies: responseOne,
					series: responseTwo
				}
				return redis.set('list', JSON.stringify(payload))
			}))
			.then(result => {
				res.status(200).json(updated)
			})
			.catch(err => {
				console.log(err)
				res.status(400).json(err)
			})
	}

	static updateSeries (req, res, next) {
		const id = req.params.id
		const  { title, overview, poster_path, popularity, tags } = req.body
		const payload = {
			title,
			overview,
			poster_path,
			popularity,
			tags
		}
		let updated 
		axios({
			method: 'PATCH',
			url: `http://localhost:3001/series/${id}`,
			data: payload
		})
			.then(result => {
				updated = result.data
				return redis.flushall()
			})
			.then(reply => {
				const urlOne = 'http://localhost:3000/movies'
				const urlTwo = 'http://localhost:3001/series'
				const requestOne = axios.get(urlOne)
				const requestTwo = axios.get(urlTwo)
				return axios.all([requestOne, requestTwo])
			})
			.then(axios.spread((...responses) => {
				const responseOne = responses[0].data
				const responseTwo = responses[1].data
				const payload = {
					movies: responseOne,
					series: responseTwo
				}
				return redis.set('list', JSON.stringify(payload))
			}))
			.then(result => {
				res.status(200).json(updated)
			})
			.catch(err => {
				console.log(err)
				res.status(400).json(err)
			})
	}

}

module.exports = Controller