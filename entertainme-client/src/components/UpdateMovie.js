import React, { useState } from 'react'

import { useParams, useHistory } from 'react-router-dom'
import { GetMovieById, UpdateMovie } from '../queries'
import { useQuery, useMutation } from '@apollo/react-hooks'

import './styles/Update.css'
import Loading from './Loading'

export default function UpdateMovieForm() {
	const { id } = useParams()
	const history = useHistory()
	const [title, setTitle] = useState('')
	const [overview, setOverview] = useState('')
	const [poster_path, setPoster_path] = useState('')
	const [popularity, setPopularity] = useState('')
	const [tags, setTags] = useState([])

	const {loading, error, data} = useQuery(GetMovieById, {
		variables: { _id: id },
	})
	console.log(data)
	const [updateMovieById] = useMutation(UpdateMovie)

	if(loading) return <Loading />
	if(error) return <h1>Error, {JSON.stringify(error)}</h1>

	const updateMovie = (e) => {
		e.preventDefault()
		const payload = {
			_id: id,
			title,
			overview,
			poster_path,
			popularity: Number(popularity),
			tags
		}
		updateMovieById({ variables: payload })
		history.push('/entertainme/movies')
	}

	return (
		<div className="update-container">
			<h1 className="title" >Update Movie</h1>
				<form onSubmit={ updateMovie }>
					<input onChange={ e => setTitle(e.target.value) } 
						className="input"
						type="text" 
						placeholder={ data.getMovieById.title }
						value={ title }/><br/>
					<input onChange={ e => setOverview(e.target.value) } 
						className="input"
						type="text" 
						placeholder={ data.getMovieById.overview }
						value={ overview }/><br/>
					<input onChange={ e => setPoster_path(e.target.value) } 
						className="input"
						type="text" 
						placeholder={ data.getMovieById.poster_path }
						value={ poster_path }/><br/>
					<input onChange={ e => setPopularity(e.target.value) } 
						className="input"
						type="number" 
						placeholder={ data.getMovieById.popularity }
						value={ popularity }/><br/>
					<input onChange={ e => {
						const arrTags = e.target.value.split(' ')
						setTags(arrTags)
					} } 
						className="input"
						type="text" 
						placeholder={ data.getMovieById.tags.join(' ') }
						value={ tags.join(' ') }/><br/>
					<input type="submit" value="submit" className="submit-btn"/>
				</form>
		</div>
	)
}
