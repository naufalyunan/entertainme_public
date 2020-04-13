import React from 'react'
import { Link } from 'react-router-dom'
import { DeleteMovie, MoviesSeries } from '../queries'
import { useMutation } from '@apollo/react-hooks'

import './styles/Card.css'

export default function Movie(props) {
	const { movie } =  props
	const [deleteMovie] = useMutation(DeleteMovie, {
		update(cache, { data: deleteMovie }) {
			const { movies } = cache.readQuery({ query: MoviesSeries })
			cache.writeQuery({
				query: MoviesSeries,
				data: {
					movies: movies.filter(el => el._id !== deleteMovie.deleteMovie._id)
				}
			})
		}
	})
	
	const handleDelete = () => {
		console.log('masok delete')
		console.log(movie._id)
		deleteMovie({variables: {_id: movie._id}})
	}

	return (
		<div className="card-container">
			<img className="card-img" src={ movie.poster_path } alt={ movie.title }/>
			<div className="opt-btn">
				<Link className="btn-option" to={`/entertainme/movies/update/${movie._id}`} >Update</Link>
				<h4>{ movie.title }</h4>
				<button onClick={ handleDelete } className="btn-option" >Delete</button>			
			</div>
		</div>
	)
}
