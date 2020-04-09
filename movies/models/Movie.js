const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/EntertainMe', { useNewUrlParser: true , useUnifiedTopology: true})
const db = mongoose.connection

db.on('error', console.error.bind(console, 'connection error:'))
// db.on('open', function(){
	console.log('********')
	console.log('connected')
	console.log('********')
	const movieSchema = new mongoose.Schema({
		title: String,
		overview: String,
		poster_path: String,
		popularity: Number,
		tags: Array
	})

	const Movie = mongoose.model('Movie', movieSchema)
	module.exports = Movie

// })