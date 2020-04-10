// if(process.env.NODE_ENV == 'development') {
// 	require('dotenv').config()
// }

// const express = require('express')
// const app = express()
// const routes = require('./routes')
// const port = process.env.PORT

// app.use(express.json())
// app.use(express.urlencoded({ extended: true }))
// app.use(routes)

// app.listen(port, () => {
// 	console.log(`orchestrator run in port ${port}`)
// })

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
						return axios.get('http://localhost:3000/movies')
							.then(({ data }) => {
								redis.set('movies', JSON.stringify(data))
								return data
							})
							.catch(console.log)
					}
				})
				.catch(console.log)
		}
		,
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
		}
	}
}

const server = new ApolloServer({ typeDefs, resolvers })

server.listen().then(({ url }) => {
	console.log('Graphql running on ' + url)
})