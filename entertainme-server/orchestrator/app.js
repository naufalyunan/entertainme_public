const { gql, ApolloServer } = require('apollo-server')
const axios = require('axios')
const Redis = require('ioredis')
const redis = new Redis

const typeDefs = gql `
	type Movie {
		_id: ID
		title: String
		overview: String
		poster_path: String
		popularity: Int
		tags: [String]
	}

	type Series {
		_id: ID
		title: String
		overview: String
		poster_path: String
		popularity: Int
		tags: [String]
	}

	type Query {
		movies: [Movie]
		tvseries: [Series]
		getMovieById(_id: ID): Movie
		getSeriesById(_id: ID): Series
	}

	type Mutation {
		addMovie(title: String
			overview: String
			poster_path: String
			popularity: Int
			tags: [String]): Movie!
		addSeries(title: String
			overview: String
			poster_path: String
			popularity: Int
			tags: [String]): Series!
		updateMovie(_id: ID 
			title: String
			overview: String
			poster_path: String
			popularity: Int
			tags: [String]): Movie!
		updateSeries(_id: ID 
			title: String
			overview: String
			poster_path: String
			popularity: Int
			tags: [String]): Series!
		deleteMovie(_id: ID): Movie!
		deleteSeries(_id: ID): Series!
	}
`

const resolvers = {
	Query: {
		movies() {	
			return redis.get('movies')
				.then(reply => {
					if (reply) {
						return JSON.parse(reply)
					} else {
						return axios.get('http://localhost:3010/movies')
							.then(({ data }) => {
								redis.set('movies', JSON.stringify(data))
								return data
							})
							.catch(console.log)
					}
				})
				.catch(console.log)
		},
		tvseries () {
			return redis.get('series')
				.then(reply => {
					if (reply) {
						return JSON.parse(reply)
					} else {
						return axios.get('http://localhost:3001/series')
							.then(({ data }) => {
								redis.set('series', JSON.stringify(data))
								return data
							})
							.catch(console.log)
					}
				})
				.catch(console.log)
		},
		getMovieById(parent, args) {
			const { _id } = args
			return axios({
				method: 'GET',
				url: `http://localhost:3010/movies/${_id}`
			})
				.then(({ data }) => data)
				.catch(console.log)
		},
		getSeriesById(parent, args) {
			const { _id } = args
			return axios({
				method: 'GET',
				url: `http://localhost:3001/series/${_id}`
			})
				.then(({ data }) => data)
				.catch(console.log)
		}
	}
	,
	Mutation: {
		addMovie (parent, args) {
			const data = {
				title: args.title,
				overview: args.overview,
				poster_path: args.poster_path,
				popularity: args.popularity,
				tags: args.tags
			}
			let added
			console.log(data)
			return axios({
				method: 'POST',
				url: 'http://localhost:3010/movies',
				data: data
			})
				.then(({ data }) => {
					redis.del('movies')
					added = data
					return axios.get('http://localhost:3010/movies')
				})
				.then(({ data }) => {
					redis.set('movies', JSON.stringify(data))
					return added
				})
				.catch(err => console.log(err.response.data))
		},
		addSeries (parent, args) {
			const data = {
				title: args.title,
				overview: args.overview,
				poster_path: args.poster_path,
				popularity: args.popularity,
				tags: args.tags
			}
			let added
			console.log(data)
			return axios({
				method: 'POST',
				url: 'http://localhost:3001/series',
				data: data
			})
				.then(({ data }) => {
					redis.del('series')
					added = data
					return axios.get('http://localhost:3001/series')
				})
				.then(({ data }) => {
					redis.set('series', JSON.stringify(data))
					return added
				})
				.catch(err => console.log(err.response.data))
		},
		updateMovie(parent, args) {
			const { _id, title, overview, popularity, tags, poster_path } = args
			const data = {
				title,
				overview,
				popularity,
				poster_path,
				tags
			}
			console.log(data)
			let updated
			return axios({
				method: 'PATCH',
				url: `http://localhost:3010/movies/${_id}`,
				data: data
			})
				.then(({ data }) => {
					console.log('==')
					console.log(data)
					redis.del('movies')
					updated = data
					return axios.get('http://localhost:3010/movies')
				})
				.then(({ data }) => {
					redis.set('movies', JSON.stringify(data))
					return updated
				})
				.catch(err => console.log(err))
		},
		updateSeries(parent, args) {
			const { _id, title, overview, popularity, tags, poster_path } = args
			const data = {
				title,
				overview,
				popularity,
				poster_path,
				tags
			}
			console.log(data)
			let updated
			return axios({
				method: 'PATCH',
				url: `http://localhost:3001/series/${_id}`,
				data: data
			})
				.then(({ data }) => {
					redis.del('series')
					updated = data
					return axios.get('http://localhost:3001/series')
				})
				.then(({ data }) => {
					redis.set('series', JSON.stringify(data))
					return updated
				})
				.catch(err => console.log(err.response.data))
		},
		deleteMovie(parent, args) {
			const { _id } = args
			let deleted
			return axios({
				method: 'DELETE',
				url: `http://localhost:3010/movies/${_id}`
			})
				.then(({ data }) => {
					redis.del('movies')
					deleted = data
					return axios.get('http://localhost:3010/movies')
				})
				.then(({ data }) => {
					redis.set('movies', JSON.stringify(data))
					return deleted
				})
				.catch(console.log)
		},
		deleteSeries(parent, args) {
			const { _id } = args
			let deleted
			return axios({
				method: 'DELETE',
				url: `http://localhost:3001/series/${_id}`
			})
				.then(({ data }) => {
					redis.del('series')
					deleted = data
					return axios.get('http://localhost:3001/series')
				})
				.then(({ data }) => {
					redis.set('series', JSON.stringify(data))
					return deleted
				})
				.catch(console.log)
		}
	}
}

const server = new ApolloServer({ typeDefs, resolvers })

server.listen().then(({ url }) => {
	console.log('Graphql running on ' + url)
})