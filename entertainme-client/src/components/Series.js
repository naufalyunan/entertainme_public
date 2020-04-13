import React from 'react'
import { Link } from 'react-router-dom'
import { useMutation } from '@apollo/react-hooks'
import { DeleteSeries, MoviesSeries } from '../queries'
import './styles/Card.css'

export default function Series(props) {
	const { series } = props

	const [deleteSeries] = useMutation(DeleteSeries, {
		update(cache, { data: { deleteSeries } }) {
			const { tvseries } = cache.readQuery({ query: MoviesSeries })
			cache.writeQuery({
				query: MoviesSeries,
				data: { 
					tvseries: tvseries.filter(el => el._id !== deleteSeries._id)
				}
			})
		}
	})
	const handleDelete = () => {
		console.log('masuk delete')
		console.log(series)
		deleteSeries({ variables: { _id: series._id } })
	}

	return (
		<div className="card-container">
			<img className="card-img" src={ series.poster_path } alt={ series.title }/>
			<div className="opt-btn">
				<Link className="btn-option" to={`/entertainme/series/update/${series._id}`} >Update</Link>
				<h4>{ series.title }</h4>
				<button onClick={ handleDelete } className="btn-option" >Delete</button>			
			</div>
		</div>
	)
}
