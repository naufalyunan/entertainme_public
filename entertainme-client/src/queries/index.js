import { gql } from 'apollo-boost'

export const MoviesSeries = gql`
	{
		movies {
			_id
			title
			overview
			poster_path
			popularity
			tags
		}
		tvseries {
			_id
			title
			overview
			poster_path
			popularity
			tags
		}
	}
`

export const AddMovie = gql`
	mutation AddMovie ($title: String, $overview: String, $poster_path: String, $popularity: Int, $tags: [String]){
		addMovie(title: $title, overview: $overview, poster_path: $poster_path, popularity: $popularity, tags: $tags){
			_id
			title
			overview
			poster_path
			popularity
			tags	
		}
	}
`
export const AddSeries = gql`
	mutation AddSeries($title: String, $overview: String, $poster_path: String, $popularity: Int, $tags: [String]){
		addSeries(title: $title, overview: $overview, poster_path: $poster_path, popularity: $popularity, tags: $tags){
			_id
			title
			overview
			poster_path
			popularity
			tags	
		}
	}
`

export const GetMovieById = gql`
query getMovieId($_id: ID) {
	getMovieById(_id: $_id) {
		_id
		title
		overview
		poster_path
		popularity
		tags
	}
}
`

export const GetSeriesById = gql`
query getSeriesId($_id: ID) {
	getSeriesById(_id: $_id) {
		_id
		title
		overview
		poster_path
		popularity
		tags
	}
}
`

export const UpdateMovie = gql`
mutation UpdateMovie($_id: ID, $title: String, $overview: String, $poster_path: String, $popularity: Int, $tags: [String]){
	updateMovie(_id: $_id, title: $title, overview: $overview, poster_path: $poster_path, popularity: $popularity, tags: $tags){
		_id
		title
		overview
		poster_path
		popularity
		tags	
	}
}
`

export const UpdateSeries = gql`
mutation UpdateSeries($_id: ID, $title: String, $overview: String, $poster_path: String, $popularity: Int, $tags: [String]){
	updateSeries(_id: $_id, title: $title, overview: $overview, poster_path: $poster_path, popularity: $popularity, tags: $tags){
		_id
		title
		overview
		poster_path
		popularity
		tags	
	}
}
`

export const DeleteMovie =gql`
mutation DeleteMovie($_id: ID){
	deleteMovie(_id: $_id) {
		_id
		title
		overview
		poster_path
		popularity
		tags
	}
}
`

export const DeleteSeries =gql`
mutation DeleteSeries($_id: ID){
	deleteSeries(_id: $_id) {
		_id
		title
		overview
		poster_path
		popularity
		tags
	}
}
`
