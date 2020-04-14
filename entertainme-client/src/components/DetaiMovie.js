import React from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { useQuery } from '@apollo/react-hooks'
import { GetMovieById } from './../queries'

import './styles/Detail.css'

export default function DetailMovie() {
	const { id } = useParams()
	const history = useHistory()
	const {loading, error, data} = useQuery(GetMovieById, {
		variables: {
			_id: id
		}
	})

	if(loading) return <h1>Loading...</h1>
	if(error) return <h1>Error</h1>

	const backToMovie = () => {
		history.push('/entertainme/movies')
	}

	return (
		<div className="detail-container">
			<div className="dtl-img-container">
				<img src={ data.getMovieById.poster_path } alt={ data.getMovieById.title } className="dtl-img"/>
			</div>
			<div className="dtl-content-container">
	    	<h1 className="dtl-text dtl-title">{ data.getMovieById.title }</h1>
				<div className="dtl-text-container">
					<div className="left-col">
						<p className="dtl-text">Overview: { data.getMovieById.overview }</p>
					</div>
					<div className="right-col">
						<p className="dtl-text">Popularity: { data.getMovieById.popularity }</p>
						<p className="dtl-text">Tags: { data.getMovieById.tags.join(', ') }</p>
					</div>
				</div>
			</div>
			<button onClick={ backToMovie }className="back-btn">Back</button>
		</div>
	)
}
