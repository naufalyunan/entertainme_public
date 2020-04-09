const axios = require('axios')
const Redis = require('ioredis')
const redis = new Redis

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
									res.status(500).json(err)
								})
						}))
				}
			})
			.catch(err => {
				res.status(500).json(err)
			})

	}
}

module.exports = Controller