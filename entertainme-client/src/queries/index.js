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
