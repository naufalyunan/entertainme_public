import React from 'react'
import { useQuery } from '@apollo/react-hooks'

import './styles/Entertain.css'
import { MoviesSeries } from '../queries'

import Movie from './Movie'
import Series from './Series'

export default function Entertain() {
	const {loading, error, data} = useQuery(MoviesSeries)

	if(loading) return <h1>Loading...</h1>
	if(error) return <h1>Error</h1>

	console.log(data)

	return (
		<div id="entertain-container">
			<h1 className="title">Entertain</h1>
			<div id="item-container">
				<div className="container-entertain">
					<h3 className="title">Movie</h3>
					<div id="movie-container">
						{
							data.movies.map(el => (
								<Movie key={el._id}  movie={ el }/>
							))
						}
					</div>
				</div>
				<div className="container-entertain">
					<h3 className="title">Series</h3>
					<div id="series-container">
						{
							data.tvseries.map(el => (
								<Series key={ el._id } series={ el } />
							))
						}
					</div>
				</div>
			</div>
		</div>
	)
}
