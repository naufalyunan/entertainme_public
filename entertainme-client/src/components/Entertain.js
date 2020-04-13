import React from 'react'
import { Link, Route, useRouteMatch, Switch } from 'react-router-dom'
import { useQuery } from '@apollo/react-hooks'

import './styles/Entertain.css'
import { MoviesSeries } from '../queries'

import Movie from './Movie'
import Series from './Series'

export default function Entertain() {
	const {url, path} = useRouteMatch()
	const {loading, error, data} = useQuery(MoviesSeries)
	
	if(loading) return <h1>Loading...</h1>
	if(error) return <h1>Error</h1>


	return (
		<div id="entertain-container">
			<div id="item-container">
				<div className="container-entertain">
					<Link className="title" to={`${url}/movies`}>Movie</Link>
					<Link className="title" to={`${url}/series`}>Series</Link>
				</div>
					<Switch>
						<Route exact path={path}>
							<h1>Choose</h1>
						</Route>
						<Route path={`${path}/movies`}>
							<div id="movie-container">
								{
									data.movies.map(el => (
										<Movie key={el._id}  movie={ el }/>
									))
								}
							</div>
						</Route>
						<Route path={`${path}/series`}>
							<div id="series-container">
								{
									data.tvseries.map(el => (
										<Series key={ el._id } series={ el } />
									))
								}
							</div>
						</Route>
					</Switch>
			</div>
		</div>
	)
}
