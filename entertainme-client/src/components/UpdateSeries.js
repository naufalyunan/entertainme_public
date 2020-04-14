import React, { useState } from 'react'

import { useParams, useHistory } from 'react-router-dom'
import { GetSeriesById, UpdateSeries } from '../queries'
import { useQuery, useMutation } from '@apollo/react-hooks'

import './styles/Update.css'
import Loading from './Loading'

export default function UpdateSeriesForm() {
	const { id } = useParams()
	const history = useHistory()
	const [title, setTitle] = useState('')
	const [overview, setOverview] = useState('')
	const [poster_path, setPoster_path] = useState('')
	const [popularity, setPopularity] = useState('')
	const [tags, setTags] = useState([])

	const {loading, error, data} = useQuery(GetSeriesById, {
		variables: { _id: id },
	})
	console.log(id)
	const [updateSeries] = useMutation(UpdateSeries)

	if(loading) return <Loading />
	if(error) return <h1>Error, {JSON.stringify(error)}</h1>

	const submitUpdateSeries = (e) => {
		e.preventDefault()
		const payload = {
			_id: id,
			title,
			overview,
			poster_path,
			popularity: Number(popularity),
			tags
		}
		console.log(payload.title)
		updateSeries({ variables: payload })
		history.push('/entertainme/series')
	}

	return (
		<div className="update-container">
			<h1 className="title" >Update Series</h1>
				<form onSubmit={ submitUpdateSeries }>
					<input onChange={ e => setTitle(e.target.value) } 
						className="input"
						type="text" 
						placeholder={ data.getSeriesById.title }
						value={ title }/><br/>
					<input onChange={ e => setOverview(e.target.value) } 
						className="input"
						type="text" 
						placeholder={ data.getSeriesById.overview }
						value={ overview }/><br/>
					<input onChange={ e => setPoster_path(e.target.value) } 
						className="input"
						type="text" 
						placeholder={ data.getSeriesById.poster_path }
						value={ poster_path }/><br/>
					<input onChange={ e => setPopularity(e.target.value) } 
						className="input"
						type="number" 
						placeholder={ data.getSeriesById.popularity }
						value={ popularity }/><br/>
					<input onChange={ e => {
						const arrTags = e.target.value.split(' ')
						setTags(arrTags)
					} } 
						className="input"
						type="text" 
						placeholder={ data.getSeriesById.tags.join(' ') }
						value={ tags.join(' ') }/><br/>
					<input type="submit" value="submit" className="submit-btn"/>
				</form>
		</div>
	)
}
