import React from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { useQuery } from '@apollo/react-hooks'
import { GetSeriesById } from './../queries'

import './styles/Detail.css'

export default function DetailSeries() {
	const { id } = useParams()
	const history = useHistory()
	const {loading, error, data} = useQuery(GetSeriesById, {
		variables: {
			_id: id
		}
	})

	if(loading) return <h1>Loading...</h1>
	if(error) return <h1>Error</h1>

	const backToSeries = () => {
		history.push('/entertainme/series')
	}

	return (
		<div className="detail-container">
			<div className="dtl-img-container">
				<img src={ data.getSeriesById.poster_path } alt={ data.getSeriesById.title } className="dtl-img"/>
			</div>
			<div className="dtl-content-container">
	    	<h1 className="dtl-text dtl-title">{ data.getSeriesById.title }</h1>
				<div className="dtl-text-container">
					<div className="left-col">
						<p className="dtl-text">Overview: { data.getSeriesById.overview }</p>
					</div>
					<div className="right-col">
						<p className="dtl-text">Popularity: { data.getSeriesById.popularity }</p>
						<p className="dtl-text">Tags: { data.getSeriesById.tags.join(', ') }</p>
					</div>
				</div>
			</div>
			<button onClick={ backToSeries }className="back-btn">Back</button>
		</div>
	)
}
